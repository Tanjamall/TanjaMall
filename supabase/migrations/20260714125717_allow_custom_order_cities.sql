create or replace function public.create_cod_order(
  full_name text,
  phone text,
  city text,
  area text,
  address text,
  notes text,
  items jsonb
)
returns table (
  order_id uuid,
  order_number text,
  total numeric(10, 2),
  whatsapp_confirmation_url text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_name text := btrim(coalesce(full_name, ''));
  normalized_phone text := regexp_replace(coalesce(phone, ''), '[[:space:]]+', '', 'g');
  normalized_city text := btrim(coalesce(city, ''));
  normalized_area text := nullif(btrim(coalesce(area, '')), '');
  normalized_address text := btrim(coalesce(address, ''));
  normalized_notes text := nullif(btrim(coalesce(notes, '')), '');
  settings_row public.store_settings%rowtype;
  subtotal_amount numeric(10, 2);
  delivery_amount numeric(10, 2);
  total_amount numeric(10, 2);
  new_customer_id uuid;
  new_order_id uuid;
  new_order_number text;
  new_whatsapp_confirmation_url text;
  products_text text;
  whatsapp_message text;
  clean_whatsapp_number text;
  attempt_count integer := 0;
begin
  if length(normalized_name) < 2 then
    raise exception 'full_name is required' using errcode = '22023';
  end if;

  if normalized_phone !~ '^(\+?212|0)[5-7][0-9]{8}$' then
    raise exception 'phone is invalid' using errcode = '22023';
  end if;

  if length(normalized_city) < 2 then
    raise exception 'city is required' using errcode = '22023';
  end if;

  if length(normalized_address) < 5 then
    raise exception 'address is required' using errcode = '22023';
  end if;

  if jsonb_typeof(items) is distinct from 'array' or jsonb_array_length(items) = 0 then
    raise exception 'cart cannot be empty' using errcode = '22023';
  end if;

  select *
  into settings_row
  from public.store_settings
  order by created_at asc
  limit 1;

  if settings_row.id is null then
    raise exception 'store settings are missing' using errcode = '22023';
  end if;

  drop table if exists pg_temp.cod_order_items_raw;
  drop table if exists pg_temp.cod_order_items_input;
  drop table if exists pg_temp.cod_order_items_validated;

  create temporary table cod_order_items_raw (
    product_id uuid not null,
    quantity integer not null
  ) on commit drop;

  insert into cod_order_items_raw (product_id, quantity)
  select
    (item.value ->> 'product_id')::uuid,
    (item.value ->> 'quantity')::integer
  from jsonb_array_elements(items) as item(value);

  if exists (
    select 1
    from cod_order_items_raw
    where quantity <= 0
  ) then
    raise exception 'quantity must be greater than zero' using errcode = '22023';
  end if;

  create temporary table cod_order_items_input
  on commit drop
  as
  select
    product_id,
    sum(quantity)::integer as quantity
  from cod_order_items_raw
  group by product_id;

  create temporary table cod_order_items_validated
  on commit drop
  as
  select
    p.id as product_id,
    p.name as product_name,
    p.slug as product_slug,
    p.main_image_url as product_image_url,
    p.price as unit_price,
    i.quantity,
    (p.price * i.quantity)::numeric(10, 2) as total_price
  from cod_order_items_input i
  join public.products p on p.id = i.product_id
  left join public.categories c on c.id = p.category_id
  where p.status = 'PUBLISHED'
    and p.stock >= i.quantity
    and (c.id is null or c.status = 'ACTIVE');

  if (
    select count(*)
    from cod_order_items_input
  ) <> (
    select count(*)
    from cod_order_items_validated
  ) then
    raise exception 'cart contains unavailable products' using errcode = '22023';
  end if;

  select coalesce(sum(total_price), 0)::numeric(10, 2)
  into subtotal_amount
  from cod_order_items_validated;

  if subtotal_amount <= 0 then
    raise exception 'cart total is invalid' using errcode = '22023';
  end if;

  delivery_amount := case
    when settings_row.free_delivery_threshold is not null
      and subtotal_amount >= settings_row.free_delivery_threshold
      then 0
    else coalesce(settings_row.delivery_fee_tanger, 0)
  end;

  total_amount := (subtotal_amount + delivery_amount)::numeric(10, 2);

  loop
    attempt_count := attempt_count + 1;
    new_order_number := concat(
      'TM-',
      to_char(now(), 'YYYYMMDD'),
      '-',
      (floor(random() * 90000)::integer + 10000)::text
    );

    exit when not exists (
      select 1
      from public.orders o
      where o.order_number = new_order_number
    );

    if attempt_count >= 10 then
      raise exception 'could not generate unique order number' using errcode = '23505';
    end if;
  end loop;

  insert into public.customers (
    full_name,
    phone,
    city,
    area,
    address
  )
  values (
    normalized_name,
    normalized_phone,
    normalized_city,
    normalized_area,
    normalized_address
  )
  returning id into new_customer_id;

  select string_agg(concat('- ', product_name, ' x', quantity), E'\n' order by product_name)
  into products_text
  from cod_order_items_validated;

  clean_whatsapp_number := regexp_replace(coalesce(settings_row.whatsapp_number, ''), '[^0-9]', '', 'g');

  whatsapp_message := concat_ws(
    E'\n',
    concat('Salam ', normalized_name, ', hna ', settings_row.store_name, '.'),
    concat('We received your order ', new_order_number, ':'),
    '',
    products_text,
    '',
    concat('Total: ', total_amount, ' MAD'),
    concat('Address: ', normalized_address),
    '',
    'Please confirm so we can prepare delivery.'
  );

  insert into public.orders as inserted_order (
    order_number,
    customer_id,
    customer_name,
    customer_phone,
    city,
    area,
    address,
    notes_from_customer,
    status,
    subtotal,
    delivery_fee,
    total,
    whatsapp_confirmation_url
  )
  values (
    new_order_number,
    new_customer_id,
    normalized_name,
    normalized_phone,
    normalized_city,
    normalized_area,
    normalized_address,
    normalized_notes,
    'NEW',
    subtotal_amount,
    delivery_amount,
    total_amount,
    case
      when clean_whatsapp_number = '' then null
      else concat('https://wa.me/', clean_whatsapp_number, '?text=', private.urlencode(whatsapp_message))
    end
  )
  returning inserted_order.id, inserted_order.whatsapp_confirmation_url
  into new_order_id, new_whatsapp_confirmation_url;

  insert into public.order_items (
    order_id,
    product_id,
    product_name,
    product_slug,
    product_image_url,
    quantity,
    unit_price,
    total_price
  )
  select
    new_order_id,
    product_id,
    product_name,
    product_slug,
    product_image_url,
    quantity,
    unit_price,
    total_price
  from cod_order_items_validated;

  order_id := new_order_id;
  order_number := new_order_number;
  total := total_amount;
  whatsapp_confirmation_url := new_whatsapp_confirmation_url;

  return next;
end;
$$;

comment on function public.create_cod_order(text, text, text, text, text, text, jsonb) is
  'Secure public COD order creation RPC. Accepts customer-entered cities and calculates totals from database product prices.';

revoke all on function public.create_cod_order(text, text, text, text, text, text, jsonb)
from public;

grant execute on function public.create_cod_order(text, text, text, text, text, text, jsonb)
to anon, authenticated;

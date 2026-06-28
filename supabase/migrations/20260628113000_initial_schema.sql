create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'ADMIN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('ADMIN', 'STAFF'))
);

create table public.categories (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  status text not null default 'ACTIVE',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_status_check check (status in ('ACTIVE', 'HIDDEN'))
);

create table public.products (
  id uuid primary key default extensions.gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  full_description text,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  cost_price numeric(10, 2),
  sku text,
  stock integer not null default 0,
  status text not null default 'DRAFT',
  main_image_url text,
  is_featured boolean not null default false,
  is_best_seller boolean not null default false,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_status_check check (status in ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  constraint products_price_positive_check check (price > 0),
  constraint products_compare_price_positive_check check (compare_at_price is null or compare_at_price > 0),
  constraint products_cost_price_non_negative_check check (cost_price is null or cost_price >= 0),
  constraint products_stock_non_negative_check check (stock >= 0)
);

create table public.product_images (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint product_images_product_sort_order_unique unique (product_id, sort_order)
);

create table public.customers (
  id uuid primary key default extensions.gen_random_uuid(),
  full_name text not null,
  phone text not null,
  city text not null default 'Tanger',
  area text,
  address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default extensions.gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  city text not null default 'Tanger',
  area text,
  address text not null,
  notes_from_customer text,
  internal_notes text,
  status text not null default 'NEW',
  subtotal numeric(10, 2) not null,
  delivery_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  whatsapp_confirmation_url text,
  contacted_at timestamptz,
  confirmed_at timestamptz,
  delivered_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_status_check check (
    status in (
      'NEW',
      'CONTACTED',
      'CONFIRMED',
      'PREPARING',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'CANCELLED',
      'RETURNED'
    )
  ),
  constraint orders_subtotal_non_negative_check check (subtotal >= 0),
  constraint orders_delivery_fee_non_negative_check check (delivery_fee >= 0),
  constraint orders_total_non_negative_check check (total >= 0)
);

create table public.order_items (
  id uuid primary key default extensions.gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_slug text not null,
  product_image_url text,
  quantity integer not null,
  unit_price numeric(10, 2) not null,
  total_price numeric(10, 2) not null,
  created_at timestamptz not null default now(),
  constraint order_items_quantity_positive_check check (quantity > 0),
  constraint order_items_unit_price_non_negative_check check (unit_price >= 0),
  constraint order_items_total_price_non_negative_check check (total_price >= 0)
);

create table public.store_settings (
  id uuid primary key default extensions.gen_random_uuid(),
  store_name text not null,
  store_phone text,
  whatsapp_number text,
  default_city text not null default 'Tanger',
  supported_cities text[] not null default array['Tanger'],
  delivery_fee_tanger numeric(10, 2) not null default 0,
  free_delivery_threshold numeric(10, 2),
  announcement_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint store_settings_delivery_fee_non_negative_check check (delivery_fee_tanger >= 0),
  constraint store_settings_free_delivery_threshold_non_negative_check check (
    free_delivery_threshold is null or free_delivery_threshold >= 0
  )
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger customers_set_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create trigger store_settings_set_updated_at
before update on public.store_settings
for each row execute function public.set_updated_at();

create index categories_status_sort_order_idx
on public.categories (status, sort_order);

create index products_category_id_idx
on public.products (category_id);

create index products_status_created_at_idx
on public.products (status, created_at desc);

create index products_published_featured_idx
on public.products (created_at desc)
where status = 'PUBLISHED' and is_featured = true;

create index products_published_best_seller_idx
on public.products (created_at desc)
where status = 'PUBLISHED' and is_best_seller = true;

create index product_images_product_id_sort_order_idx
on public.product_images (product_id, sort_order);

create index customers_phone_idx
on public.customers (phone);

create index orders_customer_id_idx
on public.orders (customer_id);

create index orders_customer_phone_idx
on public.orders (customer_phone);

create index orders_status_created_at_idx
on public.orders (status, created_at desc);

create index order_items_order_id_idx
on public.order_items (order_id);

create index order_items_product_id_idx
on public.order_items (product_id);

create or replace view public.public_products
with (security_invoker = true)
as
select
  p.id,
  p.category_id,
  c.name as category_name,
  c.slug as category_slug,
  p.name,
  p.slug,
  p.short_description,
  p.full_description,
  p.price,
  p.compare_at_price,
  p.stock,
  p.status,
  p.main_image_url,
  p.is_featured,
  p.is_best_seller,
  p.created_at,
  p.updated_at
from public.products p
left join public.categories c on c.id = p.category_id
where p.status = 'PUBLISHED'
  and (c.id is null or c.status = 'ACTIVE');

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.store_settings enable row level security;

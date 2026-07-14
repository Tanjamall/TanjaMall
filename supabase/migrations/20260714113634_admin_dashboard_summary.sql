create or replace function public.get_admin_dashboard()
returns jsonb
language plpgsql
stable
security invoker
set search_path = ''
as $$
declare
  dashboard jsonb;
  today_start timestamptz := date_trunc('day', now() at time zone 'Africa/Casablanca') at time zone 'Africa/Casablanca';
begin
  if not private.is_admin() then
    raise exception 'Admin access required.' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'new_orders_today', (
      select count(*) from public.orders where created_at >= today_start
    ),
    'pending_confirmation_orders', (
      select count(*) from public.orders where status in ('NEW', 'CONTACTED')
    ),
    'confirmed_orders', (
      select count(*) from public.orders where status = 'CONFIRMED'
    ),
    'delivered_orders', (
      select count(*) from public.orders where status = 'DELIVERED'
    ),
    'cancelled_orders', (
      select count(*) from public.orders where status = 'CANCELLED'
    ),
    'delivered_revenue', (
      select coalesce(sum(total), 0) from public.orders where status = 'DELIVERED'
    ),
    'expected_revenue', (
      select coalesce(sum(total), 0) from public.orders where status = 'CONFIRMED'
    ),
    'low_stock_count', (
      select count(*) from public.products where status <> 'ARCHIVED' and stock <= 5
    ),
    'recent_orders', (
      select coalesce(jsonb_agg(to_jsonb(recent_order) order by recent_order.created_at desc), '[]'::jsonb)
      from (
        select
          id,
          order_number,
          customer_name,
          customer_phone,
          city,
          area,
          total,
          status,
          whatsapp_confirmation_url,
          created_at
        from public.orders
        order by created_at desc
        limit 6
      ) recent_order
    ),
    'low_stock_products', (
      select coalesce(jsonb_agg(to_jsonb(low_stock_product) order by low_stock_product.stock, low_stock_product.name), '[]'::jsonb)
      from (
        select id, name, slug, stock, status
        from public.products
        where status <> 'ARCHIVED' and stock <= 5
        order by stock, name
        limit 6
      ) low_stock_product
    )
  ) into dashboard;

  return dashboard;
end;
$$;

comment on function public.get_admin_dashboard() is
  'Returns compact order and stock dashboard data for authenticated admins in one request.';

revoke all on function public.get_admin_dashboard() from public, anon;
grant execute on function public.get_admin_dashboard() to authenticated;

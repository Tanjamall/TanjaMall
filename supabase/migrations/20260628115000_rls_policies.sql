create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'ADMIN'
  );
$$;

comment on function private.is_admin() is
  'Returns true when the current authenticated user has profiles.role = ADMIN. Used by RLS policies.';

create or replace function private.is_public_product(target_product_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.products p
    left join public.categories c on c.id = p.category_id
    where p.id = target_product_id
      and p.status = 'PUBLISHED'
      and (c.id is null or c.status = 'ACTIVE')
  );
$$;

comment on function private.is_public_product(uuid) is
  'Returns true when a product is published and its category is active. Used for public product image RLS.';

revoke all on schema private from public;
grant usage on schema private to anon, authenticated;
revoke all on all functions in schema private from public, anon, authenticated;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.is_public_product(uuid) to anon, authenticated;

create or replace view public.public_products
with (security_barrier = true)
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

comment on view public.public_products is
  'Safe public product projection. Excludes cost_price and internal_notes.';

revoke all on all tables in schema public from anon, authenticated;

grant usage on schema public to anon, authenticated;

grant select on public.categories to anon, authenticated;
grant select on public.product_images to anon, authenticated;
grant select on public.store_settings to anon, authenticated;
grant select on public.public_products to anon, authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, insert, update, delete on public.product_images to authenticated;
grant select, insert, update, delete on public.customers to authenticated;
grant select, insert, update, delete on public.orders to authenticated;
grant select, insert, update, delete on public.order_items to authenticated;
grant select, insert, update, delete on public.store_settings to authenticated;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
  or (select private.is_admin())
);

drop policy if exists "profiles_admin_insert" on public.profiles;
create policy "profiles_admin_insert"
on public.profiles
for insert
to authenticated
with check ((select private.is_admin()));

drop policy if exists "profiles_admin_update" on public.profiles;
create policy "profiles_admin_update"
on public.profiles
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "profiles_admin_delete" on public.profiles;
create policy "profiles_admin_delete"
on public.profiles
for delete
to authenticated
using ((select private.is_admin()));

drop policy if exists "categories_public_select_active" on public.categories;
create policy "categories_public_select_active"
on public.categories
for select
to anon, authenticated
using (status = 'ACTIVE');

drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all"
on public.categories
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all"
on public.products
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_images_public_select_published" on public.product_images;
create policy "product_images_public_select_published"
on public.product_images
for select
to anon, authenticated
using ((select private.is_public_product(product_id)));

drop policy if exists "product_images_admin_all" on public.product_images;
create policy "product_images_admin_all"
on public.product_images
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "customers_admin_all" on public.customers;
create policy "customers_admin_all"
on public.customers
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all"
on public.orders
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "order_items_admin_all" on public.order_items;
create policy "order_items_admin_all"
on public.order_items
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "store_settings_public_select" on public.store_settings;
create policy "store_settings_public_select"
on public.store_settings
for select
to anon, authenticated
using (true);

drop policy if exists "store_settings_admin_all" on public.store_settings;
create policy "store_settings_admin_all"
on public.store_settings
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

comment on table public.customers is
  'Public inserts are intentionally blocked. Task 4 will create secure create_cod_order RPC.';

comment on table public.orders is
  'Public inserts are intentionally blocked. Task 4 will create secure create_cod_order RPC.';

comment on table public.order_items is
  'Public inserts are intentionally blocked. Task 4 will create secure create_cod_order RPC.';

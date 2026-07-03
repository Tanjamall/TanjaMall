alter table public.products
  add column variants_enabled boolean not null default false,
  add column offers_enabled boolean not null default false,
  add column bundles_enabled boolean not null default false,
  add column allow_variant_offer_combo boolean not null default false,
  add column allow_variant_bundle_combo boolean not null default false,
  add column allow_offer_bundle_combo boolean not null default false,
  add column allow_variant_offer_bundle_combo boolean not null default false,
  add column default_variant_id uuid,
  add column default_offer_id uuid,
  add column default_bundle_id uuid;

create table public.product_detail_images (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint product_detail_images_sort_order_non_negative_check check (sort_order >= 0),
  constraint product_detail_images_product_sort_order_unique unique (product_id, sort_order)
);

create table public.product_variant_groups (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  slug text not null,
  display_type text not null default 'BUTTON',
  is_enabled boolean not null default true,
  is_required boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_variant_groups_display_type_check check (display_type in ('BUTTON', 'COLOR', 'IMAGE', 'SELECT')),
  constraint product_variant_groups_sort_order_non_negative_check check (sort_order >= 0),
  constraint product_variant_groups_product_slug_unique unique (product_id, slug),
  constraint product_variant_groups_product_sort_order_unique unique (product_id, sort_order)
);

create table public.product_variant_options (
  id uuid primary key default extensions.gen_random_uuid(),
  variant_group_id uuid not null references public.product_variant_groups(id) on delete cascade,
  label text not null,
  value text,
  color_value text,
  image_url text,
  price_delta numeric(10, 2) not null default 0,
  is_enabled boolean not null default true,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_variant_options_sort_order_non_negative_check check (sort_order >= 0),
  constraint product_variant_options_group_sort_order_unique unique (variant_group_id, sort_order)
);

create unique index product_variant_options_one_default_per_group_idx
on public.product_variant_options (variant_group_id)
where is_default = true;

create table public.product_variants (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  sku text,
  price numeric(10, 2),
  compare_at_price numeric(10, 2),
  stock integer not null default 0,
  image_url text,
  is_enabled boolean not null default true,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_variants_price_positive_check check (price is null or price > 0),
  constraint product_variants_compare_price_positive_check check (compare_at_price is null or compare_at_price > 0),
  constraint product_variants_stock_non_negative_check check (stock >= 0),
  constraint product_variants_sort_order_non_negative_check check (sort_order >= 0),
  constraint product_variants_product_sort_order_unique unique (product_id, sort_order)
);

create unique index product_variants_one_default_per_product_idx
on public.product_variants (product_id)
where is_default = true;

create table public.product_variant_option_values (
  product_variant_id uuid not null references public.product_variants(id) on delete cascade,
  variant_option_id uuid not null references public.product_variant_options(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_variant_id, variant_option_id)
);

create table public.product_offers (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  description text,
  quantity integer not null default 1,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  badge_text text,
  is_enabled boolean not null default true,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_offers_quantity_positive_check check (quantity > 0),
  constraint product_offers_price_positive_check check (price > 0),
  constraint product_offers_compare_price_positive_check check (compare_at_price is null or compare_at_price > 0),
  constraint product_offers_sort_order_non_negative_check check (sort_order >= 0),
  constraint product_offers_product_sort_order_unique unique (product_id, sort_order)
);

create unique index product_offers_one_default_per_product_idx
on public.product_offers (product_id)
where is_default = true;

create table public.product_bundles (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  badge_text text,
  image_url text,
  is_enabled boolean not null default true,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_bundles_price_positive_check check (price > 0),
  constraint product_bundles_compare_price_positive_check check (compare_at_price is null or compare_at_price > 0),
  constraint product_bundles_sort_order_non_negative_check check (sort_order >= 0),
  constraint product_bundles_product_sort_order_unique unique (product_id, sort_order)
);

create unique index product_bundles_one_default_per_product_idx
on public.product_bundles (product_id)
where is_default = true;

create table public.product_bundle_items (
  id uuid primary key default extensions.gen_random_uuid(),
  bundle_id uuid not null references public.product_bundles(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_slug text,
  product_image_url text,
  quantity integer not null default 1,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint product_bundle_items_quantity_positive_check check (quantity > 0),
  constraint product_bundle_items_sort_order_non_negative_check check (sort_order >= 0),
  constraint product_bundle_items_bundle_sort_order_unique unique (bundle_id, sort_order)
);

alter table public.products
  add constraint products_default_variant_id_fkey
  foreign key (default_variant_id)
  references public.product_variants(id)
  on delete set null,
  add constraint products_default_offer_id_fkey
  foreign key (default_offer_id)
  references public.product_offers(id)
  on delete set null,
  add constraint products_default_bundle_id_fkey
  foreign key (default_bundle_id)
  references public.product_bundles(id)
  on delete set null;

create trigger product_variant_groups_set_updated_at
before update on public.product_variant_groups
for each row execute function public.set_updated_at();

create trigger product_variant_options_set_updated_at
before update on public.product_variant_options
for each row execute function public.set_updated_at();

create trigger product_variants_set_updated_at
before update on public.product_variants
for each row execute function public.set_updated_at();

create trigger product_offers_set_updated_at
before update on public.product_offers
for each row execute function public.set_updated_at();

create trigger product_bundles_set_updated_at
before update on public.product_bundles
for each row execute function public.set_updated_at();

create index product_detail_images_product_id_sort_order_idx
on public.product_detail_images (product_id, sort_order);

create index product_variant_groups_product_id_sort_order_idx
on public.product_variant_groups (product_id, sort_order);

create index product_variant_options_group_id_sort_order_idx
on public.product_variant_options (variant_group_id, sort_order);

create index product_variants_product_id_sort_order_idx
on public.product_variants (product_id, sort_order);

create index product_variant_option_values_option_id_idx
on public.product_variant_option_values (variant_option_id);

create index product_offers_product_id_sort_order_idx
on public.product_offers (product_id, sort_order);

create index product_bundles_product_id_sort_order_idx
on public.product_bundles (product_id, sort_order);

create index product_bundle_items_bundle_id_sort_order_idx
on public.product_bundle_items (bundle_id, sort_order);

create index product_bundle_items_product_id_idx
on public.product_bundle_items (product_id);

create index products_default_variant_id_idx
on public.products (default_variant_id);

create index products_default_offer_id_idx
on public.products (default_offer_id);

create index products_default_bundle_id_idx
on public.products (default_bundle_id);

create or replace function private.is_public_variant_option(target_variant_option_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.product_variant_options pvo
    join public.product_variant_groups pvg on pvg.id = pvo.variant_group_id
    where pvo.id = target_variant_option_id
      and pvo.is_enabled = true
      and pvg.is_enabled = true
      and (select private.is_public_product(pvg.product_id))
  );
$$;

create or replace function private.is_public_bundle(target_bundle_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.product_bundles pb
    where pb.id = target_bundle_id
      and pb.is_enabled = true
      and (select private.is_public_product(pb.product_id))
  );
$$;

comment on function private.is_public_variant_option(uuid) is
  'Returns true when a variant option belongs to an enabled group for a published public product.';

comment on function private.is_public_bundle(uuid) is
  'Returns true when a bundle belongs to a published public product.';

revoke all on function private.is_public_variant_option(uuid) from public, anon, authenticated;
revoke all on function private.is_public_bundle(uuid) from public, anon, authenticated;
grant execute on function private.is_public_variant_option(uuid) to anon, authenticated;
grant execute on function private.is_public_bundle(uuid) to anon, authenticated;

create or replace view public.public_products
with (security_invoker = true, security_barrier = true)
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
  p.updated_at,
  p.variants_enabled,
  p.offers_enabled,
  p.bundles_enabled,
  p.allow_variant_offer_combo,
  p.allow_variant_bundle_combo,
  p.allow_offer_bundle_combo,
  p.allow_variant_offer_bundle_combo,
  p.default_variant_id,
  p.default_offer_id,
  p.default_bundle_id
from public.products p
left join public.categories c on c.id = p.category_id
where p.status = 'PUBLISHED'
  and (c.id is null or c.status = 'ACTIVE');

comment on view public.public_products is
  'Safe public product projection. Excludes cost_price and internal_notes.';

alter table public.product_detail_images enable row level security;
alter table public.product_variant_groups enable row level security;
alter table public.product_variant_options enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_variant_option_values enable row level security;
alter table public.product_offers enable row level security;
alter table public.product_bundles enable row level security;
alter table public.product_bundle_items enable row level security;

grant select on public.product_detail_images to anon, authenticated;
grant select on public.product_variant_groups to anon, authenticated;
grant select on public.product_variant_options to anon, authenticated;
grant select on public.product_variants to anon, authenticated;
grant select on public.product_variant_option_values to anon, authenticated;
grant select on public.product_offers to anon, authenticated;
grant select on public.product_bundles to anon, authenticated;
grant select on public.product_bundle_items to anon, authenticated;

grant select, insert, update, delete on public.product_detail_images to authenticated;
grant select, insert, update, delete on public.product_variant_groups to authenticated;
grant select, insert, update, delete on public.product_variant_options to authenticated;
grant select, insert, update, delete on public.product_variants to authenticated;
grant select, insert, update, delete on public.product_variant_option_values to authenticated;
grant select, insert, update, delete on public.product_offers to authenticated;
grant select, insert, update, delete on public.product_bundles to authenticated;
grant select, insert, update, delete on public.product_bundle_items to authenticated;
grant select on public.public_products to anon, authenticated;

drop policy if exists "product_detail_images_public_select_published" on public.product_detail_images;
create policy "product_detail_images_public_select_published"
on public.product_detail_images
for select
to anon, authenticated
using ((select private.is_public_product(product_id)));

drop policy if exists "product_detail_images_admin_all" on public.product_detail_images;
create policy "product_detail_images_admin_all"
on public.product_detail_images
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_variant_groups_public_select_published" on public.product_variant_groups;
create policy "product_variant_groups_public_select_published"
on public.product_variant_groups
for select
to anon, authenticated
using (is_enabled = true and (select private.is_public_product(product_id)));

drop policy if exists "product_variant_groups_admin_all" on public.product_variant_groups;
create policy "product_variant_groups_admin_all"
on public.product_variant_groups
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_variant_options_public_select_published" on public.product_variant_options;
create policy "product_variant_options_public_select_published"
on public.product_variant_options
for select
to anon, authenticated
using (
  is_enabled = true
  and exists (
    select 1
    from public.product_variant_groups pvg
    where pvg.id = variant_group_id
      and pvg.is_enabled = true
      and (select private.is_public_product(pvg.product_id))
  )
);

drop policy if exists "product_variant_options_admin_all" on public.product_variant_options;
create policy "product_variant_options_admin_all"
on public.product_variant_options
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_variants_public_select_published" on public.product_variants;
create policy "product_variants_public_select_published"
on public.product_variants
for select
to anon, authenticated
using (is_enabled = true and (select private.is_public_product(product_id)));

drop policy if exists "product_variants_admin_all" on public.product_variants;
create policy "product_variants_admin_all"
on public.product_variants
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_variant_option_values_public_select_published" on public.product_variant_option_values;
create policy "product_variant_option_values_public_select_published"
on public.product_variant_option_values
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.product_variants pv
    where pv.id = product_variant_id
      and pv.is_enabled = true
      and (select private.is_public_product(pv.product_id))
  )
  and (select private.is_public_variant_option(variant_option_id))
);

drop policy if exists "product_variant_option_values_admin_all" on public.product_variant_option_values;
create policy "product_variant_option_values_admin_all"
on public.product_variant_option_values
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_offers_public_select_published" on public.product_offers;
create policy "product_offers_public_select_published"
on public.product_offers
for select
to anon, authenticated
using (is_enabled = true and (select private.is_public_product(product_id)));

drop policy if exists "product_offers_admin_all" on public.product_offers;
create policy "product_offers_admin_all"
on public.product_offers
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_bundles_public_select_published" on public.product_bundles;
create policy "product_bundles_public_select_published"
on public.product_bundles
for select
to anon, authenticated
using (is_enabled = true and (select private.is_public_product(product_id)));

drop policy if exists "product_bundles_admin_all" on public.product_bundles;
create policy "product_bundles_admin_all"
on public.product_bundles
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "product_bundle_items_public_select_published" on public.product_bundle_items;
create policy "product_bundle_items_public_select_published"
on public.product_bundle_items
for select
to anon, authenticated
using ((select private.is_public_bundle(bundle_id)));

drop policy if exists "product_bundle_items_admin_all" on public.product_bundle_items;
create policy "product_bundle_items_admin_all"
on public.product_bundle_items
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

comment on table public.product_detail_images is
  'Shoppex-style stacked product detail images shown below the order form.';

comment on table public.product_variant_groups is
  'Product option groups such as color, size, model, or power.';

comment on table public.product_variant_options is
  'Selectable options inside a product variant group.';

comment on table public.product_variants is
  'Purchasable product variant combinations. Price can override the base product price when set.';

comment on table public.product_variant_option_values is
  'Join table linking a purchasable variant to its selected options.';

comment on table public.product_offers is
  'Optional quantity or package offers for a product.';

comment on table public.product_bundles is
  'Optional bundle offers that combine the base product with other products.';

comment on table public.product_bundle_items is
  'Products included inside a bundle, stored with enough snapshot text for admin editing and future orders.';

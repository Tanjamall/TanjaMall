grant select (
  id,
  category_id,
  name,
  slug,
  short_description,
  full_description,
  price,
  compare_at_price,
  stock,
  status,
  main_image_url,
  is_featured,
  is_best_seller,
  created_at,
  updated_at,
  variants_enabled,
  offers_enabled,
  bundles_enabled,
  allow_variant_offer_combo,
  allow_variant_bundle_combo,
  allow_offer_bundle_combo,
  allow_variant_offer_bundle_combo,
  default_variant_id,
  default_offer_id,
  default_bundle_id
) on public.products to anon;

drop policy if exists "products_public_select_published_safe_projection" on public.products;
create policy "products_public_select_published_safe_projection"
on public.products
for select
to anon
using ((select private.is_public_product(id)));

comment on policy "products_public_select_published_safe_projection" on public.products is
  'Allows anonymous storefront reads for published products through the safe public_products projection without granting private columns such as cost_price or internal_notes.';

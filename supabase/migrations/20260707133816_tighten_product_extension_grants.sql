revoke all on public.product_detail_images from anon, authenticated;
revoke all on public.product_variant_groups from anon, authenticated;
revoke all on public.product_variant_options from anon, authenticated;
revoke all on public.product_variants from anon, authenticated;
revoke all on public.product_variant_option_values from anon, authenticated;
revoke all on public.product_offers from anon, authenticated;
revoke all on public.product_bundles from anon, authenticated;
revoke all on public.product_bundle_items from anon, authenticated;

grant select on public.product_detail_images to anon, authenticated;
grant select on public.product_variant_groups to anon, authenticated;
grant select on public.product_variant_options to anon, authenticated;
grant select on public.product_variants to anon, authenticated;
grant select on public.product_variant_option_values to anon, authenticated;
grant select on public.product_offers to anon, authenticated;
grant select on public.product_bundles to anon, authenticated;
grant select on public.product_bundle_items to anon, authenticated;

grant insert, update, delete on public.product_detail_images to authenticated;
grant insert, update, delete on public.product_variant_groups to authenticated;
grant insert, update, delete on public.product_variant_options to authenticated;
grant insert, update, delete on public.product_variants to authenticated;
grant insert, update, delete on public.product_variant_option_values to authenticated;
grant insert, update, delete on public.product_offers to authenticated;
grant insert, update, delete on public.product_bundles to authenticated;
grant insert, update, delete on public.product_bundle_items to authenticated;

comment on table public.product_detail_images is
  'Shoppex-style stacked product detail images shown below the order form. Grants are intentionally limited; RLS controls row access.';

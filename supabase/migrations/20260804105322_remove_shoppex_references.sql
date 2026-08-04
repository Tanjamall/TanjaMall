update public.store_settings
set store_phone = '+212708012888'
where regexp_replace(coalesce(store_phone, ''), '[^0-9]', '', 'g') = '0672975000';

update public.store_settings
set whatsapp_number = '212708012888'
where regexp_replace(coalesce(whatsapp_number, ''), '[^0-9]', '', 'g') = '212672975000';

update public.products
set main_image_url = null
where lower(coalesce(main_image_url, '')) like '%shoppex%';

delete from public.product_images
where lower(image_url) like '%shoppex%';

delete from public.product_detail_images
where lower(image_url) like '%shoppex%';

update public.categories
set image_url = null
where lower(coalesce(image_url, '')) like '%shoppex%';

update public.product_variant_options
set image_url = null
where lower(coalesce(image_url, '')) like '%shoppex%';

update public.product_variants
set image_url = null
where lower(coalesce(image_url, '')) like '%shoppex%';

update public.product_bundles
set image_url = null
where lower(coalesce(image_url, '')) like '%shoppex%';

update public.product_bundle_items
set product_image_url = null
where lower(coalesce(product_image_url, '')) like '%shoppex%';

update public.order_items
set product_image_url = null
where lower(coalesce(product_image_url, '')) like '%shoppex%';

update public.orders
set whatsapp_confirmation_url = regexp_replace(
  whatsapp_confirmation_url,
  '^https://wa.me/212672975000',
  'https://wa.me/212708012888'
)
where coalesce(whatsapp_confirmation_url, '') like 'https://wa.me/212672975000%';

update public.products
set main_image_url = 'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/gallery/1785671646199-43a792cc-75b0-484f-94cd-dff5b6ee26dd-chatgpt-image-jul-14-2026-01_35_39-pm.webp'
where id = '45dcd5c6-7080-45ac-a60d-1cedecc50ec6'
  and main_image_url = 'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/gallery/1785671645349-04f444fc-6970-491d-bf7d-caef839ecd5b-chatgpt-image-jul-14-2026-01_58_20-pm.webp';

delete from public.product_images
where image_url in (
  'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/gallery/1785671645349-04f444fc-6970-491d-bf7d-caef839ecd5b-chatgpt-image-jul-14-2026-01_58_20-pm.webp',
  'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/gallery/1785671647824-f9f70f03-e2f7-4881-977a-db44830bbe4f-chatgpt-image-jul-14-2026-01_16_58-pm.webp'
);

delete from public.product_detail_images
where image_url in (
  'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/detail/1785671689914-8b2adc5c-afc0-4811-80c0-c61b9bfdcbed-chatgpt-image-jul-14-2026-01_58_20-pm.webp',
  'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/detail/1785671692320-21baaac6-4d96-49d2-b768-7948a0b7c70d-chatgpt-image-jul-14-2026-01_16_58-pm.webp'
);

update public.order_items
set product_image_url = 'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/gallery/1785671646199-43a792cc-75b0-484f-94cd-dff5b6ee26dd-chatgpt-image-jul-14-2026-01_35_39-pm.webp'
where product_image_url = 'https://images.tanjamall.com/admin-drafts/e77de9ff-001e-48b3-9cb1-8ee1711690b1/gallery/1785671645349-04f444fc-6970-491d-bf7d-caef839ecd5b-chatgpt-image-jul-14-2026-01_58_20-pm.webp';

comment on table public.product_detail_images is
  'Stacked product detail images shown below the order form. Grants are intentionally limited; RLS controls row access.';

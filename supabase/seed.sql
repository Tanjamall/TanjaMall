insert into public.categories (id, name, slug, description, status, sort_order)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'أضواء ومصابيح',
    'lights-lamps',
    'منتجات إضاءة منزلية وخارجية.',
    'ACTIVE',
    1
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'المنزل والحديقة',
    'home-garden',
    'منتجات عملية للمنزل والحديقة.',
    'ACTIVE',
    2
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'اكسسوارات السيارات',
    'car-accessories',
    'أدوات واكسسوارات مفيدة للسيارة.',
    'ACTIVE',
    3
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status,
  sort_order = excluded.sort_order;

insert into public.products (
  id,
  category_id,
  name,
  slug,
  short_description,
  full_description,
  price,
  compare_at_price,
  cost_price,
  sku,
  stock,
  status,
  main_image_url,
  is_featured,
  is_best_seller,
  internal_notes
)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '11111111-1111-4111-8111-111111111111',
    'بروجيكتور 120 واط يعمل بالطاقة الشمسية',
    'solar-projector-120w',
    'إضاءة خارجية تعمل بالطاقة الشمسية.',
    'بروجيكتور عملي للحدائق والمداخل مع شحن شمسي وتحكم سهل.',
    249,
    449,
    170,
    'TM-LIGHT-120W',
    25,
    'PUBLISHED',
    'https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp',
    true,
    true,
    'Seed product. Replace with real sourcing notes in admin only.'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    '22222222-2222-4222-8222-222222222222',
    'حقيبة استحمام محمولة للتخييم',
    'camp-shower-bag',
    'حقيبة استحمام محمولة تسخن الماء بالطاقة الشمسية.',
    'حل بسيط ومفيد للرحلات والتخييم والاستعمال الخارجي.',
    349,
    599,
    240,
    'TM-HOME-SHOWER',
    18,
    'PUBLISHED',
    'https://aga-shoppex.com/media/9329/h5KaxF2bZrxfy1uko2eHoNXQtm0aB3kfrWNI4oaR.jpg',
    true,
    false,
    'Seed product. Replace before production launch.'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '33333333-3333-4333-8333-333333333333',
    'حامل الأكواب ومستلزمات السيارة 4 في 1',
    'car-cup-holder',
    'منظم عملي داخل السيارة.',
    'حامل أكواب ومستلزمات يساعد على ترتيب الهاتف والمفاتيح والأغراض الصغيرة.',
    94,
    199,
    55,
    'TM-CAR-HOLDER',
    40,
    'PUBLISHED',
    'https://aga-shoppex.com/media/6960/conversions/A730p6nzLcj0SvR3Z9vTWHwpyFCRgQUa6iG8Q3B5-media-compressed.webp',
    false,
    true,
    'Seed product. Keep private.'
  )
on conflict (slug) do update
set
  category_id = excluded.category_id,
  name = excluded.name,
  short_description = excluded.short_description,
  full_description = excluded.full_description,
  price = excluded.price,
  compare_at_price = excluded.compare_at_price,
  cost_price = excluded.cost_price,
  sku = excluded.sku,
  stock = excluded.stock,
  status = excluded.status,
  main_image_url = excluded.main_image_url,
  is_featured = excluded.is_featured,
  is_best_seller = excluded.is_best_seller,
  internal_notes = excluded.internal_notes;

insert into public.product_images (product_id, image_url, alt_text, sort_order)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    'https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp',
    'بروجيكتور 120 واط',
    1
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    'https://aga-shoppex.com/media/9329/h5KaxF2bZrxfy1uko2eHoNXQtm0aB3kfrWNI4oaR.jpg',
    'حقيبة استحمام محمولة',
    1
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    'https://aga-shoppex.com/media/6960/conversions/A730p6nzLcj0SvR3Z9vTWHwpyFCRgQUa6iG8Q3B5-media-compressed.webp',
    'حامل أكواب للسيارة',
    1
  )
on conflict (product_id, sort_order) do update
set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.store_settings (
  id,
  store_name,
  store_phone,
  whatsapp_number,
  default_city,
  supported_cities,
  delivery_fee_tanger,
  free_delivery_threshold,
  announcement_text
)
values (
  '99999999-9999-4999-8999-999999999999',
  'TanjaMall',
  '0672975000',
  '212672975000',
  'Tanger',
  array['Tanger'],
  0,
  500,
  'الدفع عند الاستلام والتوصيل داخل طنجة'
)
on conflict (id) do update
set
  store_name = excluded.store_name,
  store_phone = excluded.store_phone,
  whatsapp_number = excluded.whatsapp_number,
  default_city = excluded.default_city,
  supported_cities = excluded.supported_cities,
  delivery_fee_tanger = excluded.delivery_fee_tanger,
  free_delivery_threshold = excluded.free_delivery_threshold,
  announcement_text = excluded.announcement_text;

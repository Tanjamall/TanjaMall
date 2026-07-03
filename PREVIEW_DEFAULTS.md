# Preview Defaults Tracker

This file tracks anything in the old static coded preview that must not be treated as production behavior.

The production project direction is now defined by `AGENTS.md` and `BUILD_PLAN.md`. The static preview is only a visual/interaction reference until Task 1 creates the Next.js project.

## Preview-Only Data

- Product names, descriptions, prices, old prices, stock text, discounts, ratings, and review counts in `assets/app.js`.
- Product detail image-stack URLs in `assets/app.js`.
- Category names, category colors, and category ordering in `assets/app.js`.
- Hero slide copy and selected featured products in `assets/app.js`.
- Product offer bundles in `assets/app.js`.
- Service phone number `0672975000`.
- Product WhatsApp CTA number `212672975000` and default message template in `assets/app.js`.

## Preview-Only Images

All current product images are remote Shoppex/AGA demo assets used only to mimic the reference visual style.

- `https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp`
- `https://aga-shoppex.com/media/6579/conversions/TAeiVgzHJIKIpJ5eu9eaFZuh6LjOEgzKzM19YVsW-media-compressed.webp`
- `https://aga-shoppex.com/media/6580/conversions/U6dOUpCIvx0ixJq8tEC5kElclbFkMI8sCuj2lCjD-media-compressed.webp`
- `https://aga-shoppex.com/media/8893/conversions/FQinn06FpPpjl7h9ARxmzp7oll8tyB2sd5oFdjSw-media-compressed.webp`
- `https://aga-shoppex.com/media/8894/conversions/BJ7sxz7aJxOG0Qf2ti1weQ5loVEU7DFAreJSb7MF-media-compressed.webp`
- `https://aga-shoppex.com/media/6960/conversions/A730p6nzLcj0SvR3Z9vTWHwpyFCRgQUa6iG8Q3B5-media-compressed.webp`
- `https://aga-shoppex.com/media/7280/conversions/X06D6pO77MLwZK1tdKiIXXmQicJVNDXeqzSjXce2-media-compressed.webp`
- `https://aga-shoppex.com/media/7312/conversions/O2xQolEzM9fNFiHnFL8d5TEU1dZnoRDTnqN0EGKk-media-compressed.webp`
- `https://aga-shoppex.com/media/7039/conversions/SKwTLtYVn8tHvfhSRAspBCjNeH1PvkgaJ5AMb07P-media-compressed.webp`
- `https://aga-shoppex.com/media/7304/conversions/jSZRufp73t44ezFlfhy0o3SUYREXd1WnWC6OKDIm-media-compressed.webp`
- `https://aga-shoppex.com/media/7190/conversions/ahIqllndilPzA6dVmsnWU2C4CyosFB0VFdBxy85X-media-compressed.webp`
- `https://aga-shoppex.com/media/9329/h5KaxF2bZrxfy1uko2eHoNXQtm0aB3kfrWNI4oaR.jpg`
- `https://aga-shoppex.com/media/9330/wXV11MnbdBbUIBuduhKAz1Vqm1OQyJ1wIApOnZ3k.jpg`
- `https://aga-shoppex.com/media/9321/conversions/39U79Odyg01EbgA5cEXEtbBIVWiSq7PI8HpUKrk3-media-compressed.webp`
- `https://aga-shoppex.com/media/9322/conversions/nocWZJcdeMJmxZLSMp3GTljF7W3jx6zBOdW0ithG-media-compressed.webp`
- `https://aga-shoppex.com/media/9323/conversions/2XupQ1GmjKj2V9B1UeMUmtUzg6OfvExfyfteJ2E7-media-compressed.webp`
- `https://aga-shoppex.com/media/9324/conversions/7ta9oY9t0s1p8oHjcdza8YNxa3fT7D4IGeqhGSpP-media-compressed.webp`

## Supabase Seed / Setup Defaults

These live setup values are useful for development only and must be replaced or cleaned before production launch.

- Seed categories in `supabase/seed.sql`:
  - `lights-lamps`
  - `home-garden`
  - `car-accessories`
- Seed products in `supabase/seed.sql`:
  - `solar-projector-120w`
  - `camp-shower-bag`
  - `car-cup-holder`
- Seed store settings:
  - Store name: `TanjaMall`
  - Store phone: `0672975000`
  - WhatsApp number: `212672975000`
  - Supported city: `Tanger`
  - Free delivery threshold: `500`
  - Tracking pixels disabled by default.
  - Meta/TikTok/GTM preview IDs in `components/admin/admin-demo-data.ts` are placeholders only.
- Seed product images still use remote Shoppex/AGA image URLs.
- Live setup verification order created during Task 4:
  - Order number: `TM-20260628-96484`
  - Customer name: `Test Customer`
  - Phone: `0612345678`
  - Address: `Test address Tanger`
  - Purpose: verifies anonymous `create_cod_order` behavior.

## Preview-Only Behavior

- Hash routes are used instead of real server routes:
  - `#/`
  - `#/category/:id`
  - `#/product/:slug`
- Cart, favorites, and fake orders are stored in browser `localStorage`.
- Fake product orders validate only basic Moroccan phone format.
- Cart checkout creates a fake order without customer details.
- Search filters local mock products only.
- Category filter drawer only supports one demo filter: offers above 40 percent.
- There is no real checkout backend, payment provider, shipping price calculation, stock reservation, analytics, product API, Supabase integration, or admin authentication in the static preview.

## MagicPath Admin Design Defaults

The MagicPath admin dashboard component is a design reference only:

- Working directory: `.magicpath-tanjamall-admin-dashboard/`
- Generated component: `fancily-meadow-6789`
- MagicPath component ID: `422127044336447488`
- Preview URL: `https://www.magicpath.ai/files/422127044336447488`

The following design sample values must be replaced by Supabase data during implementation:

- Dashboard metrics such as `18` new orders, `12,480 درهم` confirmed sales, `64` published products, and `7` low-stock products.
- Sample order numbers and customers such as `TM-1048`, `سعيد العمراني`, `مريم الإدريسي`, `يوسف العلوي`, and `هند المرابط`.
- Sample products such as `بروجيكتور 120 واط بالطاقة الشمسية`, `مصباح الطاقة الشمسية 500 واط`, `حقيبة استحمام محمولة للتخييم`, and `جهاز الطوارئ للسيارة ونفخ العجلات`.
- Sample category rows for `electronics`, `home-garden`, `lights`, and `toys`.
- Placeholder product-image blocks, form fields, dashboard tasks, status tabs, and settings fields.
- Any hardcoded WhatsApp/order confirmation copy shown in the MagicPath admin design.

Final admin pages must connect to Supabase and must not keep MagicPath mock rows as production data.

## MagicPath Product Editor Design Defaults

The MagicPath product editor component is a design reference only:

- Working directory: `.magicpath-tanjamall-product-editor/`
- Generated component: `merrily-hour-9166`
- MagicPath component ID: `422393827496726528`
- Preview URL: `https://www.magicpath.ai/files/422393827496726528`
- Detailed spec: `docs/PRODUCT_EDITOR_SPEC.md`

The following design sample values must be replaced by Supabase data during implementation:

- Sample product name: `solar projector 120w`.
- Sample category: lights/lamps.
- Sample prices: `249`, `449`, and cost examples.
- Sample variant groups such as color and power/wattage.
- Sample offer rows such as one piece, two pieces special price, and three-piece reseller offer.
- Sample bundle rows such as projector plus cable and outdoor lighting kit.
- Placeholder image slots for main image, gallery images, and Shoppex-style detail images.
- Placeholder readiness warnings, WhatsApp test action, product preview card, and publish state.

Final admin pages must calculate prices and stock from Supabase data and must not keep MagicPath mock selling options as production data.

## Task 7 Admin UI Temporary Data

The current real Next.js admin UI includes temporary sample rows only to shape the admin pages before Supabase CRUD is connected:

- File: `components/admin/admin-demo-data.ts`
- Sample products, categories, orders, dashboard metrics, and settings preview values are not production data.
- Product editor image controls mention Cloudflare R2/WebP but do not upload files yet.
- Product/category management will replace these rows in Task 8.
- Order management will replace these rows in Task 12.
- Dashboard/settings will replace these rows in Task 13.
- Tracking preview IDs for Meta Pixel, TikTok Pixel, and Google Tag Manager are placeholders only.
- `/admin-preview/*` routes bypass Supabase Auth for local/design review only.
- `ADMIN_PREVIEW_ENABLED` should stay false outside local/design review.

Do not treat Task 7 sample rows as seed data or real admin content.

## Local Storage Keys

- `tanjamall_preview_cart`
- `tanjamall_preview_favorites`
- `tanjamall_preview_orders`

## Production Replacement Checklist

- Replace this static preview with the Next.js/TypeScript project described in `BUILD_PLAN.md`.
- Replace mock product/category arrays with Supabase data.
- Replace remote Shoppex/AGA image URLs with TanjaMall media in Cloudflare R2.
- Replace fake order handlers with the secure `create_cod_order` Supabase RPC.
- Replace localStorage cart with the planned Zustand cart persistence.
- Replace preview offer bundles with real product/promotion fields.
- Confirm final customer service phone, WhatsApp behavior, delivery cities, and order status copy.

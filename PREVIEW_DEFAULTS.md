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

## Local Storage Keys

- `tanjamall_preview_cart`
- `tanjamall_preview_favorites`
- `tanjamall_preview_orders`

## Production Replacement Checklist

- Replace this static preview with the Next.js/TypeScript project described in `BUILD_PLAN.md`.
- Replace mock product/category arrays with Supabase data.
- Replace remote Shoppex/AGA image URLs with TanjaMall media in Supabase Storage.
- Replace fake order handlers with the secure `create_cod_order` Supabase RPC.
- Replace localStorage cart with the planned Zustand cart persistence.
- Replace preview offer bundles with real product/promotion fields.
- Confirm final customer service phone, WhatsApp behavior, delivery cities, and order status copy.

# TanjaMall COD Store

TanjaMall is a cash-on-delivery ecommerce store for Tanger, Morocco.

The approved customer storefront design is locked. Do not visually redesign customer-facing pages unless the user explicitly asks for a specific visual change.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui style components
- Supabase client libraries
- Supabase Auth, PostgreSQL, and RLS
- Cloudflare R2 for product images
- TanStack Table
- React Hook Form
- Zod
- Zustand
- Cloudflare Workers deployment through OpenNext

## Current Build Stage

Tasks 1 through 15 from `BUILD_PLAN.md` are implemented and release-tested. No deployment has been performed.

Task 1 from `BUILD_PLAN.md` is implemented:

- Next.js app foundation.
- Placeholder customer routes.
- Placeholder admin routes.
- shadcn-style admin shell.
- Supabase client utilities.
- Zustand cart store foundation.
- Zod checkout schema foundation.
- WhatsApp confirmation URL helper.
- Required folder structure.

Task 2 is implemented and applied to Supabase:

- `supabase/migrations/20260628113000_initial_schema.sql`
- `supabase/seed.sql`

Task 3 is implemented and applied to Supabase:

- `supabase/migrations/20260628115000_rls_policies.sql`

Task 4 is implemented and applied to Supabase:

- `supabase/migrations/20260628121000_create_cod_order.sql`
- `supabase/migrations/20260628122500_fix_cod_order_return.sql`

Live verification passed:

- Anonymous users can read `public_products`.
- Anonymous users cannot read the private `products` table.
- `create_cod_order` created verification order `TM-20260628-96484` with item snapshots and a WhatsApp confirmation URL.

Task 5 is implemented:

- Homepage reads live Supabase categories, products, and settings.
- `/products` reads live published products from `public_products`.
- `/category/[slug]` reads active categories and category products.
- `/products/[slug]` reads product details and product images.
- Product cards can add items to the local Zustand cart.
- Product detail pages include quantity controls, a gallery, detail image stack, related products, and WhatsApp info link.
- Customer-facing visual classes reuse the approved static preview styling.

Task 6 is implemented in code:

- `/admin/login` uses Supabase email/password login.
- Admin pages render through a protected server-side admin shell.
- Admin access checks the authenticated user plus `profiles.role = 'ADMIN'`.
- Logout is available from the admin header.
- One-time admin user setup is documented in `docs/ADMIN_AUTH_SETUP.md`.

The connected Supabase project has a working ADMIN user and protected admin login.

Task 7 is implemented in code:

- Clean protected admin shell with ecommerce-only navigation.
- Dashboard page with summary cards and recent-order layout.
- Product table page.
- Add/edit product editor structure based on the approved MagicPath draft.
- Category, order list, order detail, and settings page layouts.
- Reusable admin UI helpers for page headers, stat cards, tables, status badges, form sections, confirmation actions, and WhatsApp buttons.
- Temporary admin sample rows are isolated in `components/admin/admin-demo-data.ts` and tracked in `PREVIEW_DEFAULTS.md`.
- Image storage direction is updated to Cloudflare R2 with WebP compression; Supabase stores image metadata and public R2 URLs only.

Task 8 schema preparation is implemented and applied to Supabase:

- `supabase/migrations/20260703085954_product_editor_extensions.sql`
- Adds product detail image stack, variant groups/options, purchasable variants, offers, bundles, and bundle items.
- Adds product-level switches and defaults for variants, offers, bundles, and combination rules.
- Adds RLS policies and explicit Data API grants for the new public-safe product selling tables.

Tracking settings preparation is implemented and applied to Supabase:

- `supabase/migrations/20260703090017_tracking_pixel_settings.sql`
- Adds Meta/Facebook Pixel, TikTok Pixel, and Google Tag Manager fields to `store_settings`.
- Tracking is disabled by default in seed data.
- Enabled tracking scripts load only on public storefront routes, not `/admin` or `/admin-preview`.

Task 15 security hardening is implemented and applied to Supabase:

- `supabase/migrations/20260714224500_harden_internal_functions.sql`
- Internal trigger helpers are no longer callable through the public API.
- The timestamp trigger uses a fixed search path.

The old static storefront prototype remains in `index.html` and `assets/` as a visual reference only.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the Next.js dev server:

```bash
npm run dev
```

Run checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_R2_PUBLIC_BASE_URL=
NEXT_PUBLIC_IMAGE_UPLOAD_ENDPOINT=
ADMIN_PREVIEW_ENABLED=false
```

Do not expose any Supabase service-role key in browser code.
Do not expose any R2 write credentials in browser code.
`ADMIN_PREVIEW_ENABLED` is a server-side escape hatch for preview routes and should stay false outside local/design review.

This workspace has a local `.env.local` configured with the provided Supabase URL and anon key. The file is ignored by Git.

## Routes

Customer routes:

- `/`
- `/products`
- `/products/[slug]`
- `/category/[slug]`
- `/cart`
- `/checkout`
- `/order-success`

Admin routes:

- `/admin/login`
- `/admin/dashboard`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/categories`
- `/admin/orders`
- `/admin/orders/[id]`
- `/admin/settings`

Local admin preview routes, no Supabase login required in development:

- `/admin-preview/dashboard`
- `/admin-preview/products`
- `/admin-preview/products/new`
- `/admin-preview/categories`
- `/admin-preview/orders`
- `/admin-preview/settings`

Admin auth setup:

- See `docs/ADMIN_AUTH_SETUP.md`.

## Supabase Notes

Task 1 adds client utilities.

Task 2 added and applied the database schema and seed data.

Task 3 added and applied RLS policies and admin helper functions.

The RLS setup keeps public users away from direct product table access. Public product browsing should use the safe `public_products` view, which excludes `cost_price` and `internal_notes`.

Task 4 added and applied the secure `create_cod_order` RPC.

Task 8 schema preparation added and applied the product editor advanced selling model:

- `product_detail_images`
- `product_variant_groups`
- `product_variant_options`
- `product_variants`
- `product_variant_option_values`
- `product_offers`
- `product_bundles`
- `product_bundle_items`

This migration is applied to the connected Supabase project.

Tracking settings added and applied this migration:

- `supabase/migrations/20260703090017_tracking_pixel_settings.sql`

This migration is applied to the connected Supabase project.

Product image storage setup in Task 9 uses Cloudflare R2, not Supabase Storage.
Supabase stores image metadata and public R2 URLs only.
The admin upload Worker endpoint is configured through `NEXT_PUBLIC_IMAGE_UPLOAD_ENDPOINT`.

Task 5 storefront pages use:

- `categories`
- `store_settings`
- `product_images`
- `public_products`

The storefront does not read `cost_price` or `internal_notes`.
Tracking script injection reads safe tracking IDs from `store_settings` and skips admin routes.

We need real Supabase project info only when applying/testing migrations or connecting the app to live data.

The current utilities use:

- `@supabase/ssr`
- `@supabase/supabase-js`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Cloudflare Notes

This is a full-stack SSR Next.js app, so it uses Cloudflare Workers through the OpenNext adapter. A static Cloudflare Pages export would break admin auth, middleware, and server actions.

Deployment preparation files:

- `open-next.config.ts`
- `wrangler.jsonc`
- `public/_headers`

Useful commands:

```bash
npm run preview:cloudflare
npm run upload:cloudflare
npm run deploy:cloudflare
```

`upload:cloudflare` creates a Worker version without making it live. `deploy:cloudflare` publishes and must not be run until deployment is explicitly approved.

Product images are stored in Cloudflare R2 to reduce Supabase egress usage. Admin uploads go through a Cloudflare Worker with an R2 binding, and images are converted/compressed to WebP in the browser before upload.

Current image resources:

- R2 bucket: `tanjamall-product-images`
- Public image domain: `https://images.tanjamall.com`
- Upload Worker: `tanjamall-image-upload`
- Local/default upload endpoint: `https://tanjamall-image-upload.ecomtanger1.workers.dev`

The storefront Worker and the image-upload Worker are separate deployments. No R2 write credentials are stored in the Next.js app.

See `docs/DEPLOYMENT_CHECKLIST.md` for the production checklist.

## Release Verification

- Standard TypeScript and Next.js production builds pass.
- The OpenNext Cloudflare bundle builds and serves the homepage, admin login, and product page locally.
- Anonymous users can read safe published products but receive HTTP 401 for private product and order tables.
- Three published products are visible through `public_products`; the current draft remains private.
- R2 serves the verified product upload as `image/webp` with immutable caching.
- Controlled order `TM-20260714-84727` completed the product checkout and appeared in authenticated admin with a database-confirmed total of `249 MAD`.
- The order status changed from `NEW` to `CONTACTED`, then to `CANCELLED` for test-data cleanup.
- WhatsApp confirmation includes the order number, product and quantity, confirmed total, and clean delivery address.
- Meta, TikTok, and GTM are disabled by default and their scripts do not load on admin routes.

Remaining production account action: enable Supabase leaked-password protection before launch. The public `create_cod_order` security-definer advisory is intentional for guest checkout and the function validates all trusted prices and products inside PostgreSQL.

## Design Rule

The customer storefront design must match the approved static preview unless the user explicitly asks for a visual change.

The admin dashboard can use a clean shadcn-style layout because it is not customer-facing.

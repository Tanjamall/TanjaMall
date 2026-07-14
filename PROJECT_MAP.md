# Project Map

## Current Status

This workspace contains the old static Shoppex-style visual prototype plus the new Next.js project foundation.

The active direction is now:

- `AGENTS.md`
- `BUILD_PLAN.md`

Task 1 through Task 13 from `BUILD_PLAN.md` are implemented.
Task 14 is next: storefront polish, limited to explicit improvements that preserve the approved storefront visual design.

Tasks 2, 3, and 4 have been applied to the connected Supabase project:

- Project ref: `tszusjtcjackahheagll`
- Schema, RLS policies, seed data, and secure COD order RPC are live.
- A live anonymous checkout test created verification order `TM-20260628-96484`.

Task 8 product editor schema extension is applied:

- `supabase/migrations/20260703085954_product_editor_extensions.sql`
- Applied to the connected Supabase project.

Tracking settings schema extension is applied:

- `supabase/migrations/20260703090017_tracking_pixel_settings.sql`
- Applied to the connected Supabase project.

Advanced product table grants have been tightened:

- `supabase/migrations/20260707133816_tighten_product_extension_grants.sql`
- Applied to the connected Supabase project.
- Anonymous users have SELECT only on public-safe advanced product tables.
- Authenticated writes still require admin RLS policies.

The admin dashboard summary RPC is applied:

- `supabase/migrations/20260714113634_admin_dashboard_summary.sql`
- Returns compact admin-only metrics, recent orders, and low-stock products in one request.

## Important Files And Folders

- `AGENTS.md`
  - New source of truth for architecture, security, stack choices, business rules, and done criteria.

- `BUILD_PLAN.md`
  - Step-by-step implementation plan.
  - Work should proceed one task at a time.

- `index.html`
  - Old static preview entry point.
  - Kept only as a temporary visual/interaction reference.

- `assets/styles.css`
  - Old static preview styling.

- `assets/app.js`
  - Old static preview behavior and mock storefront data.
  - Contains customer-facing hash routes, carousel behavior, category filtering, product gallery, cart, favorites, and fake order handling.
  - The rejected preview admin has been removed.

- `app/`
  - Next.js App Router routes for the real project foundation.
  - Contains Supabase-backed customer storefront routes from Task 5.
  - Contains placeholder admin routes from Task 1.

- `components/`
  - Shared React components.
  - Includes shadcn-style `components/ui/*`, admin shell components, and Supabase-backed storefront components.
  - Includes Task 7 admin UI components, live product/category/order admin forms, and temporary demo rows only for admin-preview/dashboard areas not yet connected.

- `lib/`
  - Project utilities.
  - Includes Supabase client helpers, admin auth helpers, storefront data fetchers, Zustand cart foundation, WhatsApp helper, validators, tracking validators, and shared utilities.

- `docs/ADMIN_AUTH_SETUP.md`
  - One-time Supabase Auth admin setup steps.

- `supabase/migrations/`
  - Local SQL migrations.
  - Current schema file: `20260628113000_initial_schema.sql`.
  - Current RLS/security file: `20260628115000_rls_policies.sql`.
  - Current COD order RPC file: `20260628121000_create_cod_order.sql`.
  - Current COD order RPC fix file: `20260628122500_fix_cod_order_return.sql`.
  - Local product editor extension file: `20260703085954_product_editor_extensions.sql`.
  - Local tracking settings file: `20260703090017_tracking_pixel_settings.sql`.
  - Local public product projection grant file: `20260703091731_grant_public_product_projection_access.sql`.
  - Local advanced product grant hardening file: `20260707133816_tighten_product_extension_grants.sql`.
  - Admin dashboard summary RPC file: `20260714113634_admin_dashboard_summary.sql`.

- `supabase/seed.sql`
  - Local seed data for sample categories, products, product images, store settings, and disabled tracking defaults.

- `package.json`
  - Next.js scripts and pinned dependencies.

- `.env.example`
  - Required public Supabase environment variables.

- `.env.local`
  - Local-only Supabase URL and anon key.
  - Ignored by Git.
  - Never add service-role keys here for browser code.

- `PREVIEW_DEFAULTS.md`
  - Tracks mock values and fake behavior in the old static preview.

- `DESIGN_AUDIT.md`
  - Historical notes from the Shoppex visual matching pass.

- `.magicpath-shoppex-homepage/`
  - MagicPath working directory for the old homepage/storefront component.
  - Generated component: `boldly-sun-2869`.

- `.magicpath-shoppex-category/`
  - MagicPath working directory for the old category page component.
  - Generated component: `quiet-earth-1910`.

- `.magicpath-shoppex-product/`
  - MagicPath working directory for the old product page component.
  - Generated component: `breezily-ocean-5477`.

- `.magicpath-tanjamall-admin-dashboard/`
  - MagicPath working directory for the admin dashboard design system.
  - Generated component: `fancily-meadow-6789`.
  - MagicPath component ID: `422127044336447488`.
  - Preview URL: `https://www.magicpath.ai/files/422127044336447488`.
  - Important: this is a design reference for Task 7 only. It must not change the locked customer storefront design.

- `.magicpath-tanjamall-product-editor/`
  - MagicPath working directory for the admin add/edit product page design.
  - Generated component: `merrily-hour-9166`.
  - MagicPath component ID: `422393827496726528`.
  - Preview URL: `https://www.magicpath.ai/files/422393827496726528`.
  - Important: this design defines the product editor structure for variants, offers, bundles, detail images, and publish readiness.

- `docs/PRODUCT_EDITOR_SPEC.md`
  - Product editor requirements and data-model implications.
  - Captures variants, offers, bundles, and Shoppex-style detail image stack behavior before implementation.

- `docs/IMAGE_STORAGE_R2.md`
  - Source of truth for the product image storage decision.
  - Product image files go to Cloudflare R2 as compressed WebP.
  - Supabase stores image metadata and public R2 URLs only.
  - Current bucket: `tanjamall-product-images`.
  - Current public image domain: `https://images.tanjamall.com`.
  - Current upload Worker: `tanjamall-image-upload`.

## Static Preview Links

- Local desktop preview: http://localhost:5174/
- Current phone preview on same Wi-Fi: http://192.168.11.117:5174/

These links are for the old static storefront prototype only.

## Next.js Task 1 Preview Links

- Local desktop preview: http://localhost:3000/
- Current phone preview on same Wi-Fi: http://192.168.11.117:3000/

## Static Preview Routes

- Homepage / Storefront: `#/`
- Category Page: `#/category/lights-lamps`
- Product Page: `#/product/solar-projector-120w`

There is no static preview admin route anymore.

## Implemented Task 1 Routes

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

Local admin preview routes:

- `/admin-preview/dashboard`
- `/admin-preview/products`
- `/admin-preview/products/new`
- `/admin-preview/products/[id]/edit`
- `/admin-preview/categories`
- `/admin-preview/orders`
- `/admin-preview/orders/[id]`
- `/admin-preview/settings`

These preview routes bypass Supabase Auth only for local/design review. Production preview access is disabled unless `ADMIN_PREVIEW_ENABLED=true`, which should not be enabled for public deployment.

## Implemented Task 5 Customer Storefront

Customer routes now read live Supabase data:

- `/`
  - Shoppex-style header, search, service strip, hero carousel, horizontal category strip, product rows.
- `/products`
  - Product listing with category chips, search query support, sorting, load-more behavior, and order buttons.
- `/category/[slug]`
  - Dynamic category page using active Supabase categories and published products.
- `/products/[slug]`
  - Dynamic product detail page with image gallery, offer/quantity controls, order button, WhatsApp button, detail image stack, and related products.

The customer-facing visual classes intentionally reuse the approved static preview styling from `assets/styles.css`.

## Implemented Task 6 Admin Authentication

Admin routes now require:

- A valid Supabase Auth session.
- A matching `public.profiles` row.
- `profiles.role = 'ADMIN'`.

Implemented files:

- `app/admin/login/page.tsx`
- `app/admin/actions.ts`
- `app/admin/page.tsx`
- `components/admin/admin-login-form.tsx`
- `components/admin/admin-logout-button.tsx`
- `components/admin/admin-shell.tsx`
- `lib/admin/auth.ts`

Current live Supabase state:

- Auth user count is `1`.
- ADMIN profile count is `1`.
- Admin email enabled: `said.tchiche.work@gmail.com`.
- Admin login can now be tested at `/admin/login`.

## Implemented Task 7 Admin UI Foundation

Admin routes now have separated page layouts:

- `/admin/dashboard`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/categories`
- `/admin/orders`
- `/admin/orders/[id]`
- `/admin/settings`

Implemented files:

- `components/admin/admin-ui.tsx`
- `components/admin/admin-demo-data.ts`
- `components/admin/admin-tracking-settings-form.tsx`
- `components/admin/product-editor-form.tsx`
- `lib/images/r2.ts`
- `docs/IMAGE_STORAGE_R2.md`

Important:

- Task 7 admin data is temporary UI data only.
- Product/category CRUD is not connected yet.
- Order management is not connected yet.
- Product image uploads are not implemented yet.
- Product images use Cloudflare R2 and WebP compression, not Supabase Storage.
- Tracking settings are partially wired: Meta Pixel, TikTok Pixel, and GTM IDs can be saved after the tracking migration is applied.
- Runtime tracking scripts load only on public storefront routes and skip `/admin` and `/admin-preview`.

## Task 8 Product And Category Management Progress

The real admin product/category routes now connect to Supabase:

- `/admin/products`
  - Reads products from `public.products`.
  - Supports search and status filtering.
  - Shows category, price, stock, publish status, featured flag, best-seller flag, and actions.
  - Can publish, unpublish, and archive products.
- `/admin/products/new`
  - Creates a draft or published product.
  - Saves basics, category, descriptions, SKU, price, compare-at price, admin-only cost price, stock, status, featured/best-seller flags, main image URL, gallery image URLs, Shoppex-style detail image URLs, advanced selling enable flags, variants, offers, bundles, and internal notes.
- `/admin/products/[id]/edit`
  - Loads existing product data and related image/detail/variant/offer/bundle rows.
  - Saves updates back to Supabase.
- `/admin/categories`
  - Reads categories from `public.categories`.
  - Creates and edits categories.
  - Can hide/show categories.
  - Shows product counts based on current product rows.

Implemented files:

- `lib/admin/catalog.ts`
- `lib/validators/catalog.ts`
- `app/admin/products/actions.ts`
- `app/admin/categories/actions.ts`
- `components/admin/product-editor-form.tsx`
- `components/admin/category-form.tsx`

Important limitations still reserved for later tasks:

- Product image upload buttons now compress images to WebP in the browser and upload through the `tanjamall-image-upload` Cloudflare Worker.
- Admin can upload main, gallery, detail, and category images before or after the product/category has been saved.
- R2 upload paths are organized by saved record id when available:
  - `products/{product_id}/{purpose}/...`
  - `categories/{category_id}/image/...`
- Unsaved admin uploads use `admin-drafts/{admin_user_id}/{purpose}/...` and should be cleaned later if not attached to saved content.
- Removal/reordering polish remains for later.
- Cart/checkout still need later updates to understand selected variants, offers, and bundles before those advanced selling options affect public ordering.
- Order dashboard and order management remain later tasks.

## Build Direction

The production project should use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security
- Cloudflare Pages
- Cloudflare R2 for product images
- TanStack Table
- React Hook Form
- Zod
- Zustand

Do not use Medusa, Saleor backend, Shopify backend, WooCommerce backend, Prisma, Express, MongoDB, Stripe, or customer accounts for the MVP.

## Implemented Task 9 Image Storage

- Main, gallery, detail, and category image uploads compress to WebP in the browser and upload through the admin-only Cloudflare Worker.
- Product images are delivered publicly from `images.tanjamall.com`.
- Unsaved uploads use an admin draft path and saved records use their product or category ID in the R2 path.

## Implemented Task 10 Cart

- `/cart` now uses persisted Zustand cart data rather than a placeholder page.
- Customers can view cart items, adjust quantities, remove products, see the estimated subtotal, and continue to checkout.
- The existing product-page order buttons add the item and open the cart.
- Final totals remain database-calculated when Task 11 creates the COD order.

## Implemented Task 11 COD Checkout

- `/checkout` now presents a short guest COD form for name, Moroccan phone number, city, area, address, and optional notes.
- The checkout calls `create_cod_order` with customer details plus product IDs and quantities only.
- Supabase validates availability and calculates the real subtotal, delivery fee, and total.
- The cart clears only after a confirmed order response, then the customer sees the order number and confirmed total at `/order-success`.
- The public RPC endpoint was checked with an invalid validation request only; no extra test order was created.

## Implemented Task 12 Admin Order Management

- `/admin/orders` now reads live Supabase orders and uses TanStack Table for order-number, customer-name, and phone search plus status filtering.
- Every order row includes the customer, phone, city/area, total, status, creation date, WhatsApp confirmation, and detail actions.
- `/admin/orders/[id]` now shows live customer and delivery data, product snapshots, totals, customer notes, and internal notes.
- Admins can move orders through every MVP status and save internal notes through protected server actions.
- WhatsApp confirmation links include the customer name, order number, products and quantities, confirmed total, delivery address, and confirmation question.
- No database migration was needed because the existing order tables, timestamps, admin RLS policies, and checkout snapshot data already support this workflow.

## Implemented Task 13 Dashboard And Settings

- `/admin/dashboard` now uses one compact admin-only Supabase RPC for all dashboard metrics, recent orders, and low-stock products.
- Dashboard metrics follow the order rules: delivered revenue uses only `DELIVERED` orders, while confirmed revenue is shown separately as expected revenue.
- Recent orders link to live order details and stored WhatsApp confirmation URLs.
- `/admin/settings` now saves the store name, phone, WhatsApp number, default city, supported cities, delivery fee, free-delivery threshold, and homepage announcement.
- Store settings use React Hook Form in the client and Zod validation in the protected server action.
- Existing Meta, TikTok, and Google Tag Manager settings remain connected to Supabase.
- R2 image configuration is shown as read-only because write credentials and bucket configuration must not be editable in browser code.
- `get_admin_dashboard()` is restricted to authenticated admins and reduces dashboard egress to one compact request.

## Next Step

Build Task 14 carefully. The storefront is visually locked, so only implement polish that the user explicitly approves or nonvisual states that preserve the existing design.

Task 7 design reference is now prepared in MagicPath:

- `TanjaMall Admin Dashboard System`
- Generated component: `fancily-meadow-6789`
- Preview URL: `https://www.magicpath.ai/files/422127044336447488`

Product editor design reference is also prepared in MagicPath:

- `TanjaMall Admin Product Editor`
- Generated component: `merrily-hour-9166`
- Preview URL: `https://www.magicpath.ai/files/422393827496726528`
- Detailed spec: `docs/PRODUCT_EDITOR_SPEC.md`

Important: customer-facing visual design remains locked. Do not visually redesign it while building admin/auth/order features.

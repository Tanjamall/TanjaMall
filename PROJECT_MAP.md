# Project Map

## Current Status

This workspace contains the old static Shoppex-style visual prototype plus the new Next.js project foundation.

The active direction is now:

- `AGENTS.md`
- `BUILD_PLAN.md`

Task 1 through Task 6 from `BUILD_PLAN.md` are implemented.

Tasks 2, 3, and 4 have been applied to the connected Supabase project:

- Project ref: `tszusjtcjackahheagll`
- Schema, RLS policies, seed data, and secure COD order RPC are live.
- A live anonymous checkout test created verification order `TM-20260628-96484`.

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

- `lib/`
  - Project utilities.
  - Includes Supabase client helpers, admin auth helpers, storefront data fetchers, Zustand cart foundation, WhatsApp helper, validators, and shared utilities.

- `docs/ADMIN_AUTH_SETUP.md`
  - One-time Supabase Auth admin setup steps.

- `supabase/migrations/`
  - Local SQL migrations.
  - Current schema file: `20260628113000_initial_schema.sql`.
  - Current RLS/security file: `20260628115000_rls_policies.sql`.
  - Current COD order RPC file: `20260628121000_create_cod_order.sql`.
  - Current COD order RPC fix file: `20260628122500_fix_cod_order_return.sql`.

- `supabase/seed.sql`
  - Local seed data for sample categories, products, product images, and store settings.

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

## Static Preview Links

- Local desktop preview: http://localhost:5174/
- Current phone preview on same Wi-Fi: http://192.168.11.123:5174/

These links are for the old static storefront prototype only.

## Next.js Task 1 Preview Links

- Local desktop preview: http://localhost:3000/
- Current phone preview on same Wi-Fi: http://192.168.11.123:3000/

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

- ADMIN profile count is `0`.
- Create an Auth user and matching profile row using `docs/ADMIN_AUTH_SETUP.md` before testing a successful login.

## Build Direction

The production project should use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Supabase Row Level Security
- Cloudflare Pages
- TanStack Table
- React Hook Form
- Zod
- Zustand

Do not use Medusa, Saleor backend, Shopify backend, WooCommerce backend, Prisma, Express, MongoDB, Stripe, or customer accounts for the MVP.

## Next Step

Continue to Task 7: Admin dashboard UI customization.

Task 7 design reference is now prepared in MagicPath:

- `TanjaMall Admin Dashboard System`
- Generated component: `fancily-meadow-6789`
- Preview URL: `https://www.magicpath.ai/files/422127044336447488`

Important: customer-facing visual design remains locked. Do not visually redesign it while building admin/auth/order features.

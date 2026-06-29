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
- Cloudflare deployment target

## Current Build Stage

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

The connected Supabase project currently has no ADMIN profile. Create an Auth user and matching profile row before expecting admin login to succeed.

Task 7 is implemented in code:

- Clean protected admin shell with ecommerce-only navigation.
- Dashboard page with summary cards and recent-order layout.
- Product table page.
- Add/edit product editor structure based on the approved MagicPath draft.
- Category, order list, order detail, and settings page layouts.
- Reusable admin UI helpers for page headers, stat cards, tables, status badges, form sections, confirmation actions, and WhatsApp buttons.
- Temporary admin sample rows are isolated in `components/admin/admin-demo-data.ts` and tracked in `PREVIEW_DEFAULTS.md`.
- Image storage direction is updated to Cloudflare R2 with WebP compression; Supabase stores image metadata and public R2 URLs only.

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

Product image storage setup comes in Task 9 and will use Cloudflare R2, not Supabase Storage.
Supabase stores image metadata and public R2 URLs only.

Task 5 storefront pages use:

- `categories`
- `store_settings`
- `product_images`
- `public_products`

The storefront does not read `cost_price` or `internal_notes`.

We need real Supabase project info only when applying/testing migrations or connecting the app to live data.

The current utilities use:

- `@supabase/ssr`
- `@supabase/supabase-js`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Cloudflare Notes

The build currently passes with standard Next.js tooling.

Cloudflare's current docs separate deployment paths:

- Cloudflare Pages is for static Next.js exports.
- Full-stack SSR Next.js apps use Cloudflare Workers with the OpenNext adapter.

Because this app will need admin auth and dynamic ecommerce behavior, the final deployment path should be confirmed before Task 15. For now, keep the app compatible with standard Next.js and avoid a long-running custom Node.js server.

Product images will be stored in Cloudflare R2 to reduce Supabase egress usage. Admin uploads should go through a Cloudflare-side endpoint with an R2 binding, and images should be converted/compressed to WebP before upload.

## Design Rule

The customer storefront design must match the approved static preview unless the user explicitly asks for a visual change.

The admin dashboard can use a clean shadcn-style layout because it is not customer-facing.

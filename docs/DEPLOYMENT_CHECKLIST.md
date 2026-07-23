# Deployment Checklist

## Before deployment

- Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run preview:cloudflare`.
- Confirm all Supabase migrations in `supabase/migrations` are applied.
- Confirm the admin user has `profiles.role = 'ADMIN'`.
- Confirm Meta, TikTok, and GTM tracking remain disabled until real IDs are provided.
- Confirm `NEXT_PUBLIC_IMAGE_UPLOAD_ENDPOINT` points to the protected image-upload Worker.
- Confirm the R2 public domain serves uploaded WebP images.
- Confirm no service-role key or R2 write credential exists in client code or Cloudflare public variables.

## Cloudflare variables

Configure these for the storefront Worker build and runtime:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_R2_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_IMAGE_UPLOAD_ENDPOINT`
- `ADMIN_PREVIEW_ENABLED=false`

The `NEXT_PUBLIC_*` values must be available during the OpenNext build because Next.js can inline them into browser bundles.

## Current release candidate

- Git release commit: `66ee3d6`
- Worker version: `02fca7bd-1192-4fdc-9d3d-acfdd22896fe`
- Review alias: `https://rc-66ee3d6-tanjamall-store.ecomtanger1.workers.dev`
- `workers_dev` is disabled and preview URLs are enabled.
- Cloudflare reports no production targets; no custom domain is attached.
- `ADMIN_PREVIEW_ENABLED=false` is set on the Worker version.
- Preview COD smoke order `TM-20260723-72790` was created with a database-calculated `94 MAD` total and a preserved product snapshot.
- The order appeared in authenticated admin, its WhatsApp link used stored order data, and its status was tested through `CONFIRMED`, `DELIVERED`, and final `RETURNED`.

## Release sequence

1. Connect the Git repository to Cloudflare Workers Builds or authenticate Wrangler locally.
2. Configure the environment variables above.
3. Run `npm run upload:cloudflare` for a non-live Worker version and inspect it.
4. Test storefront browsing, one COD order, admin order visibility, status update, and WhatsApp link.
5. Run `npm run deploy:cloudflare` only after explicit approval.
6. Attach the production custom domain and repeat the smoke test.

## Rollback

Use Cloudflare Workers deployment history to roll back to the previous healthy version. Database migrations require a separate reviewed rollback migration; do not edit or delete an already-applied migration.

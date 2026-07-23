# Image Storage With Cloudflare R2

## Decision

TanjaMall uses Supabase for database, auth, RLS, and secure order creation.

Product image files are stored in Cloudflare R2, not Supabase Storage, to reduce Supabase free-plan egress usage.

Supabase stores only image metadata and public URLs:

- `products.main_image_url`
- `categories.image_url`
- `product_images.image_url`
- future `product_detail_images.image_url`
- future variant or bundle image URLs

## Upload Flow

The admin upload flow is:

1. Admin selects image in the product or category editor.
2. Browser compresses/converts the image to WebP before upload.
3. Admin upload request goes through a Cloudflare Worker endpoint using an R2 binding.
4. The R2 object key and public URL are returned to the admin UI.
5. The admin form saves the R2 public URL and metadata to Supabase.

The browser must never receive R2 write credentials.

Uploads work before and after the product/category is saved. Saved records use their real Supabase IDs. Unsaved records upload to an admin draft folder, avoiding preview placeholders such as `products/new-product/...`.

Current object key shape:

- Product images: `products/{product_id}/{main|gallery|detail|variant|bundle}/{timestamp}-{uuid}-{name}.webp`
- Category images: `categories/{category_id}/image/{timestamp}-{uuid}-{name}.webp`
- Unsaved admin uploads: `admin-drafts/{admin_user_id}/{purpose}/{timestamp}-{uuid}-{name}.webp`

## Delivery Flow

The storefront reads image URLs from Supabase and renders them directly from the R2 public/custom domain.

Use:

- `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` for generated public image URLs.
- `NEXT_PUBLIC_IMAGE_UPLOAD_ENDPOINT` for the admin upload Worker endpoint.
- Cloudflare R2 bucket binding for server-side uploads.
- A custom domain for public image delivery before production, if possible.

Current Cloudflare resources:

- Bucket: `tanjamall-product-images`
- Public image domain: `https://images.tanjamall.com`
- Upload Worker: `tanjamall-image-upload`
- Local upload endpoint: `https://tanjamall-image-upload.ecomtanger1.workers.dev`
- Deployment config: `wrangler.image-upload.jsonc`

## WebP Compression Rules

Admin uploads should be normalized before storage:

- Convert common input formats to WebP.
- Keep product card and gallery images reasonably small.
- Use a quality setting around `0.78` to `0.85` unless the product needs more detail.
- Preserve enough resolution for product detail images.
- Reject unsupported files with a clear admin error.

Suggested initial limits:

- Input file max: `8 MB`
- Product card/gallery target width: `1200 px`
- Detail image target width: `1400 px`
- WebP MIME type: `image/webp`

## Security

- Public users can view final image URLs.
- Only authenticated admins can upload or delete image files.
- R2 write credentials must stay server-side in Cloudflare bindings or server-only environment variables.
- Do not expose R2 access keys through `NEXT_PUBLIC_*`.
- Supabase RLS protects the metadata rows, not the binary files.
- The upload Worker allows local preview origins on port `3000` and TanjaMall storefront version/alias preview URLs under `ecomtanger1.workers.dev`.
- CORS access does not authorize an upload; every request still requires a valid Supabase session whose `profiles.role` is `ADMIN`.
- The tracked Worker config contains no Supabase keys. `keep_vars` preserves the remotely configured environment values during deployments.

## Implementation Notes

Task 9 implements R2, not Supabase Storage.

The upload endpoint runs as a standalone Cloudflare Worker with an R2 bucket binding. It verifies the Supabase Auth JWT, checks `profiles.role = 'ADMIN'`, accepts compressed WebP files only, and returns a public R2 URL for the admin form to save in Supabase.

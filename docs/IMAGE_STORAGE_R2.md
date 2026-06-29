# Image Storage With Cloudflare R2

## Decision

TanjaMall uses Supabase for database, auth, RLS, and secure order creation.

Product image files must be stored in Cloudflare R2, not Supabase Storage, to reduce Supabase free-plan egress usage.

Supabase stores only image metadata and public URLs:

- `products.main_image_url`
- `categories.image_url`
- `product_images.image_url`
- future `product_detail_images.image_url`
- future variant or bundle image URLs

## Upload Flow

The final admin upload flow should be:

1. Admin selects image in the product editor.
2. Browser compresses/converts the image to WebP before upload.
3. Admin upload request goes through a Cloudflare-side endpoint using an R2 binding.
4. The R2 object key and public URL are returned to the admin UI.
5. The admin form saves the R2 public URL and metadata to Supabase.

The browser must never receive R2 write credentials.

## Delivery Flow

The storefront reads image URLs from Supabase and renders them directly from the R2 public/custom domain.

Use:

- `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` for generated public image URLs.
- Cloudflare R2 bucket binding for server-side uploads.
- A custom domain for public image delivery before production, if possible.

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

## Implementation Notes

Task 9 should be updated to implement R2, not Supabase Storage.

If the deployment uses Cloudflare Pages/Workers with OpenNext, image upload endpoints should run in the Cloudflare environment and use an R2 bucket binding.


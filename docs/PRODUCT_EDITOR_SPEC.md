# Product Editor Spec

## Purpose

The admin add/edit product page controls every public product touchpoint:

- Product cards
- Product listing/category pages
- Product detail page
- Product gallery
- Shoppex-style vertical detail image stack
- Product order form
- Cart item shape
- Checkout pricing validation
- Order item snapshots

The customer storefront design remains locked. This spec describes the admin controls needed to feed that storefront, not a storefront redesign.

## MagicPath Reference

- Component name: `TanjaMall Admin Product Editor`
- Generated component: `merrily-hour-9166`
- Component ID: `422393827496726528`
- Preview URL: `https://www.magicpath.ai/files/422393827496726528`

## Recommended Layout

Use a desktop-first admin editor with:

- Sticky top action bar: back, preview, save draft, publish.
- Main content column: product data sections.
- Sticky right panel: status, publish actions, product card preview, readiness warnings, product link, WhatsApp test.
- Section tabs or anchors: basics, price/stock, images, detail images, advanced selling, publish.

## Required Sections

### Basics

- Product name
- Slug
- Category
- Short selling description
- Full/admin description if needed
- Status: `DRAFT`, `PUBLISHED`, `ARCHIVED`

### Price And Stock

- Selling price
- Compare-at price
- Cost price, admin-only
- SKU
- Stock
- Low-stock threshold
- Stock status

### Images

- Main image
- Gallery images
- Image ordering
- Image removal
- Image preview
- Uploads go to Cloudflare R2, not Supabase Storage
- Images should be converted/compressed to WebP before upload

### Detail Image Stack

The public product details section should follow the current Shoppex-style pattern: mainly stacked images, not text/spec tables.

Controls:

- Add detail image
- Reorder detail images
- Remove detail image
- Optional internal label
- Optional alt text
- Store image file in Cloudflare R2 and save only the public R2 URL in Supabase

### Variants

Variants must be optional and can be enabled or disabled per product.

Examples:

- Color
- Size
- Model
- Pack size
- Power/wattage

Controls:

- Enable variants
- Variant groups/options
- Variant SKU
- Variant price or price adjustment
- Variant stock
- Variant image
- Default variant
- Active/inactive variant

### Offers

Offers must be optional and can be enabled or disabled per product.

Examples:

- One piece
- Two pieces special price
- Quantity discount
- Limited offer

Controls:

- Enable offers
- Offer title
- Quantity
- Offer price
- Compare-at price
- Badge text
- Default selected offer
- Active/inactive offer
- Sort order

### Bundles

Bundles must be optional and can be enabled or disabled per product.

Examples:

- Product plus accessory
- Product plus replacement part
- Product plus another recommended product

Controls:

- Enable bundles
- Bundle title
- Included products
- Quantity per included product
- Bundle price
- Compare-at price
- Bundle image, optional
- Active/inactive bundle
- Sort order

### Purchase Configuration

Variants, offers, and bundles must be usable:

- In isolation
- Together
- Disabled entirely

Required controls:

- Enable variants
- Enable offers
- Enable bundles
- Allow offer with selected variant
- Allow bundle with selected variant
- Allow offer with bundle
- Force one selling option only
- Default purchase mode

Supported modes:

- Simple product only
- Variants only
- Offers only
- Bundles only
- Variants + offers
- Offers + bundles
- Variants + bundles
- Variants + offers + bundles

## Data Model Impact

The existing base schema does not fully cover the editor above. Before final product-management implementation, add migrations for advanced product selling data.

Proposed tables:

- `product_detail_images`
- `product_variant_groups`
- `product_variant_options`
- `product_variants`
- `product_variant_option_values`
- `product_offers`
- `product_bundles`
- `product_bundle_items`

The cart and `create_cod_order` RPC must eventually accept selected variant, offer, and bundle identifiers and calculate trusted totals from database data, never from client-submitted prices.

Product image files are stored in Cloudflare R2. Supabase stores image metadata and public R2 URLs only.

Local migration created:

- `supabase/migrations/20260703085954_product_editor_extensions.sql`

This migration has been applied to the connected Supabase project.

## Publish Readiness Checks

The editor should warn before publishing when:

- Product name is missing.
- Slug is missing or not unique.
- Category is missing.
- Selling price is missing or invalid.
- Main image is missing.
- Detail images are missing.
- Stock is negative.
- Enabled variants have no options.
- Enabled offers have invalid prices.
- Enabled bundles reference unpublished or archived products.
- Public product would expose admin-only fields.

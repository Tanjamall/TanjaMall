# Design Audit Notes

Last checked: 2026-06-26

## Confirmed Rules

- Fonts:
  - All three active MagicPath components import Cairo only.
  - Body and headings both fall back to Cairo.
  - This follows Shoppex typography.
  - The coded preview imports Cairo only and applies it globally to page text, controls, forms, and headings.

- Colors:
  - TanjaMall colors are used as replacement brand tokens only.
  - Primary dark: `#131921`
  - Main CTA/accent: `#ff9900`
  - Accent text: `#b45309`

- Layout:
  - Header/search/service strip follow Shoppex mobile page structure.
  - Product cards use Shoppex-like square image cards with discount badge, favorite circle, stock line, price row, and buy button.
  - Homepage categories are now a horizontal scrollable strip.
  - Category page has horizontal category chips, filters, sort, drawer, and two-column grid.
  - Product page has carousel, thumbnails, offer selector, COD form, quantity controls, trust section, and sticky buy bar.
  - The coded preview separates the homepage, category page, and product page using hash routes.
  - The coded preview includes interactive cart, favorites, category sorting/filtering, offer selection, quantity changes, and fake orders.

## Corrections Made

- Removed drift toward TanjaMall layout patterns.
- Enforced Cairo for headings as well as body text.
- Made homepage categories a horizontal scroll strip.
- Made category page category chips scroll horizontally.
- Kept product sticky buy bar contained inside the component preview rather than viewport-fixed.

## Known Constraints

- MagicPath source may normalize remote image URLs after submit; refresh with `code start` before any follow-up edit.
- Product/category data is mocked for design interaction. Production should fetch categories, products, stock, price, and cart/order state from backend APIs.
- Earlier combined component `peaceful-shade-8064` is not the current source of truth.
- Coded preview defaults are tracked in `PREVIEW_DEFAULTS.md` and must be replaced before production.

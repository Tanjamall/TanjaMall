# TanjaMall Storefront Design System

## Overview

TanjaMall uses a warm, restrained retail system built around a dark navy header, orange conversion accents, softly tinted neutrals, and product-led imagery. Mobile remains compact and app-like. Desktop uses broad retail layouts with horizontal navigation, denser product grids, two-column purchase flows, and sticky order summaries.

## Theme

Light theme for daytime and household shopping. White merchandise surfaces sit on a lightly tinted page background. Dark navigation establishes trust and orange identifies price, status, and primary purchase actions.

## Color Palette

- Navigation: `--tm-dark` and `--tm-dark-2`
- Primary ink: `--tm-ink`
- Secondary text: `--tm-muted`
- Conversion accent: `--tm-orange`
- Dark accent text: `--tm-orange-dark`
- Page and section tints: `--tm-soft`, `--tm-cream`, `--tm-green-soft`
- Borders: `--tm-border`
- Merchandise surface: `--tm-card`

Use the existing CSS custom properties. Do not add decorative colors when an existing semantic token works.

## Typography

Use Cairo throughout to support Arabic-first retail content. Create hierarchy through size and weight:

- Desktop page title: 32-40px, 900
- Desktop section title: 24-30px, 900
- Product title: 15-18px, 800
- Body: 14-16px, 600-700
- Supporting labels: 12-13px, 700-800

Keep body copy below 70 characters per line where possible.

## Layout

- Mobile content: preserve the existing 520px-centered approved storefront.
- Desktop shell: full-width header with a 1180-1320px content rail.
- Desktop homepage: wide hero, trust row, category grid, and four-column product sections.
- Desktop listing: optional 240-280px filter rail plus three or four product columns.
- Desktop product detail: 55/45 gallery and sticky purchase column.
- Desktop cart and checkout: main content plus 360-400px sticky summary.
- Desktop footer: multi-column information and trust area.

Use generous whitespace between major desktop sections and tighter spacing within product groups.

## Components

- Buttons: orange primary, neutral outlined secondary, 8-10px radius.
- Product cards: restrained border, minimal shadow, image-led layout; actions remain visible.
- Panels: white surface with border; reserve elevated panels for summaries and transactional groups.
- Inputs: 48-52px desktop height with visible labels and focus states.
- Navigation: desktop horizontal categories and full search; mobile keeps the existing compact header and drawer.

## Motion

Use short opacity, color, and transform transitions only. No layout animation or decorative entrance choreography. Respect `prefers-reduced-motion`.

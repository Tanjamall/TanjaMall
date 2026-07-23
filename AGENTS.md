# AGENTS.md

## Project summary

This is a cash-on-delivery ecommerce store targeting Tanger, Morocco first.

The website has three main parts:

1. Customer storefront
2. Admin dashboard
3. Supabase backend

The customer storefront lets users browse products, add products to cart, and place COD orders.

The admin dashboard lets the store owner manage products, categories, orders, settings, and WhatsApp confirmation.

Orders are confirmed manually through WhatsApp.

The first version is an MVP. Keep it simple, secure, and functional.

## Tech stack

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Supabase
* Supabase PostgreSQL
* Supabase Auth
* Supabase Row Level Security
* Cloudflare Workers via OpenNext
* Cloudflare R2 for product images
* TanStack Table
* React Hook Form
* Zod
* Zustand

Do not use:

* Prisma
* Express backend
* MongoDB
* Stripe
* Online payment
* Customer accounts
* Long-running custom Node.js server
* Medusa
* Saleor backend
* Vendure
* Shopify backend
* WooCommerce backend
* React-admin
* Refine

Do not add extra frameworks or ecommerce engines unless explicitly requested.

## Open-source usage strategy

Use open-source projects and libraries carefully.

Use them to save time, not to change the planned architecture.

### Use directly in the project

Use these as actual project dependencies or implementation tools:

* shadcn/ui for UI components
* TanStack Table for admin data tables
* React Hook Form for form state
* Zod for validation schemas
* Zustand for cart state and localStorage persistence
* Supabase official Next.js patterns for Supabase client/auth setup

### Use as inspiration only

Use Saleor Storefront mainly as UX and layout inspiration for the customer-facing storefront.

Use Saleor inspiration for:

* Clean ecommerce storefront layout
* Product grid style
* Product detail page structure
* Product image gallery ideas
* Cart UX
* Checkout UX
* Empty states
* Loading states
* Mobile ecommerce experience
* Premium/simple visual direction

Do not copy Saleor architecture.

Do not adopt:

* Saleor backend
* GraphQL backend
* Saleor checkout logic
* Saleor authentication
* Saleor payment flow
* Saleor deployment assumptions

Our backend remains Supabase.

Our checkout remains COD only.

Our hosting remains Cloudflare Workers via OpenNext.

### Important rule

When using external open-source projects for inspiration, adapt the UX ideas to this project.

Do not blindly copy backend assumptions, database models, payment flows, or deployment structure.

## Hosting

The app will be hosted on Cloudflare Workers using the OpenNext adapter.

Do not assume a traditional long-running Node.js backend.

Use Supabase as the backend for:

* Database
* Auth
* Row Level Security
* Secure SQL functions/RPC

Use Cloudflare R2 for product image files.

The app must be compatible with the Cloudflare Workers runtime through OpenNext.

Prefer frontend + Supabase architecture.

## Main business flow

The core ecommerce flow is:

Admin creates product
→ Admin publishes product
→ Product appears on storefront
→ Customer adds product to cart
→ Customer places COD order
→ Order appears in admin dashboard
→ Admin confirms order through WhatsApp
→ Admin updates order status
→ Order is delivered and marked as delivered

This flow is the priority.

Do not focus on advanced features before this flow works end to end.

## Business rules

* This is a COD store.
* Main target city is Tanger.
* Prices are in Moroccan dirham, MAD.
* No online payment in MVP.
* No customer accounts in MVP.
* Checkout must be short and mobile-friendly.
* Customers can order using:

  * full name
  * phone number
  * city
  * area
  * address
  * optional notes
* Admin confirms orders manually through WhatsApp.
* Admin manually changes order statuses.
* The store may expand later to other Moroccan cities, but Tanger is the first target.

## Customer storefront rules

The storefront must be:

* Mobile-first
* Fast
* Simple
* Trust-focused
* Easy to understand
* Optimized for COD buyers
* Visually polished
* Inspired by clean modern ecommerce UX

### Storefront visual lock

The current storefront design is approved and must be preserved.

Do not make visual changes to the customer-facing storefront unless the user explicitly asks for a specific visual change.

When rebuilding the storefront in Next.js, match the current approved static preview as closely as possible:

* layout
* spacing
* typography
* colors
* header
* category strip
* product cards
* product page structure
* cart and checkout visual rhythm
* mobile-first behavior

Saleor or other ecommerce references may only be used for implementation ideas, missing states, or interaction patterns that do not change the approved storefront look.

Use Saleor Storefront as a UX inspiration reference for the customer-facing pages.

The storefront should clearly communicate:

* Cash on delivery
* Delivery in Tanger
* WhatsApp or phone confirmation
* Simple checkout
* Clear product prices

Customer pages should not expose admin-only data.

Public storefront must never show:

* cost price
* internal notes
* supplier information
* private admin fields
* draft products
* archived products

## Storefront UX direction

Use Saleor-style ecommerce UX as inspiration, but adapt it for a simple COD store.

The storefront should feel:

* Clean
* Modern
* Premium
* Minimal
* Product-focused
* Fast
* Mobile-friendly
* Easy to buy from

Use inspiration from Saleor for:

* Product grid spacing
* Product cards
* Category browsing
* Product detail page layout
* Image gallery layout
* Cart layout
* Checkout clarity
* Empty cart state
* Loading states
* Error states
* Responsive behavior

Do not make the storefront too complex.

Avoid:

* Unnecessary animations
* Complicated account flows
* Online payment UI
* Multi-step checkout if not needed
* Overloaded product pages
* Heavy design that slows the site

The customer should quickly understand:

1. What the product is
2. How much it costs
3. That payment is cash on delivery
4. That delivery is available in Tanger
5. How to place the order

## Admin UI strategy

Do not build the admin dashboard UI from scratch.

Use an open-source Next.js + shadcn/ui admin dashboard starter or shadcn-style dashboard layout as the base for the admin area.

The admin dashboard is not customer-facing, so the goal is not a unique design. The goal is a clean, fast, functional, secure dashboard.

Keep useful starter parts:

* Admin sidebar
* Top navigation
* Login page UI
* Dashboard cards
* Data tables
* Forms
* Filters
* Dropdown menus
* Status badges
* Responsive layout
* Basic charts if useful

Remove unnecessary starter parts:

* Demo pages
* Fake data
* SaaS billing pages
* CRM pages
* Calendar pages
* Email pages
* Example users
* Placeholder analytics not connected to Supabase
* Any unrelated starter content

Customize the shadcn dashboard specifically for this COD ecommerce store.

Required admin sections:

* Dashboard
* Products
* Orders
* Categories
* Settings
* WhatsApp confirmation

All final admin pages must connect to Supabase.

Do not leave mock data in final admin pages.

## Required admin customization

### Products

Customize the starter tables and forms for product management.

Use TanStack Table for product tables if table features are needed.

Use React Hook Form and Zod for product forms and validation.

Admin must be able to:

* List products
* Search products
* Filter products by status
* Create products
* Edit products
* Publish products
* Unpublish products
* Archive products
* Upload or attach product images
* Set featured products
* Set best sellers

Product fields include:

* name
* slug
* category
* short_description
* full_description
* price
* compare_at_price
* cost_price
* stock
* main_image_url
* gallery images
* is_featured
* is_best_seller
* status
* internal_notes

### Orders

Customize the starter table/detail layout for COD order management.

Use TanStack Table for order tables if table features are needed.

Admin must be able to:

* View new orders
* Search by order number
* Search by customer name
* Search by phone number
* Filter by order status
* View order details
* Update order status
* Add internal notes
* Open WhatsApp confirmation link

Order statuses:

* NEW
* CONTACTED
* CONFIRMED
* PREPARING
* OUT_FOR_DELIVERY
* DELIVERED
* CANCELLED
* RETURNED

### Categories

Customize the starter forms/tables for category management.

Use React Hook Form and Zod for category forms and validation.

Admin must be able to:

* List categories
* Create category
* Edit category
* Hide category
* Show category
* Set sort order

Category statuses:

* ACTIVE
* HIDDEN

### Settings

Customize the starter settings page for store settings.

Use React Hook Form and Zod for settings forms and validation.

Admin must be able to edit:

* Store name
* Store phone
* WhatsApp number
* Default city
* Supported cities/areas
* Delivery fee for Tanger
* Free delivery threshold
* Homepage announcement text
* Meta/Facebook Pixel ID and enabled state
* TikTok Pixel ID and enabled state
* Google Tag Manager container ID and enabled state

### WhatsApp confirmation

Customize order rows and order detail pages to include WhatsApp confirmation.

Each order should have a WhatsApp button that opens a click-to-chat link with a pre-filled confirmation message.

The WhatsApp message should include:

* Customer name
* Order number
* Products and quantities
* Total price
* Delivery address
* Confirmation question

For MVP, do not use WhatsApp Business API.

Use normal WhatsApp click-to-chat links only.

## Product rules

Product statuses:

* DRAFT
* PUBLISHED
* ARCHIVED

Rules:

* New products should be created as DRAFT by default.
* Only PUBLISHED products appear on the public storefront.
* DRAFT products appear only in admin.
* ARCHIVED products appear only in admin.
* Public storefront must never expose cost_price.
* Public storefront must never expose internal_notes.
* Product slug must be unique.
* Product price must be greater than 0.
* Product stock cannot be negative.

## Category rules

Category statuses:

* ACTIVE
* HIDDEN

Rules:

* Only ACTIVE categories appear on the public storefront.
* HIDDEN categories appear only in admin.
* Category slug must be unique.

## Order rules

Order statuses:

* NEW
* CONTACTED
* CONFIRMED
* PREPARING
* OUT_FOR_DELIVERY
* DELIVERED
* CANCELLED
* RETURNED

Rules:

* Every order starts as NEW.
* Admin manually changes order status.
* Revenue should mainly count DELIVERED orders.
* CONFIRMED orders can be shown as expected revenue.
* NEW orders should not count as real revenue.
* CANCELLED orders should not count as revenue.
* RETURNED orders should not count as final revenue.
* Internal notes are admin-only.
* Customer notes are visible in admin.

## COD checkout rules

Checkout fields:

* Full name
* Phone number
* City
* Area
* Address
* Notes

Rules:

* No account required.
* No online payment.
* Payment method is always Cash on Delivery.
* Checkout must validate required fields.
* Phone number must be validated.
* Address must be required.
* Cart must not be empty.
* Frontend totals are only estimates.
* Final prices and totals must be calculated securely from database product prices.

Use React Hook Form and Zod for checkout validation.

Use Zustand for cart state and localStorage persistence.

## Supabase rules

Supabase is the backend.

Use Supabase for:

* Database
* Admin authentication
* Product image metadata
* Row Level Security
* Secure order creation RPC

Do not create a separate backend unless explicitly requested.

Do not use Prisma.

Do not expose the Supabase service role key to the browser.

The frontend can use:

* NEXT_PUBLIC_SUPABASE_URL
* NEXT_PUBLIC_SUPABASE_ANON_KEY
* NEXT_PUBLIC_R2_PUBLIC_BASE_URL

The frontend must never expose:

* SUPABASE_SERVICE_ROLE_KEY

## Supabase security rules

Enable Row Level Security on important tables.

Public users can:

* Read ACTIVE categories
* Read PUBLISHED products
* Read safe product data
* Read public product image URLs
* Read safe store settings
* Create COD orders through a secure flow

Public users cannot:

* Read all orders
* Read all customers
* Read cost_price
* Read internal_notes
* Update products
* Update categories
* Update orders
* Access admin pages
* Upload product images to Cloudflare R2

Admin users can:

* Manage products
* Manage categories
* Manage orders
* Manage store settings
* Upload product images to Cloudflare R2
* Update order statuses
* Add internal order notes

Use a profiles table with role = ADMIN to identify admins.

## Secure order creation

Use a Supabase RPC function for order creation.

Function name:

create_cod_order

The frontend should send:

* customer info
* product IDs
* quantities

The frontend should not send trusted product prices.

The RPC function should:

* validate customer info
* validate cart items
* fetch current product prices from the database
* reject draft or archived products
* reject invalid quantities
* calculate subtotal
* calculate delivery fee
* calculate total
* create customer
* generate order number
* create order
* create order items with product snapshot data
* generate WhatsApp confirmation URL
* return order number and total

Order items must store product snapshot data because product prices may change later.

Snapshot fields:

* product_name
* product_slug
* product_image_url
* unit_price
* quantity
* total_price

## Cloudflare R2 image storage rules

Use Cloudflare R2 for product image files.

Suggested bucket name:

* product-images

Rules:

* Public users can view product images through the R2 public/custom domain.
* Only admins can upload images.
* Only admins can delete or replace images.
* Product images can be used as main image, gallery images, detail images, variant images, and bundle images.
* Images should be converted/compressed to WebP before upload.
* Supabase stores only image metadata and public URLs.
* R2 write credentials must never be exposed to the browser.
* Prefer Cloudflare Pages/Workers functions with an R2 binding for uploads.

## WhatsApp rules

For MVP, use normal WhatsApp click-to-chat links.

Do not use WhatsApp Business API.

Each order should have a WhatsApp confirmation URL.

The WhatsApp message should include:

* Customer name
* Order number
* Product names and quantities
* Total price
* Delivery address
* Confirmation question

Example message:

Salam [Customer Name], hna [Store Name].
Tوصلنا بالطلب ديالك رقم [Order Number]:

[Product names + quantities]

المجموع: [Total] درهم
العنوان: [Address]

واش كتأكد الطلب باش نوجهوه ليك؟

## Cloudflare Workers rules

The app must be compatible with Cloudflare Workers through OpenNext.

Avoid features that require a long-running Node.js server.

Use Supabase for backend logic.

Use environment variables correctly.

Document required environment variables in README.

Required environment variables:

* NEXT_PUBLIC_SUPABASE_URL
* NEXT_PUBLIC_SUPABASE_ANON_KEY
* NEXT_PUBLIC_R2_PUBLIC_BASE_URL

Never expose the service role key in client code.
Never expose R2 write credentials in client code.

## Tracking pixels and ads tags

Tracking is configured from admin settings.

Supported MVP tracking settings:

* Meta/Facebook Pixel ID
* TikTok Pixel ID
* Google Tag Manager container ID for additional tags

Rules:

* Store only provider IDs in settings, not raw JavaScript snippets.
* Tracking scripts load only on public customer storefront pages.
* Tracking scripts must not load on `/admin` or `/admin-preview` routes.
* Pixel IDs must be validated before saving.
* Tracking must be disabled by default in seed data.
* Later conversion events must use database-confirmed order totals, not browser-trusted totals.

## Folder structure guidance

Use a clean structure similar to:

app/

* page.tsx
* products/
* category/
* cart/
* checkout/
* order-success/
* admin/

components/

* storefront/
* admin/
* ui/
* shared/

lib/

* supabase/
* cart/
* whatsapp/
* validators/
* utils/

supabase/

* migrations/
* seed.sql

docs or root:

* AGENTS.md
* BUILD_PLAN.md
* README.md

## Done means

A task is complete only when:

* The feature works end to end.
* TypeScript has no errors.
* Forms have validation.
* Public users cannot access admin-only data.
* Draft and archived products do not appear publicly.
* Admin pages require login.
* Admin role is checked.
* Supabase RLS/policies are respected.
* Public storefront does not expose cost_price.
* Public storefront does not expose internal_notes.
* UI works on mobile.
* shadcn dashboard demo data is removed from final admin pages.
* Storefront UX is clean and inspired by modern ecommerce patterns.
* Saleor is used only as UX inspiration, not as backend architecture.
* Project builds successfully.
* Any setup steps are documented.

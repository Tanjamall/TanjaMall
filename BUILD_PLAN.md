# BUILD_PLAN.md

## Goal

Build a cash-on-delivery ecommerce store for Tanger using:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Supabase
* Cloudflare Pages

The main flow is:

Admin creates product
→ Admin publishes product
→ Product appears on storefront
→ Customer places COD order
→ Order appears in admin dashboard
→ Admin confirms through WhatsApp
→ Admin updates order status
→ Order is delivered and marked delivered

This flow is the MVP priority.

## MVP features

Customer storefront:

* Homepage
* Product listing page
* Category page
* Product detail page
* Cart page
* Checkout page
* Order success page

Important storefront design rule:

* Preserve the current approved storefront design.
* Do not visually redesign customer-facing pages unless the user explicitly asks for a visual change.
* During the Next.js rebuild, match the existing static preview's layout, spacing, typography, colors, product cards, category strip, product page rhythm, cart style, and mobile behavior.
* Use Saleor inspiration only for implementation ideas, missing states, and interaction patterns that do not change the approved look.

Admin dashboard:

* Admin login
* Dashboard overview
* Product management
* Category management
* Order management
* Settings
* WhatsApp confirmation

Backend:

* Supabase database
* Supabase Auth for admin
* Supabase Storage for product images
* Supabase Row Level Security
* Secure order creation RPC

Hosting:

* Cloudflare Pages

## Supporting tools and open-source strategy

Use these tools directly in the project:

* shadcn/ui for UI components
* TanStack Table for admin data tables
* React Hook Form for forms
* Zod for validation schemas
* Zustand for cart state and localStorage persistence
* Supabase official Next.js patterns for Supabase client/auth setup

Use Saleor Storefront only as UX design inspiration for the customer-facing ecommerce experience.

Use Saleor inspiration for:

* Homepage ecommerce layout
* Product listing layout
* Product cards
* Product detail page
* Product image gallery
* Cart page UX
* Checkout page UX
* Empty states
* Loading states
* Mobile responsive ecommerce design
* Clean premium visual direction

Do not use Saleor as the backend.

Do not add:

* Saleor backend
* Saleor GraphQL API
* Saleor checkout logic
* Saleor auth
* Saleor payment flow
* Saleor deployment structure

This project backend remains Supabase.

This project checkout remains COD only.

This project hosting remains Cloudflare Pages.

## Out of scope for MVP

Do not build these in the first version:

* Online payment
* Stripe
* PayPal
* Customer accounts
* Wishlist
* Product reviews
* Coupons
* Loyalty points
* Multi-vendor system
* Advanced delivery company integration
* Complex analytics
* WhatsApp Business API
* Email marketing
* SMS automation
* Saleor backend
* Medusa backend
* Vendure backend
* Shopify backend
* WooCommerce backend

## Admin dashboard strategy

Do not build the admin dashboard UI from scratch.

Use an open-source Next.js + shadcn/ui admin dashboard starter or shadcn-style dashboard layout as the base.

The dashboard should be customized for this COD ecommerce store.

Keep from the starter:

* Sidebar layout
* Top navigation
* Login screen UI
* Dashboard cards
* Data tables
* Forms
* Filters
* Dropdowns
* Status badges
* Responsive layout
* Basic charts if useful

Remove from the starter:

* Demo pages
* Fake data
* Mock users
* Placeholder charts that are not connected to Supabase
* Billing pages
* CRM pages
* Email pages
* Calendar pages
* Any unrelated SaaS sections

Customize the admin dashboard for:

* Products
* Orders
* Categories
* Settings
* WhatsApp confirmation

All final admin pages must connect to Supabase.

No mock data should remain in final admin pages.

---

# Task 1 — Project setup

Set up the project.

Requirements:

* Next.js
* TypeScript
* Tailwind CSS
* Supabase client
* Cloudflare Pages compatibility
* shadcn/ui setup
* Basic admin dashboard layout or starter integration
* Basic folder structure

Install and prepare these supporting tools:

* TanStack Table
* React Hook Form
* Zod
* Zustand
* Supabase client libraries

Create routes.

Customer routes:

* /
* /products
* /products/[slug]
* /category/[slug]
* /cart
* /checkout
* /order-success

Admin routes:

* /admin/login
* /admin/dashboard
* /admin/products
* /admin/products/new
* /admin/products/[id]/edit
* /admin/categories
* /admin/orders
* /admin/orders/[id]
* /admin/settings

Create folders:

* components/storefront
* components/admin
* components/ui
* components/shared
* lib/supabase
* lib/cart
* lib/whatsapp
* lib/validators
* lib/utils
* supabase/migrations

Admin UI requirement:

Use a shadcn-style dashboard layout for the admin area.

At this stage, placeholder admin pages are acceptable, but the layout should already include:

* sidebar
* top navigation
* responsive admin shell
* placeholder dashboard cards
* placeholder tables

Storefront UX requirement:

Customer-facing pages should preserve the approved static preview design.

Saleor-style UX inspiration may be used only where the current approved design does not define a state or behavior.

Do not copy Saleor backend logic.

Do not add GraphQL just because Saleor uses it.

Done when:

* Project runs locally.
* Placeholder customer pages exist.
* Placeholder admin pages exist.
* Supabase client reads environment variables.
* shadcn/ui is set up.
* Admin dashboard layout exists.
* Supporting tools are installed or documented.
* No TypeScript errors.
* README explains how to run the project.

---

# Task 2 — Supabase database schema

Create SQL migrations for the Supabase database.

Use SQL files in:

supabase/migrations

Create these tables:

* profiles
* categories
* products
* product_images
* customers
* orders
* order_items
* store_settings

Also create:

* updated_at trigger
* public_products view
* seed data

## profiles

Fields:

* id uuid primary key references auth.users(id)
* full_name text
* role text default 'ADMIN'
* created_at timestamptz default now()
* updated_at timestamptz default now()

Rules:

* role can be ADMIN or STAFF later.
* MVP only needs ADMIN.

## categories

Fields:

* id uuid primary key
* name text not null
* slug text unique not null
* description text
* image_url text
* status text default 'ACTIVE'
* sort_order integer default 0
* created_at timestamptz default now()
* updated_at timestamptz default now()

Category statuses:

* ACTIVE
* HIDDEN

## products

Fields:

* id uuid primary key
* category_id uuid references categories(id)
* name text not null
* slug text unique not null
* short_description text
* full_description text
* price numeric(10,2) not null
* compare_at_price numeric(10,2)
* cost_price numeric(10,2)
* sku text
* stock integer default 0
* status text default 'DRAFT'
* main_image_url text
* is_featured boolean default false
* is_best_seller boolean default false
* internal_notes text
* created_at timestamptz default now()
* updated_at timestamptz default now()

Product statuses:

* DRAFT
* PUBLISHED
* ARCHIVED

Rules:

* price must be greater than 0.
* stock cannot be negative.
* slug must be unique.

## product_images

Fields:

* id uuid primary key
* product_id uuid references products(id) on delete cascade
* image_url text not null
* alt_text text
* sort_order integer default 0
* created_at timestamptz default now()

## customers

Fields:

* id uuid primary key
* full_name text not null
* phone text not null
* city text default 'Tanger'
* area text
* address text not null
* created_at timestamptz default now()
* updated_at timestamptz default now()

## orders

Fields:

* id uuid primary key
* order_number text unique not null
* customer_id uuid references customers(id)
* customer_name text not null
* customer_phone text not null
* city text default 'Tanger'
* area text
* address text not null
* notes_from_customer text
* internal_notes text
* status text default 'NEW'
* subtotal numeric(10,2) not null
* delivery_fee numeric(10,2) default 0
* total numeric(10,2) not null
* whatsapp_confirmation_url text
* contacted_at timestamptz
* confirmed_at timestamptz
* delivered_at timestamptz
* cancelled_at timestamptz
* created_at timestamptz default now()
* updated_at timestamptz default now()

Order statuses:

* NEW
* CONTACTED
* CONFIRMED
* PREPARING
* OUT_FOR_DELIVERY
* DELIVERED
* CANCELLED
* RETURNED

## order_items

Fields:

* id uuid primary key
* order_id uuid references orders(id) on delete cascade
* product_id uuid references products(id)
* product_name text not null
* product_slug text not null
* product_image_url text
* quantity integer not null
* unit_price numeric(10,2) not null
* total_price numeric(10,2) not null
* created_at timestamptz default now()

Important:

Order items must store product snapshot data because product prices may change later.

## store_settings

Fields:

* id uuid primary key
* store_name text not null
* store_phone text
* whatsapp_number text
* default_city text default 'Tanger'
* supported_cities text[]
* delivery_fee_tanger numeric(10,2) default 0
* free_delivery_threshold numeric(10,2)
* announcement_text text
* created_at timestamptz default now()
* updated_at timestamptz default now()

## public_products view

Create a public_products view that excludes admin-only fields.

The view should not expose:

* cost_price
* internal_notes

The view should include only published products.

Done when:

* Migrations are valid.
* Tables are created.
* public_products view exists.
* updated_at trigger exists.
* Seed data works.
* Sample categories exist.
* Sample products exist.
* Store settings row exists.

---

# Task 3 — Supabase security and RLS

Enable RLS on:

* profiles
* categories
* products
* product_images
* customers
* orders
* order_items
* store_settings

Create admin helper function:

* is_admin()

Rules for public users:

Public users can:

* read ACTIVE categories
* read PUBLISHED products through safe public view
* read images for published products
* read safe store settings
* create COD orders through secure flow

Public users cannot:

* read all orders
* read all customers
* read cost_price
* read internal_notes
* update products
* update categories
* update orders
* access admin data
* upload product images

Rules for admins:

Admins can:

* manage products
* manage categories
* manage orders
* manage settings
* upload product images
* update order status
* add internal order notes

Admin identity:

* use profiles.role = 'ADMIN'

Important:

Never expose the Supabase service role key to the browser.

Done when:

* RLS is enabled.
* Public data is safe.
* Admin data is protected.
* Public users cannot access private fields.
* Admin users can manage required data.

---

# Task 4 — Secure COD order creation

Create a Supabase RPC function:

create_cod_order

Input:

* full_name
* phone
* city
* area
* address
* notes
* items jsonb

Each item contains:

* product_id
* quantity

The function must:

* validate full name
* validate phone number
* validate address
* reject empty cart
* fetch product prices from database
* reject draft or archived products
* reject invalid quantity
* reject unavailable products
* calculate subtotal from database prices
* calculate delivery fee from store settings
* calculate total
* create customer
* generate unique order number
* create order
* create order items with product snapshot data
* generate WhatsApp confirmation URL
* return order_number and total

Important:

The frontend must not send trusted prices.

The database must calculate final prices.

Order item snapshot fields:

* product_name
* product_slug
* product_image_url
* unit_price
* quantity
* total_price

Done when:

* Order creation works.
* Final total is calculated securely.
* Invalid products are rejected.
* Invalid quantities are rejected.
* Order appears in database.
* Order items contain product snapshots.
* WhatsApp confirmation URL is generated.

---

# Task 5 — Storefront product pages

Build customer storefront product browsing.

Pages:

* /
* /products
* /category/[slug]
* /products/[slug]

Homepage sections:

* Header
* Hero
* Featured products
* Categories
* Best sellers
* COD trust section
* Footer

Product card shows:

* image
* name
* price in MAD
* compare_at_price if available
* view product button
* add to cart button

Product detail page shows:

* image gallery
* name
* price
* compare-at price
* short description
* full description
* stock status
* quantity selector
* add to cart
* buy now
* COD trust message
* delivery in Tanger message
* related products if available

UX direction:

Use Saleor Storefront as customer-facing UX inspiration.

Focus on:

* Clean ecommerce layout
* Good product spacing
* Premium product cards
* Clear product page hierarchy
* Simple cart layout
* Simple checkout layout
* Good mobile experience
* Strong empty/loading/error states

Rules:

* Use published products only.
* Use active categories only.
* Use public_products view or safe public select.
* Do not show admin-only fields.
* Do not show cost_price.
* Do not show internal_notes.
* Mobile-first design.
* Do not add Saleor backend logic.
* Do not add GraphQL because of Saleor.

Done when:

* Published products appear.
* Draft products stay hidden.
* Archived products stay hidden.
* Product page works by slug.
* Product fields display correctly.
* Customer pages work on mobile.
* Storefront feels clean and modern, inspired by Saleor-style ecommerce UX.

---

# Task 6 — Admin authentication

Set up Supabase Auth for admin login.

Build:

* /admin/login
* protected admin layout

Rules:

* Only authenticated admins can access admin pages.
* Admin role comes from profiles.role = 'ADMIN'.
* Logged-out users redirect to /admin/login.
* Non-admin users are blocked.
* Admin session should persist.

Done when:

* Admin can log in.
* Admin pages are protected.
* Non-admin users cannot access dashboard.
* Logged-out users are redirected to login.
* Admin role check works.

---

# Task 7 — Admin dashboard UI customization

Use the shadcn dashboard starter/layout as the base for the admin UI.

Customize the sidebar navigation to include only:

* Dashboard
* Products
* Categories
* Orders
* Settings

Remove unrelated demo navigation items.

Create reusable admin components:

* AdminPageHeader
* AdminStatCard
* AdminDataTable
* StatusBadge
* AdminFormSection
* ConfirmActionDialog
* WhatsAppButton

Use TanStack Table for admin tables where useful.

Use React Hook Form and Zod for admin forms.

Dashboard page:

* Use shadcn cards for key metrics.
* Use tables/lists for recent orders.
* Use status badges for order status.
* Keep layout mobile-friendly.

Admin visual style:

* Clean
* Practical
* Minimal
* Mobile-friendly
* Easy to scan
* No unnecessary decoration

Done when:

* Admin layout looks clean.
* Sidebar has only ecommerce sections.
* Demo pages are removed.
* Fake data is clearly marked temporary or removed.
* Reusable admin components exist.
* No unrelated starter content remains in navigation.
* No TypeScript errors.

---

# Task 8 — Admin product and category management

Build admin product and category management using the customized shadcn dashboard UI.

## Products

Pages:

* /admin/products
* /admin/products/new
* /admin/products/[id]/edit

Use shadcn components for:

* Data table
* Search input
* Status filter
* Product form
* Buttons
* Dropdown actions
* Dialog confirmations
* Status badges
* Tabs or sections if useful

Use TanStack Table for product table behavior.

Use React Hook Form and Zod for the product form.

Product table columns:

* Image
* Name
* Category
* Price
* Stock
* Status
* Featured
* Best seller
* Created date
* Actions

Product form fields:

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

Product actions:

* Create draft product
* Edit product
* Publish product
* Unpublish product
* Archive product

Rules:

* New products should be DRAFT by default.
* Published products appear on storefront.
* Draft products stay hidden.
* Archived products stay hidden.
* Public storefront must never expose cost_price.
* Public storefront must never expose internal_notes.

## Categories

Page:

* /admin/categories

Use shadcn components for:

* Category table
* Category form
* Status badge
* Sort order field
* Action dropdown
* Confirm action dialog

Use TanStack Table for category table behavior if useful.

Use React Hook Form and Zod for the category form.

Category fields:

* name
* slug
* description
* image_url
* status
* sort_order

Category actions:

* Create category
* Edit category
* Hide category
* Show category

Done when:

* Admin can manage products using shadcn dashboard UI.
* Admin can manage categories using shadcn dashboard UI.
* Products connect to Supabase.
* Categories connect to Supabase.
* Published products appear correctly on the storefront.
* Draft products stay hidden publicly.
* Archived products stay hidden publicly.
* No mock product/category data remains.

---

# Task 9 — Product image storage

Set up Supabase Storage bucket:

* product-images

Rules:

* Public users can view product images.
* Only admins can upload product images.
* Only admins can delete or replace product images.
* Admin can set main product image.
* Admin can add gallery images.
* Uploaded image URLs can be saved to products and product_images.

Admin image features:

* Upload main image
* Upload gallery images
* Preview images in product form
* Remove gallery image
* Reorder gallery images if simple to implement

Storefront image UX:

Use Saleor-style product image/gallery UX as inspiration.

The product page should have:

* Clear main image
* Simple gallery thumbnails
* Mobile-friendly image browsing
* Good fallback when image is missing

Done when:

* Admin can upload product image.
* Image URL saves to product.
* Product image appears on storefront.
* Non-admin users cannot upload.
* Storage policies are safe.

---

# Task 10 — Cart

Build cart using Zustand and localStorage.

Features:

* Add to cart
* Buy now
* Update quantity
* Remove item
* Cart count in header
* Cart subtotal
* Proceed to checkout
* Clear cart after successful order

Cart item fields:

* product id
* name
* slug
* image
* price
* quantity

UX direction:

Use Saleor-style cart UX inspiration.

Cart should be:

* Simple
* Clean
* Mobile-friendly
* Easy to edit
* Clear about totals
* Clear that payment is cash on delivery

Rules:

* Frontend subtotal is only an estimate.
* Final total comes from create_cod_order RPC.
* Cart should persist after page refresh.
* Cart should work on mobile.
* Do not allow quantity below 1.

Done when:

* Cart works.
* Cart persists after refresh.
* Quantity can be updated.
* Items can be removed.
* Checkout receives cart items.
* Cart clears after successful order.

---

# Task 11 — COD checkout

Build checkout page.

Use React Hook Form and Zod for validation.

Fields:

* full name
* phone number
* city
* area
* address
* notes

Payment method:

* Cash on delivery only

On submit:

* call create_cod_order RPC
* send product IDs and quantities only
* do not send trusted product prices
* redirect to order success page
* clear cart after successful order

Validation:

* full name required
* phone required
* phone format should be valid for Morocco when possible
* city required
* address required
* cart must not be empty

Checkout page should show:

* cart summary
* estimated subtotal
* delivery fee if available
* estimated total
* COD payment notice
* WhatsApp/phone confirmation notice

UX direction:

Use Saleor-style checkout UX inspiration, but simplify for COD.

The checkout should be:

* Short
* Clear
* Mobile-first
* Low-friction
* Easy for Tanger COD customers
* No account requirement
* No payment card section

Important:

The displayed total is an estimate.

The final total must be calculated by the create_cod_order RPC function.

Done when:

* Customer can place order.
* Order is saved.
* Order items are saved.
* Order success page shows order number.
* Cart clears after successful order.
* Admin can see the order.

---

# Task 12 — Admin order management and WhatsApp confirmation

Build admin order management using the customized shadcn dashboard UI.

Pages:

* /admin/orders
* /admin/orders/[id]

Use shadcn components for:

* Orders data table
* Search input
* Status filter
* Status badges
* Order detail cards
* Dropdown actions
* Internal notes form
* WhatsApp confirmation button

Use TanStack Table for order table behavior.

Use React Hook Form and Zod for internal notes/status forms if useful.

Order list columns:

* Order number
* Customer name
* Phone
* City/area
* Total
* Status
* Created date
* WhatsApp button
* Actions

Order detail page shows:

* Order number
* Current status
* Customer name
* Customer phone
* City
* Area
* Address
* Customer notes
* Internal notes
* Ordered products
* Subtotal
* Delivery fee
* Total
* WhatsApp confirmation button
* Status update controls

Order actions:

* Mark as CONTACTED
* Mark as CONFIRMED
* Mark as PREPARING
* Mark as OUT_FOR_DELIVERY
* Mark as DELIVERED
* Mark as CANCELLED
* Mark as RETURNED
* Save internal notes
* Open WhatsApp confirmation link

WhatsApp confirmation requirement:

Each order row and order detail page must have a WhatsApp button.

The button should open a click-to-chat URL with a pre-filled message.

Message should include:

* Customer name
* Order number
* Products and quantities
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

For MVP, do not use WhatsApp Business API.

Use normal WhatsApp click-to-chat links only.

Done when:

* New orders appear in admin.
* Admin can search orders.
* Admin can filter orders.
* Admin can open order details.
* Admin can update order status.
* Admin can add internal notes.
* WhatsApp confirmation button works.
* Orders connect to Supabase.
* No mock order data remains.

---

# Task 13 — Dashboard and settings

Build the admin dashboard overview and settings page using the customized shadcn dashboard UI.

## Dashboard

Page:

* /admin/dashboard

Use shadcn cards for:

* New orders today
* Pending confirmation orders
* Confirmed orders
* Delivered orders
* Cancelled orders
* Delivered revenue
* Low stock products

Use shadcn tables/lists for:

* Recent orders
* Low stock products

Revenue rule:

* DELIVERED orders count as real revenue.
* CONFIRMED orders can be shown as expected revenue if needed.
* NEW orders should not count as real revenue.
* CANCELLED orders should not count as real revenue.
* RETURNED orders should not count as final revenue.

## Settings

Page:

* /admin/settings

Use shadcn form components for:

* Store name
* Store phone
* WhatsApp number
* Default city
* Supported cities/areas
* Delivery fee for Tanger
* Free delivery threshold
* Homepage announcement text

Use React Hook Form and Zod for settings form validation.

Settings should connect to the Supabase store_settings table.

Storefront should use settings where relevant.

The WhatsApp number used for confirmation should come from settings.

The delivery fee used in checkout should come from settings.

Done when:

* Dashboard shows useful real Supabase data.
* Settings can be updated.
* WhatsApp number comes from settings.
* Delivery fee comes from settings.
* No mock dashboard/settings data remains.

---

# Task 14 — Storefront polish

Improve the customer-facing UI.

Use Saleor Storefront mainly as UX design inspiration.

Focus on:

* Mobile layout
* Homepage layout
* Product cards
* Product listing page
* Product detail layout
* Product image gallery
* Cart usability
* Checkout clarity
* Trust messages
* Loading states
* Empty states
* Error states

Trust messages should mention:

* Cash on delivery
* Delivery in Tanger
* Confirmation by WhatsApp or phone
* Simple checkout

Storefront visual direction:

* Clean
* Minimal
* Premium
* Product-focused
* Easy to scan
* Fast on mobile

Do not overbuild animations.

Do not copy Saleor backend, checkout, GraphQL, auth, or payment logic.

Keep pages fast and clear.

Done when:

* Customer pages look clean on mobile.
* Product pages are easy to understand.
* Product listing feels modern.
* Cart feels easy to use.
* Checkout is short and clear.
* Empty cart state exists.
* Product loading states exist.
* Checkout error states exist.
* Storefront UX is inspired by Saleor-style ecommerce design.

---

# Task 15 — Final testing and deployment preparation

Prepare the app for Cloudflare Pages deployment.

Check:

* Project builds successfully.
* Environment variables are documented.
* Supabase URL is configured.
* Supabase anon key is configured.
* Service role key is not exposed.
* Admin login works.
* Product creation works.
* Product publishing works.
* Published products appear on storefront.
* Draft products stay hidden.
* Archived products stay hidden.
* Cart works.
* Checkout works.
* Order appears in admin.
* Order status updates work.
* WhatsApp confirmation link works.
* Settings page works.
* Mobile layout works.
* Storefront UX is clean and modern.
* Saleor was used only as UX inspiration.
* No unwanted backend framework was added.

README should include:

* Project overview
* Tech stack
* How to run locally
* Required environment variables
* Supabase setup notes
* Cloudflare Pages deployment notes
* Basic testing checklist
* Note that Saleor is used only for UX inspiration, not backend architecture

Done when:

* README is complete.
* Build passes.
* Main ecommerce flow works end to end.
* App is ready for Cloudflare Pages.

---

# How to use this plan with Codex

Give Codex one task at a time.

Start with:

Read AGENTS.md and BUILD_PLAN.md.

Start with Task 1 only.

Do not continue to Task 2 yet.

After finishing Task 1, summarize:

* what you created
* what files changed
* what commands I need to run
* any issues or assumptions

Then continue task by task.

Do not ask Codex to build the whole project in one prompt.

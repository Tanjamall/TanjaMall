import type { ReactNode } from "react";
type Product = {
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  image: string;
  status?: string;
};
const products: Product[] = [{
  name: "حامل الأكواب ومستلزمات السيارة 4 في 1",
  price: "94 د.م",
  oldPrice: "199 د.م",
  discount: "53%",
  image: "https://aga-shoppex.com/media/6960/conversions/A730p6nzLcj0SvR3Z9vTWHwpyFCRgQUa6iG8Q3B5-media-compressed.webp",
  status: "متوفر"
}, {
  name: "بروجيكتور 120 واط يعمل بالطاقة الشمسية",
  price: "249 د.م",
  oldPrice: "449 د.م",
  discount: "45%",
  image: "https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp",
  status: "متوفر"
}, {
  name: "مصباح الطاقة الشمسية للمساحات الخارجية",
  price: "549 د.م",
  oldPrice: "1399 د.م",
  discount: "61%",
  image: "https://aga-shoppex.com/media/8893/conversions/FQinn06FpPpjl7h9ARxmzp7oll8tyB2sd5oFdjSw-media-compressed.webp",
  status: "متوفر"
}, {
  name: "جهاز الطوارئ لتشغيل السيارة ونفخ العجلات",
  price: "799 د.م",
  oldPrice: "999 د.م",
  discount: "20%",
  image: "https://aga-shoppex.com/media/7280/conversions/X06D6pO77MLwZK1tdKiIXXmQicJVNDXeqzSjXce2-media-compressed.webp",
  status: "نفدت الكمية"
}];
const categories = [["الألكترونيات", "#dbe4dd"], ["المنزل", "#fff3df"], ["السيارة", "#e9f6ef"], ["الجمال", "#fff1d5"], ["أطفال", "#eef3ef"], ["أضواء", "#ffedc2"]];
const offers = [["مصباح واحد", "249 د.م", "449 د.م", "45%"], ["2 مصابيح", "399 د.م", "898 د.م", "56%"], ["3 مصابيح", "649 د.م", "1347 د.م", "52%"]];
function MenuIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>;
}
function SearchIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="m20 20-4.5-4.5m2-5A7 7 0 1 1 3.5 10.5a7 7 0 0 1 14 0Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>;
}
function CartIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M5 6h15l-1.6 8.2a2 2 0 0 1-2 1.6H8.2a2 2 0 0 1-2-1.6L4.8 3.8H3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 20h.01M17 20h.01" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>;
}
function HeartIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M12 20s-7-4.4-8.8-9A4.6 4.6 0 0 1 11 6.3l1 1 1-1A4.6 4.6 0 0 1 20.8 11C19 15.6 12 20 12 20Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>;
}
function PhoneFrame({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return <section className="phone-shell" aria-label={title}>
      <div className="phone-top">
        <span>{title}</span>
        <span className="phone-dot" />
      </div>
      <div className="phone-screen" dir="rtl">{children}</div>
    </section>;
}
function Header({
  cart = 0
}: {
  cart?: number;
}) {
  return <header className="tm-header">
      <div className="tm-service">خدمة العملاء داخل طنجة: 06 72 97 50 00</div>
      <div className="tm-nav">
        <button className="icon-btn" aria-label="فتح القائمة"><MenuIcon /></button>
        <div className="brand-mark">
          <span>Tanja</span><b>Mall</b>
        </div>
        <button className="icon-btn cart-btn" aria-label={`السلة تحتوي على ${cart} منتجات`}>
          <CartIcon />
          {cart > 0 && <span>{cart}</span>}
        </button>
      </div>
    </header>;
}
function ProductCard({
  product
}: {
  product: Product;
}) {
  return <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt="" />
        <span className="discount-badge">{product.discount} خصم</span>
        <button className="heart-btn" aria-label="إضافة للمفضلة"><HeartIcon /></button>
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className={product.status === "نفدت الكمية" ? "stock out" : "stock"}>{product.status}</p>
        <div className="price-row">
          <span>{product.price}</span>
          <del>{product.oldPrice}</del>
        </div>
        <button className="buy-btn">إشتري الآن</button>
      </div>
    </article>;
}
function StorefrontScreen() {
  return <>
      <Header cart={1} />
      <main className="screen-scroll">
        <div className="search-pill">
          <span>ابحث في المتجر</span>
          <SearchIcon />
        </div>
        <section className="hero-band">
          <div>
            <p>الدفع عند الاستلام</p>
            <h1>عروض طنجة اليومية</h1>
            <span>منتجات عملية بتوصيل سريع داخل المدينة</span>
          </div>
          <img src={products[1].image} alt="" />
        </section>
        <div className="trust-row">
          <span>دفع عند الاستلام</span>
          <span>استبدال مضمون</span>
          <span>دعم واتساب</span>
        </div>
        <section>
          <div className="section-title">
            <h2>التصنيفات</h2>
            <a>مشاهدة الكل</a>
          </div>
          <div className="category-grid">
            {categories.map(([label, color]) => <button key={label} style={{
            background: color
          }}>{label}</button>)}
          </div>
        </section>
        <section>
          <div className="section-title">
            <h2>أقوى العروض</h2>
            <a>مشاهدة الكل</a>
          </div>
          <div className="compact-grid">
            {products.slice(0, 4).map(product => <ProductCard key={product.name} product={product} />)}
          </div>
        </section>
      </main>
    </>;
}
function ListingScreen() {
  return <>
      <Header cart={1} />
      <main className="screen-scroll">
        <div className="listing-head">
          <div>
            <p>التصنيف</p>
            <h1>أضواء ومصابيح</h1>
          </div>
          <span>42 منتج</span>
        </div>
        <div className="filter-bar">
          <button>فلترة</button>
          <button>الأكثر مبيعا</button>
          <button>خصومات</button>
        </div>
        <div className="active-filter">السعر أقل من 800 د.م</div>
        <div className="compact-grid">
          {[products[1], products[2], products[3], products[0], products[1], products[2]].map((product, index) => <ProductCard key={`${product.name}-${index}`} product={product} />)}
        </div>
      </main>
      <nav className="bottom-tabs">
        <span>الرئيسية</span>
        <span className="active">الأقسام</span>
        <span>السلة</span>
      </nav>
    </>;
}
function ProductScreen() {
  return <>
      <Header cart={1} />
      <main className="screen-scroll product-detail">
        <div className="image-gallery">
          <img src={products[1].image} alt="" />
          <span>1 / 4</span>
        </div>
        <div className="product-info">
          <p className="rating">467 تقييمات موثقة</p>
          <h1>بروجيكتور 120 واط يعمل بالطاقة الشمسية</h1>
          <div className="detail-price">
            <strong>249.00 د.م</strong>
            <del>449.00 د.م</del>
          </div>
          <p className="order-note">يرجى تسجيل معلوماتكم وسنتصل بكم لتأكيد الطلب في أقرب وقت.</p>
        </div>
        <section className="offer-box">
          <h2>إختر العرض المناسب لك</h2>
          {offers.map(([label, price, oldPrice, discount], index) => <button className={index === 0 ? "offer active" : "offer"} key={label}>
              <span>{label}</span>
              <b>{price}</b>
              <del>{oldPrice}</del>
              <em>تخفيض {discount}</em>
            </button>)}
        </section>
        <section className="accordion-list">
          <button>الوصف والمميزات</button>
          <button>التوصيل والاستبدال</button>
          <button>آراء العملاء</button>
        </section>
      </main>
      <div className="sticky-action">
        <span>249 د.م</span>
        <button>اطلب الآن</button>
      </div>
    </>;
}
function CartScreen() {
  return <>
      <Header cart={2} />
      <main className="screen-scroll">
        <div className="listing-head">
          <div>
            <p>مراجعة الطلب</p>
            <h1>السلة</h1>
          </div>
          <span>2 منتجات</span>
        </div>
        {[products[0], products[1]].map((product, index) => <article className="cart-line" key={product.name}>
            <img src={product.image} alt="" />
            <div>
              <h2>{product.name}</h2>
              <p>العرض: {index === 0 ? "قطعة واحدة" : "مصباح واحد"}</p>
              <div className="quantity-row">
                <button aria-label="تقليل الكمية">-</button>
                <span>1</span>
                <button aria-label="زيادة الكمية">+</button>
                <b>{product.price}</b>
              </div>
            </div>
          </article>)}
        <div className="promo-box">
          <span>كود التخفيض</span>
          <button>تطبيق</button>
        </div>
        <section className="summary-box">
          <div><span>المجموع</span><b>343 د.م</b></div>
          <div><span>التوصيل داخل طنجة</span><b>مجاني</b></div>
          <div className="total"><span>الإجمالي</span><b>343 د.م</b></div>
          <p>دفع آمن عند الاستلام مع تأكيد هاتفي قبل الإرسال.</p>
        </section>
      </main>
      <div className="sticky-action">
        <span>343 د.م</span>
        <button>إتمام الطلب</button>
      </div>
    </>;
}
function CheckoutScreen() {
  return <>
      <Header cart={2} />
      <main className="screen-scroll checkout-screen">
        <div className="checkout-summary">
          <span>إظهار ملخص الطلب</span>
          <b>343 د.م</b>
        </div>
        <section className="form-section">
          <p>الخطوة 1 من 3</p>
          <h1>معلومات التوصيل</h1>
          {["الإسم الكامل", "رقم الهاتف", "المدينة", "العنوان"].map(field => <label key={field}>
              <span>{field}</span>
              <input aria-label={field} />
            </label>)}
        </section>
        <section className="delivery-card">
          <h2>طريقة الدفع</h2>
          <button className="selected-method">
            <span>الدفع عند الاستلام</span>
            <b>مفعلة</b>
          </button>
          <button>
            <span>الدفع ببطاقة بنكية</span>
            <b>قريبا</b>
          </button>
        </section>
        <section className="review-card">
          <h2>مراجعة نهائية</h2>
          <div><span>المنتجات</span><b>343 د.م</b></div>
          <div><span>التوصيل</span><b>0 د.م</b></div>
          <div className="total"><span>الإجمالي</span><b>343 د.م</b></div>
        </section>
      </main>
      <div className="sticky-action">
        <span>المجموع 343 د.م</span>
        <button>تأكيد الطلب</button>
      </div>
    </>;
}
function DesktopStrip() {
  return <section className="desktop-strip" dir="rtl">
      <div className="desktop-header">
        <div className="brand-mark"><span>Tanja</span><b>Mall</b></div>
        <div className="desktop-search">ابحث في المتجر</div>
        <button>السلة 2</button>
      </div>
      <div className="desktop-body">
        <aside>
          <h3>التصنيفات</h3>
          {categories.slice(0, 5).map(([category]) => <span key={category}>{category}</span>)}
        </aside>
        <div className="desktop-products">
          <div className="desktop-hero">
            <h2>نسخة سطح المكتب</h2>
            <p>نفس لغة Shoppex: شبكة منتجات، عروض واضحة، بحث، وقائمة جانبية، لكن بألوان TanjaMall.</p>
          </div>
          <div className="desktop-grid">
            {products.slice(0, 3).map(product => <ProductCard key={product.name} product={product} />)}
          </div>
        </div>
      </div>
    </section>;
}
export const TanjaMallMobileStorefrontSystem = () => {
  return <div className="tm-board">
      <div className="board-header" dir="rtl">
        <div>
          <p>MagicPath component</p>
          <h1>TanjaMall mobile storefront redesign system</h1>
          <span>Storefront, category listing, product/COD order, cart, checkout, and desktop reference.</span>
        </div>
        <div className="palette">
          {["#131921", "#ff9900", "#b45309", "#17201b", "#f6f5ef"].map(color => <i key={color} style={{
          background: color
        }} />)}
        </div>
      </div>
      <div className="phone-grid">
        <PhoneFrame title="Storefront"><StorefrontScreen /></PhoneFrame>
        <PhoneFrame title="Category"><ListingScreen /></PhoneFrame>
        <PhoneFrame title="Product"><ProductScreen /></PhoneFrame>
        <PhoneFrame title="Cart"><CartScreen /></PhoneFrame>
        <PhoneFrame title="Checkout"><CheckoutScreen /></PhoneFrame>
      </div>
      <DesktopStrip />
    </div>;
};
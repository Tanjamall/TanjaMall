import { useMemo, useState } from "react";
const categoryTiles = [{
  name: "الألكترونيات",
  color: "#dbe4dd",
  image: "https://aga-shoppex.com/media/4016/ZasKuH89WjT9ohQVp3NJs0OSbV4ozi37vlgFeGHY.jpg"
}, {
  name: "المنزل والحديقة",
  color: "#fff3df",
  image: "https://aga-shoppex.com/media/4017/BBR9wMDYI64w468120ObCyGleBrKsjOEDybE1fMd.jpg"
}, {
  name: "الألعاب",
  color: "#eef3ef",
  image: "https://aga-shoppex.com/media/4018/4FM3NAfJKsTWBNRARv6oQUwe1BTUON7BTLT4DIVQ.jpg"
}, {
  name: "الجمال",
  color: "#fff1d5",
  image: "https://aga-shoppex.com/media/4019/ygzBtaYul8Tobu5XYMFXbeAli32X1dVahWpCBaFE.jpg"
}, {
  name: "اكسسوارات السيارات",
  color: "#f7f5ef",
  image: "https://aga-shoppex.com/media/4020/fHTPE3N9LkrQPyKb9LS8WkLHRaKEPHxiqWCNDYQl.jpg"
}, {
  name: "أضواء ومصابيح",
  color: "#ffe8b5",
  image: "https://aga-shoppex.com/media/4023/zBr198URd14RTcJM8K1w9URSvpRVXjD1cnvv6wVu.jpg"
}];
const products = [{
  id: 1,
  title: "حامل الأكواب ومستلزمات السيارة 4 في 1",
  price: "94.00 د.م",
  old: "199.00 د.م",
  discount: "53%",
  stock: "متوفر في المخزون",
  image: "https://aga-shoppex.com/media/6960/conversions/A730p6nzLcj0SvR3Z9vTWHwpyFCRgQUa6iG8Q3B5-media-compressed.webp"
}, {
  id: 2,
  title: "بروجيكتور 120 واط يعمل بالطاقة الشمسية",
  price: "249.00 د.م",
  old: "449.00 د.م",
  discount: "45%",
  stock: "متوفر في المخزون",
  image: "https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp"
}, {
  id: 3,
  title: "مصباح الطاقة الشمسية لجميع المساحات الخارجية 500 واط",
  price: "549.00 د.م",
  old: "1399.00 د.م",
  discount: "61%",
  stock: "إنتهى من المخزون",
  image: "https://aga-shoppex.com/media/8893/conversions/FQinn06FpPpjl7h9ARxmzp7oll8tyB2sd5oFdjSw-media-compressed.webp"
}, {
  id: 4,
  title: "جهاز الطوارئ لتشغيل السيارة ونفخ العجلات وشحن الهاتف",
  price: "799.00 د.م",
  old: "999.00 د.م",
  discount: "20%",
  stock: "متوفر في المخزون",
  image: "https://aga-shoppex.com/media/7280/conversions/X06D6pO77MLwZK1tdKiIXXmQicJVNDXeqzSjXce2-media-compressed.webp"
}, {
  id: 5,
  title: "مروحة لاسلكية قابلة لاعادة الشحن للاستعمال الخارجي",
  price: "349.00 د.م",
  old: "499.00 د.م",
  discount: "30%",
  stock: "متوفر في المخزون",
  image: "https://aga-shoppex.com/media/7312/conversions/O2xQolEzM9fNFiHnFL8d5TEU1dZnoRDTnqN0EGKk-media-compressed.webp"
}, {
  id: 6,
  title: "قفل ميكانيكي برمز سري للأبواب والخزانات",
  price: "189.00 د.م",
  old: "299.00 د.م",
  discount: "37%",
  stock: "متوفر في المخزون",
  image: "https://aga-shoppex.com/media/7039/conversions/SKwTLtYVn8tHvfhSRAspBCjNeH1PvkgaJ5AMb07P-media-compressed.webp"
}];
const slides = [{
  title: "أقوى عروض طنجة",
  subtitle: "دفع عند الاستلام وتأكيد هاتفي",
  image: products[0].image
}, {
  title: "عروض مصابيح الطاقة الشمسية",
  subtitle: "خصومات يومية على منتجات Shoppex",
  image: products[1].image
}, {
  title: "كل ما تحتاجه لمنزلك",
  subtitle: "منتجات عملية بجودة عالية",
  image: products[4].image
}];
function Icon({
  name
}: {
  name: "menu" | "search" | "heart" | "x" | "phone" | "cart";
}) {
  const paths = {
    menu: "M4 7h16M4 12h16M4 17h16",
    search: "m20 20-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
    heart: "M12 20s-7-4.4-8.8-9A4.6 4.6 0 0 1 11 6.3l1 1 1-1A4.6 4.6 0 0 1 20.8 11C19 15.6 12 20 12 20Z",
    x: "M6 6l12 12M18 6 6 18",
    phone: "M7 4h4l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v4c0 1-1 2-2 2C10 21 3 14 3 6c0-1 1-2 2-2h2Z",
    cart: "M5 6h15l-2 9H8L6 3H3m6 17h.01M17 20h.01"
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
}
function Header({
  favorites,
  onMenu
}: {
  favorites: number;
  onMenu: () => void;
}) {
  return <header className="spx-header">
      <div className="service-bar">خدمة العملاء دائما في خدمتكم على رقمنا الهاتفي : 0672975000</div>
      <div className="top-nav">
        <button className="plain-icon" onClick={onMenu} aria-label="فتح القائمة"><Icon name="menu" /></button>
        <div className="logo" dir="ltr"><b>Tanja</b><span>Mall</span></div>
      </div>
      <div className="search-line">
        <label className="search-box">
          <input placeholder="ابحث في المتجر" aria-label="ابحث في المتجر" />
          <button aria-label="بحث"><Icon name="search" /></button>
        </label>
        <button className="favorite-pill" aria-label="المفضلة">
          <Icon name="heart" />
          <span>{favorites}</span>
        </button>
      </div>
    </header>;
}
function Drawer({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return <div className={open ? "drawer show" : "drawer"} role="dialog" aria-modal="true">
      <button className="drawer-backdrop" onClick={onClose} aria-label="إغلاق القائمة" />
      <aside>
        <div className="drawer-head">
          <div className="logo" dir="ltr"><b>Tanja</b><span>Mall</span></div>
          <button className="plain-icon" onClick={onClose} aria-label="إغلاق القائمة"><Icon name="x" /></button>
        </div>
        <h3>التصنيفات</h3>
        <div className="drawer-cats">
          {categoryTiles.map((category, index) => <button className={index === 0 ? "wide" : ""} key={category.name} style={{
          backgroundColor: category.color
        }}>
              <img src={category.image} alt="" loading="lazy" />
              <span>{category.name}</span>
            </button>)}
        </div>
        <h3>السياسات</h3>
        {["طرق الدفع", "شروط الاستخدام", "الاستبدال والاسترجاع", "سياسة الخصوصية"].map(item => <a key={item}>{item}</a>)}
      </aside>
    </div>;
}
function ProductCard({
  product,
  favorite,
  onFavorite,
  onBuy
}: {
  product: typeof products[number];
  favorite: boolean;
  onFavorite: () => void;
  onBuy: () => void;
}) {
  return <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt="" loading="lazy" />
        <span className="discount">{product.discount} خصم</span>
        <button className={favorite ? "fav active" : "fav"} onClick={onFavorite} aria-label="تبديل المفضلة"><Icon name="heart" /></button>
      </div>
      <div className="product-copy">
        <h3>{product.title}</h3>
        <p className={product.stock.includes("إنتهى") ? "stock out" : "stock"}>{product.stock}</p>
        <div className="prices"><del>{product.old}</del><b>{product.price}</b></div>
        <button onClick={onBuy}>إشتري الأن</button>
      </div>
    </article>;
}
function ProductSection({
  title,
  items,
  favorites,
  onFavorite,
  onBuy
}: {
  title: string;
  items: typeof products;
  favorites: number[];
  onFavorite: (id: number) => void;
  onBuy: () => void;
}) {
  const [offset, setOffset] = useState(0);
  const visible = useMemo(() => [items[offset % items.length], items[(offset + 1) % items.length]], [items, offset]);
  return <section className="product-section">
      <div className="section-title">
        <h2>{title}</h2>
        <button onClick={() => setOffset(value => value + 1)}>مشاهدة الكل</button>
      </div>
      <div className="section-frame">
        <button className="slide-control right" onClick={() => setOffset(value => Math.max(0, value - 1))} aria-label="السابق">‹</button>
        <div className="two-products">
          {visible.map(product => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => onFavorite(product.id)} onBuy={onBuy} />)}
        </div>
        <button className="slide-control left" onClick={() => setOffset(value => value + 1)} aria-label="التالي">›</button>
      </div>
    </section>;
}
export const TanjaMallShoppexHomepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hero, setHero] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const toggleFavorite = (id: number) => {
    setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };
  return <div className="shoppex-page" dir="rtl">
      <Header favorites={favorites.length} onMenu={() => setMenuOpen(true)} />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <section className="home-slider">
          <img src={slides[hero].image} alt="" />
          <div className="slide-text">
            <small>الدفع عند الاستلام</small>
            <h1>{slides[hero].title}</h1>
            <p>{slides[hero].subtitle}</p>
            <button onClick={() => setCartCount(count => count + 1)}>إشتري الأن</button>
          </div>
          <button className="hero-arrow prev" onClick={() => setHero((hero + slides.length - 1) % slides.length)} aria-label="السابق">‹</button>
          <button className="hero-arrow next" onClick={() => setHero((hero + 1) % slides.length)} aria-label="التالي">›</button>
          <div className="dots">{slides.map((slide, index) => <button key={slide.title} className={index === hero ? "active" : ""} onClick={() => setHero(index)} aria-label={`الشريحة ${index + 1}`} />)}</div>
        </section>

        <section className="benefits">
          {["خدمة الزبائن", "الدفع عند الاستلام", "الجودة الأفضل", "ضمان الإسترجاع"].map(benefit => <div key={benefit}><Icon name={benefit === "خدمة الزبائن" ? "phone" : "cart"} /><span>{benefit}</span></div>)}
        </section>

        <section className="cat-block">
          <div className="section-title"><h2>التصنيفات</h2><button onClick={() => setMenuOpen(true)}>مشاهدة الكل</button></div>
          <div className="category-grid">
            {categoryTiles.map((category, index) => <button key={category.name} className={index === 0 ? "wide" : ""} style={{
            backgroundColor: category.color
          }}>
                <img src={category.image} alt="" loading="lazy" />
                <span>{category.name}</span>
              </button>)}
          </div>
        </section>

        <ProductSection title="أقوى العروض" items={products} favorites={favorites} onFavorite={toggleFavorite} onBuy={() => setCartCount(count => count + 1)} />
        <ProductSection title="المنتجات الجديدة" items={[...products].reverse()} favorites={favorites} onFavorite={toggleFavorite} onBuy={() => setCartCount(count => count + 1)} />
        <ProductSection title="عروض مصابيح الطاقة الشمسية" items={[products[1], products[2], products[3], products[4]]} favorites={favorites} onFavorite={toggleFavorite} onBuy={() => setCartCount(count => count + 1)} />

        <footer>
          <div className="logo" dir="ltr"><b>Tanja</b><span>Mall</span></div>
          <p>تابعنا لتحصل على عروضنا خاصة</p>
          <strong>© جميع الحقوق محفوظة لــ TanjaMall</strong>
        </footer>
      </main>
      <div className="mini-cart" aria-live="polite"><Icon name="cart" /><span>{cartCount}</span></div>
    </div>;
};
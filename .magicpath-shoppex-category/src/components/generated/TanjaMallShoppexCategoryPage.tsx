import { useMemo, useState } from "react";
const categories = ["الألكترونيات", "المنزل والحديقة", "الألعاب", "الجمال", "اكسسوارات السيارات", "أطفال", "ملابس", "أضواء ومصابيح", "أدوات البريكولاج"];
const products = [{
  id: 1,
  title: "بروجيكتور 120 واط يعمل بالطاقة الشمسية",
  price: 249,
  old: 449,
  discount: "45%",
  stock: true,
  image: "https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp"
}, {
  id: 2,
  title: "مصباح الطاقة الشمسية لجميع المساحات الخارجية 500 واط",
  price: 549,
  old: 1399,
  discount: "61%",
  stock: false,
  image: "https://aga-shoppex.com/media/8893/conversions/FQinn06FpPpjl7h9ARxmzp7oll8tyB2sd5oFdjSw-media-compressed.webp"
}, {
  id: 3,
  title: "مصباح لاسلكي يعمل بالطاقة الشمسية 400 واط",
  price: 699,
  old: 1299,
  discount: "46%",
  stock: true,
  image: "https://aga-shoppex.com/media/8868/conversions/WaUM9r8WMnVAuuYBK4N2iEeNwMkhRbiFguS4rGio-media-compressed.webp"
}, {
  id: 4,
  title: "بروجكتور قوي بإضاءة جد ساطعة 1000 واط",
  price: 799,
  old: 1199,
  discount: "33%",
  stock: true,
  image: "https://aga-shoppex.com/media/8682/conversions/hhxVz7jXm7CuY2Q0qlyTA2iM0qlTvGnhmjkv9VQR-media-compressed.webp"
}, {
  id: 5,
  title: "بروجكتور لاسلكي يعمل بالطاقة الشمسية 300 واط",
  price: 499,
  old: 699,
  discount: "29%",
  stock: true,
  image: "https://aga-shoppex.com/media/8756/conversions/giy5ZgNvBLtOS1sBlCfyMFQq4J6I2lvY9hvANn7P-media-compressed.webp"
}, {
  id: 6,
  title: "مصباح فائق السطوع يعمل بالطاقة الشمسية",
  price: 269,
  old: 499,
  discount: "54%",
  stock: true,
  image: "https://aga-shoppex.com/media/8765/conversions/EO8jiyTVUXCZAWUXJ0SVnMX3o1vEEfI1nVRJNhm5-media-compressed.webp"
}, {
  id: 7,
  title: "مصباح الطاقة الشمسية لجميع المساحات الخارجية 1000 واط",
  price: 799,
  old: 1198,
  discount: "33%",
  stock: true,
  image: "https://aga-shoppex.com/media/8926/conversions/P9Wm7jB2rHgDqwvM0aNlzMe3UhZtLS3HQqfpyWoS-media-compressed.webp"
}, {
  id: 8,
  title: "بروجكتور ليد بإضاءة قوية مناسب للأشغال الليلية",
  price: 229,
  old: 499,
  discount: "54%",
  stock: true,
  image: "https://aga-shoppex.com/media/8810/conversions/Feh4bEWBUqP3MRxJvj7eSoZrUX2GRwZnU74GevyG-media-compressed.webp"
}];
function Icon({
  name
}: {
  name: "menu" | "search" | "heart" | "x" | "filter" | "chev";
}) {
  const paths = {
    menu: "M4 7h16M4 12h16M4 17h16",
    search: "m20 20-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
    heart: "M12 20s-7-4.4-8.8-9A4.6 4.6 0 0 1 11 6.3l1 1 1-1A4.6 4.6 0 0 1 20.8 11C19 15.6 12 20 12 20Z",
    x: "M6 6l12 12M18 6 6 18",
    filter: "M4 6h16M7 12h10M10 18h4",
    chev: "m9 18 6-6-6-6"
  };
  return <svg viewBox="0 0 24 24"><path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ProductCard({
  product,
  favorite,
  onFavorite
}: {
  product: typeof products[number];
  favorite: boolean;
  onFavorite: () => void;
}) {
  return <article className="product-card">
      <div className="media">
        <img src={product.image} alt="" loading="lazy" />
        <span>{product.discount} خصم</span>
        <button className={favorite ? "fav active" : "fav"} onClick={onFavorite} aria-label="تبديل المفضلة"><Icon name="heart" /></button>
      </div>
      <div className="copy">
        <h3>{product.title}</h3>
        <p className={product.stock ? "stock" : "stock out"}>{product.stock ? "متوفر في المخزون" : "إنتهى من المخزون"}</p>
        <div><del>{product.old}.00 د.م</del><b>{product.price}.00 د.م</b></div>
        <button>إشتري الأن</button>
      </div>
    </article>;
}
export const TanjaMallShoppexCategoryPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sort, setSort] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProducts = useMemo(() => {
    let list = inStockOnly ? products.filter(product => product.stock) : products;
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "discount") list = [...list].sort((a, b) => Number(b.discount.replace("%", "")) - Number(a.discount.replace("%", "")));
    return list.slice(0, visibleCount);
  }, [inStockOnly, sort, visibleCount]);
  const toggleFavorite = (id: number) => setFavorites(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]);
  return <div className="shoppex-category" dir="rtl">
      <header>
        <div className="service">خدمة العملاء دائما في خدمتكم على رقمنا الهاتفي : 0672975000</div>
        <div className="head-row">
          <button onClick={() => setMenuOpen(true)} aria-label="فتح القائمة"><Icon name="menu" /></button>
          <div className="logo" dir="ltr"><b>Tanja</b><span>Mall</span></div>
        </div>
        <div className="search-row">
          <label><input placeholder="ابحث في المتجر" /><Icon name="search" /></label>
          <button className="fav-count" aria-label="المفضلة"><Icon name="heart" /><span>{favorites.length}</span></button>
        </div>
      </header>

      <main>
        <section className="side-list">
          <div className="small-title">التصنيفات</div>
          <div className="category-strip">
            {categories.map(category => <button key={category} className={category === "أضواء ومصابيح" ? "active" : ""}>{category}</button>)}
          </div>
        </section>

        <section className="page-title">
          <div>
            <span>التصنيف</span>
            <h1>أضواء ومصابيح</h1>
          </div>
          <strong>{visibleProducts.length} منتج</strong>
        </section>

        <div className="toolbar">
          <button onClick={() => setFilterOpen(true)}><Icon name="filter" /> فلترة</button>
          <button className={sort === "featured" ? "active" : ""} onClick={() => setSort("featured")}>الأكثر مبيعا</button>
          <button className={sort === "discount" ? "active" : ""} onClick={() => setSort("discount")}>أعلى خصم</button>
        </div>

        <div className="sort-bar">
          <span>ترتيب حسب</span>
          <select value={sort} onChange={event => setSort(event.target.value)}>
            <option value="featured">المميز</option>
            <option value="low">السعر: الأقل</option>
            <option value="high">السعر: الأعلى</option>
            <option value="discount">نسبة الخصم</option>
          </select>
        </div>

        {inStockOnly && <button className="active-filter" onClick={() => setInStockOnly(false)}>متوفر فقط ×</button>}

        <section className="grid">
          {visibleProducts.map(product => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)} />)}
        </section>

        {visibleCount < products.length && <button className="load-more" onClick={() => setVisibleCount(count => count + 2)}>تحميل المزيد</button>}
      </main>

      <div className={menuOpen ? "drawer show" : "drawer"}>
        <button className="shade" onClick={() => setMenuOpen(false)} aria-label="إغلاق" />
        <aside>
          <div className="drawer-head"><div className="logo" dir="ltr"><b>Tanja</b><span>Mall</span></div><button onClick={() => setMenuOpen(false)}><Icon name="x" /></button></div>
          <h3>التصنيفات</h3>
          {categories.map(category => <a key={category}>{category}</a>)}
        </aside>
      </div>

      <div className={filterOpen ? "filter-drawer show" : "filter-drawer"}>
        <button className="shade" onClick={() => setFilterOpen(false)} aria-label="إغلاق الفلترة" />
        <aside>
          <div className="drawer-head"><h3>فلترة المنتجات</h3><button onClick={() => setFilterOpen(false)}><Icon name="x" /></button></div>
          <label className="check"><input type="checkbox" checked={inStockOnly} onChange={event => setInStockOnly(event.target.checked)} /> متوفر في المخزون فقط</label>
          <div className="range-box"><span>السعر</span><strong>200 د.م - 800 د.م</strong><input type="range" min="200" max="800" defaultValue="600" /></div>
          <button className="apply" onClick={() => setFilterOpen(false)}>تطبيق الفلترة</button>
        </aside>
      </div>
    </div>;
};
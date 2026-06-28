import { useMemo, useState } from "react";
const gallery = ["https://aga-shoppex.com/media/6581/conversions/BeRweRlfsPcNG8s3yukpeAMLTdbnsQ3WMbB8Ozvi-media-compressed.webp", "https://aga-shoppex.com/media/8756/conversions/giy5ZgNvBLtOS1sBlCfyMFQq4J6I2lvY9hvANn7P-media-compressed.webp", "https://aga-shoppex.com/media/8893/conversions/FQinn06FpPpjl7h9ARxmzp7oll8tyB2sd5oFdjSw-media-compressed.webp", "https://aga-shoppex.com/media/8810/conversions/Feh4bEWBUqP3MRxJvj7eSoZrUX2GRwZnU74GevyG-media-compressed.webp"];
const offers = [{
  label: "مصباح واحد",
  price: 249,
  old: 449,
  discount: "45%"
}, {
  label: "2 مصابيح",
  price: 399,
  old: 898,
  discount: "56%"
}, {
  label: "3 مصابيح",
  price: 649,
  old: 1347,
  discount: "52%"
}, {
  label: "4 مصابيح",
  price: 799,
  old: 1796,
  discount: "56%"
}];
const related = [{
  title: "مصباح الطاقة الشمسية لجميع المساحات الخارجية 500 واط",
  price: "549.00 د.م",
  image: gallery[2]
}, {
  title: "بروجكتور لاسلكي يعمل بالطاقة الشمسية 300 واط",
  price: "499.00 د.م",
  image: gallery[1]
}, {
  title: "مصباح فائق السطوع يعمل بالطاقة الشمسية",
  price: "269.00 د.م",
  image: gallery[3]
}];
function Icon({
  name
}: {
  name: "menu" | "search" | "heart" | "x" | "phone" | "cart" | "check" | "whatsapp";
}) {
  const paths = {
    menu: "M4 7h16M4 12h16M4 17h16",
    search: "m20 20-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
    heart: "M12 20s-7-4.4-8.8-9A4.6 4.6 0 0 1 11 6.3l1 1 1-1A4.6 4.6 0 0 1 20.8 11C19 15.6 12 20 12 20Z",
    x: "M6 6l12 12M18 6 6 18",
    phone: "M7 4h4l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v4c0 1-1 2-2 2C10 21 3 14 3 6c0-1 1-2 2-2h2Z",
    cart: "M5 6h15l-2 9H8L6 3H3m6 17h.01M17 20h.01",
    check: "m5 12 4 4L19 6",
    whatsapp: "M7 19 4 20l1-3a8 8 0 1 1 3 3Zm3-9c1 4 4 5 5 5l1-2-2-1-1 1c-1 0-3-2-3-3l1-1-1-2-2 1Z"
  };
  return <svg viewBox="0 0 24 24"><path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export const TanjaMallShoppexProductPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [offerIndex, setOfferIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "طنجة",
    address: ""
  });
  const selectedOffer = offers[offerIndex];
  const total = useMemo(() => selectedOffer.price * qty, [selectedOffer, qty]);
  const submit = () => {
    if (!form.name || !form.phone) {
      setError("المرجو التأكد من مدخلاتك");
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  };
  return <div className="shoppex-product" dir="rtl">
      <header>
        <div className="top-service">خدمة العملاء دائما في خدمتكم على رقمنا الهاتفي : 0672975000</div>
        <div className="nav">
          <button onClick={() => setMenuOpen(true)} aria-label="فتح القائمة"><Icon name="menu" /></button>
          <div className="logo" dir="ltr"><b>Tanja</b><span>Mall</span></div>
          <button aria-label="المفضلة"><Icon name="heart" /></button>
        </div>
        <div className="search-row">
          <label><input placeholder="ابحث في المتجر" /><Icon name="search" /></label>
        </div>
      </header>

      <main>
        <section className="gallery">
          <img src={gallery[imageIndex]} alt="" />
          <button className="prev" onClick={() => setImageIndex((imageIndex + gallery.length - 1) % gallery.length)} aria-label="الصورة السابقة">‹</button>
          <button className="next" onClick={() => setImageIndex((imageIndex + 1) % gallery.length)} aria-label="الصورة التالية">›</button>
          <span>{imageIndex + 1} / {gallery.length}</span>
        </section>

        <div className="thumbs">
          {gallery.map((image, index) => <button key={image} className={index === imageIndex ? "active" : ""} onClick={() => setImageIndex(index)}><img src={image} alt="" /></button>)}
        </div>

        <section className="product-head">
          <h1>بروجيكتور 120 واط يعمل بالطاقة الشمسية</h1>
          <p>467 تقييمات</p>
          <div className="price"><del>{selectedOffer.old}.00 درهم</del><strong>{selectedOffer.price}.00 درهم</strong></div>
          <small>يرجى تسجيل معلوماتكم وسنتصل بكم لتأكيد الطلب في اقرب وقت.</small>
        </section>

        <section className="offers">
          <h2>إختر العرض المناسب لك</h2>
          <div>
            {offers.map((offer, index) => <button key={offer.label} className={index === offerIndex ? "selected" : ""} onClick={() => setOfferIndex(index)}>
                <span>{offer.label}</span>
                <em>تخفيض {offer.discount}</em>
                <del>{offer.old} درهم</del>
                <b>{offer.price} درهم</b>
              </button>)}
          </div>
        </section>

        <section className="order-form">
          <h2>إطلب الان</h2>
          <label><span>الإسم الكامل</span><input value={form.name} onChange={event => setForm({
            ...form,
            name: event.target.value
          })} /></label>
          <label><span>رقم الهاتف</span><input inputMode="tel" value={form.phone} onChange={event => setForm({
            ...form,
            phone: event.target.value
          })} /></label>
          <label><span>المدينة</span><input value={form.city} onChange={event => setForm({
            ...form,
            city: event.target.value
          })} /></label>
          <label><span>العنوان</span><input value={form.address} onChange={event => setForm({
            ...form,
            address: event.target.value
          })} /></label>
          <div className="qty">
            <span>الكمية</span>
            <button onClick={() => setQty(value => Math.max(1, value - 1))}>-</button>
            <b>{qty}</b>
            <button onClick={() => setQty(value => value + 1)}>+</button>
          </div>
          {error && <p className="error">{error}</p>}
          {submitted && <p className="success"><Icon name="check" /> تم تسجيل طلبك، سنتصل بك لتأكيده.</p>}
          <button className="submit" onClick={submit}>اطلب الان - {total} درهم</button>
        </section>

        <section className="trust">
          {["خدمة الزبائن 0672975000", "الدفع عند الاستلام", "الجودة الأفضل في السوق", "ضمان الإسترجاع والإستبدال"].map((item, index) => <div key={item}><Icon name={index === 0 ? "phone" : "check"} /><span>{item}</span></div>)}
        </section>

        <section className="details">
          <h2>تفاصيل المنتج</h2>
          <img src={gallery[0]} alt="" loading="lazy" />
          <p>بروجيكتور عملي يعمل بالطاقة الشمسية، مناسب للحدائق، السطح، المرآب، والأنشطة الليلية. تصميم الصفحة يحافظ على نفس شكل Shoppex: صور كبيرة، عروض متعددة، ونموذج طلب سريع للدفع عند الاستلام.</p>
        </section>

        <section className="related">
          <h2>منتجات مشابهة</h2>
          <div>
            {related.map(item => <article key={item.title}>
                <img src={item.image} alt="" loading="lazy" />
                <h3>{item.title}</h3>
                <b>{item.price}</b>
              </article>)}
          </div>
        </section>

        <section className="whatsapp">
          <h2>للإستفسار أو للطلب على الواتساب</h2>
          <button><Icon name="whatsapp" /> 0672975000</button>
        </section>
      </main>

      <div className="sticky-buy">
        <strong>{total} درهم</strong>
        <button onClick={submit}>إشتري الأن</button>
      </div>

      <div className={menuOpen ? "drawer show" : "drawer"}>
        <button className="shade" onClick={() => setMenuOpen(false)} aria-label="إغلاق" />
        <aside>
          <div className="drawer-head"><div className="logo" dir="ltr"><b>Tanja</b><span>Mall</span></div><button onClick={() => setMenuOpen(false)}><Icon name="x" /></button></div>
          {["التصنيفات", "طرق الدفع", "الاستبدال والاسترجاع", "سياسة الخصوصية", "إتصل بنا"].map(item => <a key={item}>{item}</a>)}
        </aside>
      </div>
    </div>;
};
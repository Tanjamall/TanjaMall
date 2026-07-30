"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Headphones, Heart, MapPin, Menu, PackageCheck, PhoneCall, Search, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import type { StoreCategory, StoreSettings } from "@/lib/storefront/types";

type StorefrontShellProps = {
  categories: StoreCategory[];
  settings: StoreSettings;
  children: ReactNode;
};

export function StorefrontShell({ categories, settings, children }: StorefrontShellProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const phone = settings.store_phone ?? "0672975000";
  const visibleCategories = useMemo(() => categories.slice(0, 8), [categories]);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", menuOpen);
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("drawer-open");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  }

  return (
    <div className="site-shell">
      <div className="page-frame">
        <header>
          <div className="desktop-utility-bar desktop-only">
            <div className="desktop-utility-inner">
              <div>
                <MapPin aria-hidden="true" />
                <span>التوصيل داخل {settings.default_city}</span>
              </div>
              <a href={`tel:${phone.replace(/\s/g, "")}`}>
                <PhoneCall aria-hidden="true" />
                <span>خدمة الزبناء:</span>
                <b className="phone-ltr">{phone}</b>
              </a>
            </div>
          </div>

          <div className="header-main">
            <div className="topbar">
              <Link
                href="/cart"
                className="icon-button"
                data-action="open-cart"
                aria-label={`السلة فيها ${cartCount} منتجات`}
              >
                <ShoppingCart aria-hidden="true" />
                {cartCount > 0 ? (
                  <span className="badge" aria-live="polite">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                ) : null}
                <span className="desktop-cart-copy desktop-only">
                  <small>سلة التسوق</small>
                  <strong>{cartCount ? `${cartCount} منتج` : "فارغة"}</strong>
                </span>
              </Link>

              <Link href="/" className="brand" dir="ltr" aria-label="TanjaMall">
                <span>Tanja</span>Mall
              </Link>

              <button
                type="button"
                className="icon-button"
                data-action="open-menu"
                aria-label="فتح القائمة"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <Menu aria-hidden="true" />
              </button>
            </div>

            <form className="search-row" onSubmit={submitSearch}>
              <button type="submit" className="icon-button light" aria-label="تنفيذ البحث">
                <Search aria-hidden="true" />
              </button>
              <div className="search-box">
                <Search aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="شنو كتقلب عليه؟"
                  aria-label="بحث عن منتج"
                />
              </div>
            </form>
          </div>

          <nav className="desktop-category-nav" aria-label="التنقل الرئيسي">
            <Link href="/">الرئيسية</Link>
            <Link href="/products">كل المنتجات</Link>
            {visibleCategories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
            <a className="desktop-nav-help" href={`tel:${phone.replace(/\s/g, "")}`}>
              <Headphones aria-hidden="true" />
              مساعدة في الطلب
            </a>
          </nav>
        </header>

        <div className="notice-strip" aria-label="مميزات الخدمة">
          <div className="notice-item">
            <ShoppingCart aria-hidden="true" />
            <span>الدفع عند الاستلام</span>
          </div>
          <div className="notice-item">
            <Heart aria-hidden="true" />
            <span>الجودة الأفضل</span>
          </div>
          <div className="notice-item">
            <PackageCheck aria-hidden="true" />
            <span>ضمان الإسترجاع</span>
          </div>
        </div>

        <main className="content">{children}</main>

        <footer className="store-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <strong dir="ltr"><span>Tanja</span>Mall</strong>
              <p>تسوق بسهولة، ادفع عند الاستلام، ونؤكد معك الطلب عبر الهاتف أو واتساب.</p>
            </div>
            <nav className="footer-links" aria-label="روابط المتجر">
              <strong>المتجر</strong>
              <Link href="/">الرئيسية</Link>
              <Link href="/products">كل المنتجات</Link>
              {visibleCategories.slice(0, 3).map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>{category.name}</Link>
              ))}
            </nav>
            <nav className="footer-links" aria-label="خدمة العملاء">
              <strong>خدمة العملاء</strong>
              <a href={`tel:${phone.replace(/\s/g, "")}`}>اتصل بنا</a>
              <span>الدفع عند الاستلام</span>
              <span>تأكيد عبر واتساب</span>
              <span>توصيل إلى {settings.default_city}</span>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} TanjaMall</span>
            <span>متجر مغربي للدفع عند الاستلام</span>
          </div>
        </footer>

        <div
          className={`drawer-backdrop ${menuOpen ? "active" : ""}`}
          role="presentation"
          onClick={() => setMenuOpen(false)}
        />
        <aside className={`drawer ${menuOpen ? "active" : ""}`} aria-hidden={!menuOpen}>
          <div className="drawer-head">
            <h2>القائمة</h2>
            <button className="icon-button ghost" type="button" aria-label="إغلاق القائمة" onClick={() => setMenuOpen(false)}>
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="drawer-body">
            <nav className="menu-links" aria-label="قائمة المتجر">
              <Link href="/" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
              <Link href="/products" onClick={() => setMenuOpen(false)}>كل المنتجات</Link>
              {visibleCategories.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`} onClick={() => setMenuOpen(false)}>
                  {category.name}
                </Link>
              ))}
              <Link href="/cart" onClick={() => setMenuOpen(false)}>السلة</Link>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

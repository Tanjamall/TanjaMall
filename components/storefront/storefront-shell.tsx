"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useMemo, useState } from "react";
import { Heart, Menu, Phone, Search, ShoppingCart, X } from "lucide-react";
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

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  }

  return (
    <div className="site-shell">
      <div className="page-frame">
        <header>
          <div className="service-line">
            <Phone aria-hidden="true" />
            <span>خدمة الزبائن: </span>
            <span className="phone-ltr">{phone}</span>
          </div>

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
            <Link href="/products" className="icon-button light" aria-label="بحث">
              <Search aria-hidden="true" />
            </Link>
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
        </header>

        <div className="notice-strip" aria-label="مميزات الخدمة">
          <div className="notice-item">
            <Phone aria-hidden="true" />
            <span>خدمة الزبائن</span>
          </div>
          <div className="notice-item">
            <ShoppingCart aria-hidden="true" />
            <span>الدفع عند الاستلام</span>
          </div>
          <div className="notice-item">
            <Heart aria-hidden="true" />
            <span>الجودة الأفضل</span>
          </div>
          <div className="notice-item">
            <PackageIcon />
            <span>ضمان الإسترجاع</span>
          </div>
        </div>

        <main className="content">{children}</main>

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

function PackageIcon() {
  return <ShoppingCart aria-hidden="true" />;
}

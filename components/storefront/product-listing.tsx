"use client";

import Link from "next/link";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryStrip } from "@/components/storefront/category-strip";
import { ProductCard } from "@/components/storefront/product-card";
import type { StoreCategory, StoreProduct } from "@/lib/storefront/types";

type ProductListingProps = {
  categories: StoreCategory[];
  products: StoreProduct[];
  title: string;
  description?: string | null;
  activeCategorySlug?: string;
  query?: string;
};

type SortMode = "featured" | "newest" | "price-asc" | "price-desc";

export function ProductListing({
  categories,
  products,
  title,
  description,
  activeCategorySlug,
  query
}: ProductListingProps) {
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [visibleCount, setVisibleCount] = useState(8);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query?.trim().toLowerCase();
    const matchingQuery = normalizedQuery
      ? products.filter((product) => {
          const haystack = `${product.name} ${product.short_description ?? ""} ${product.category_name ?? ""}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      : products;
    const matching = matchingQuery.filter((product) => {
      if (inStockOnly && product.stock <= 0) return false;
      if (onSaleOnly && (!product.compare_at_price || product.compare_at_price <= product.price)) return false;
      return true;
    });

    return [...matching].sort((a, b) => {
      if (sortMode === "price-asc") return a.price - b.price;
      if (sortMode === "price-desc") return b.price - a.price;
      if (sortMode === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return Number(b.is_featured) - Number(a.is_featured) || Number(b.is_best_seller) - Number(a.is_best_seller);
    });
  }, [inStockOnly, onSaleOnly, products, query, sortMode]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      <div className="listing-category-strip">
        <CategoryStrip categories={categories} />
      </div>

      <div className="listing-page-layout">
        <aside className="desktop-filter-sidebar desktop-only" aria-label="تصفية المنتجات">
          <div className="desktop-filter-group">
            <h2>التصنيفات</h2>
            <nav>
              <Link className={!activeCategorySlug ? "active" : ""} href="/products">
                كل المنتجات
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  className={activeCategorySlug === category.slug ? "active" : ""}
                  href={`/category/${category.slug}`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="desktop-filter-group">
            <h2>حالة المنتج</h2>
            <label>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => { setInStockOnly(event.target.checked); setVisibleCount(8); }}
              />
              <span>متوفر حاليا</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(event) => { setOnSaleOnly(event.target.checked); setVisibleCount(8); }}
              />
              <span>عروض وتخفيضات</span>
            </label>
            {inStockOnly || onSaleOnly ? (
              <button type="button" onClick={() => { setInStockOnly(false); setOnSaleOnly(false); }}>
                <X aria-hidden="true" /> مسح الفلاتر
              </button>
            ) : null}
          </div>
        </aside>

        <div className="listing-main">

      <section className="category-hero">
        <h1>{title}</h1>
        <p>{description ?? `${filteredProducts.length} منتج متوفر للطلب`}</p>
      </section>

      <div className="chips" aria-label="التصنيفات">
        <Link className={`chip ${!activeCategorySlug ? "active" : ""}`} href="/products">
          الكل
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            className={`chip ${activeCategorySlug === category.slug ? "active" : ""}`}
            href={`/category/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="toolbar mobile-listing-toolbar">
        <button
          className={`filter-btn ${filtersOpen ? "active" : ""}`}
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="product-filters"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <SlidersHorizontal aria-hidden="true" />
          <span>الفلاتر{inStockOnly || onSaleOnly ? ` (${Number(inStockOnly) + Number(onSaleOnly)})` : ""}</span>
        </button>
        <select
          className="sort-select"
          value={sortMode}
          aria-label="ترتيب المنتجات"
          onChange={(event) => { setSortMode(event.target.value as SortMode); setVisibleCount(8); }}
        >
          <option value="featured">الأبرز</option>
          <option value="newest">الأحدث</option>
          <option value="price-asc">السعر من الأقل</option>
          <option value="price-desc">السعر من الأعلى</option>
        </select>
      </div>

      {filtersOpen ? (
        <div className="filter-panel mobile-filter-panel" id="product-filters">
          <label>
            <input type="checkbox" checked={inStockOnly} onChange={(event) => { setInStockOnly(event.target.checked); setVisibleCount(8); }} />
            <span>المتوفر حاليا</span>
          </label>
          <label>
            <input type="checkbox" checked={onSaleOnly} onChange={(event) => { setOnSaleOnly(event.target.checked); setVisibleCount(8); }} />
            <span>المنتجات المخفضة</span>
          </label>
          {inStockOnly || onSaleOnly ? (
            <button type="button" onClick={() => { setInStockOnly(false); setOnSaleOnly(false); }}>
              <X aria-hidden="true" /> مسح الفلاتر
            </button>
          ) : null}
        </div>
      ) : null}

      <p className="results-count" aria-live="polite">{filteredProducts.length} منتج</p>

      <div className="desktop-results-toolbar desktop-only">
        <p aria-live="polite">{filteredProducts.length} منتج</p>
        <label>
          <span>ترتيب حسب</span>
          <select
            className="sort-select"
            value={sortMode}
            aria-label="ترتيب المنتجات"
            onChange={(event) => { setSortMode(event.target.value as SortMode); setVisibleCount(8); }}
          >
            <option value="featured">الأبرز</option>
            <option value="newest">الأحدث</option>
            <option value="price-asc">السعر من الأقل</option>
            <option value="price-desc">السعر من الأعلى</option>
          </select>
        </label>
      </div>

      {visibleProducts.length ? (
        <>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {visibleCount < filteredProducts.length ? (
            <button type="button" className="primary-btn load-more" onClick={() => setVisibleCount((count) => count + 8)}>
              عرض المزيد
            </button>
          ) : null}
        </>
      ) : (
        <div className="empty-state listing-empty-state">
          <SearchX aria-hidden="true" />
          <h2>لا توجد منتجات مطابقة</h2>
          <p>جرب مسح الفلاتر أو البحث بكلمة أخرى.</p>
          <button type="button" className="secondary-btn" onClick={() => { setInStockOnly(false); setOnSaleOnly(false); }}>
            عرض كل المنتجات
          </button>
        </div>
      )}
        </div>
      </div>
    </>
  );
}

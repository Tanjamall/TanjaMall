"use client";

import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
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

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query?.trim().toLowerCase();
    const matching = normalizedQuery
      ? products.filter((product) => {
          const haystack = `${product.name} ${product.short_description ?? ""} ${product.category_name ?? ""}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      : products;

    return [...matching].sort((a, b) => {
      if (sortMode === "price-asc") return a.price - b.price;
      if (sortMode === "price-desc") return b.price - a.price;
      if (sortMode === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return Number(b.is_featured) - Number(a.is_featured) || Number(b.is_best_seller) - Number(a.is_best_seller);
    });
  }, [products, query, sortMode]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      <CategoryStrip categories={categories} />

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

      <div className="toolbar">
        <button className="filter-btn" type="button" aria-label="الفلاتر">
          <SlidersHorizontal aria-hidden="true" />
          <span>الفلاتر</span>
        </button>
        <select
          className="sort-select"
          value={sortMode}
          aria-label="ترتيب المنتجات"
          onChange={(event) => setSortMode(event.target.value as SortMode)}
        >
          <option value="featured">الأبرز</option>
          <option value="newest">الأحدث</option>
          <option value="price-asc">السعر من الأقل</option>
          <option value="price-desc">السعر من الأعلى</option>
        </select>
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
        <div className="empty-state">لا توجد منتجات مطابقة حاليا.</div>
      )}
    </>
  );
}

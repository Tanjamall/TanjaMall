"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryStrip } from "@/components/storefront/category-strip";
import { ProductCard } from "@/components/storefront/product-card";
import type { StoreCategory, StoreProduct } from "@/lib/storefront/types";

type HomeStorefrontProps = {
  categories: StoreCategory[];
  products: StoreProduct[];
};

export function HomeStorefront({ categories, products }: HomeStorefrontProps) {
  const featuredProducts = useMemo(
    () => products.filter((product) => product.is_featured).slice(0, 8),
    [products]
  );
  const bestSellers = useMemo(
    () => products.filter((product) => product.is_best_seller).slice(0, 8),
    [products]
  );
  const slides = featuredProducts.length ? featuredProducts.slice(0, 3) : products.slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroProduct = slides[activeSlide] ?? products[0];

  return (
    <>
      {heroProduct ? (
        <section className="hero" aria-label="العروض الرئيسية">
          <Link href={`/products/${heroProduct.slug}`} className="hero-slide">
            <div>
              <span className="hero-kicker">عرض اليوم</span>
              <h1 className="hero-title">{heroProduct.name}</h1>
              <p className="hero-copy">{heroProduct.short_description ?? "اطلب الآن والدفع عند الاستلام داخل طنجة."}</p>
              <span className="view-all">اكتشف العرض</span>
            </div>
            {heroProduct.main_image_url ? (
              <img className="hero-img" src={heroProduct.main_image_url} alt={heroProduct.name} fetchPriority="high" decoding="async" />
            ) : null}
          </Link>
          <div className="hero-controls" aria-label="اختيار العرض">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`dot ${index === activeSlide ? "active" : ""}`}
                aria-label={`العرض ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <CategoryStrip categories={categories} />

      <ProductSection title="أقوى العروض" products={featuredProducts.length ? featuredProducts : products} />
      <ProductSection title="الأكثر طلبا" products={bestSellers.length ? bestSellers : products.slice(0, 6)} />
    </>
  );
}

function ProductSection({ title, products }: { title: string; products: StoreProduct[] }) {
  if (!products.length) return null;

  return (
    <section aria-label={title}>
      <div className="section-head">
        <h2 className="section-title">{title}</h2>
        <Link className="view-all" href="/products">مشاهدة الكل</Link>
      </div>
      <div className="product-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

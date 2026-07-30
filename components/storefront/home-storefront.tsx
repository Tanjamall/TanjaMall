"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Banknote, PhoneCall, Truck } from "lucide-react";
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
  const sideProducts = slides.slice(1, 3);

  return (
    <>
      <div className="home-hero-grid">
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
        <aside className="desktop-hero-aside desktop-only" aria-label="عروض مختارة">
          {sideProducts.map((product) => (
            <Link className="desktop-promo-card" href={`/products/${product.slug}`} key={product.id}>
              <div>
                <span>{product.is_best_seller ? "الأكثر طلبا" : "منتج مختار"}</span>
                <strong>{product.name}</strong>
                <small>اكتشف المنتج</small>
              </div>
              {product.main_image_url ? (
                <img src={product.main_image_url} alt="" loading="lazy" decoding="async" />
              ) : null}
            </Link>
          ))}
          {sideProducts.length < 2 ? (
            <div className="desktop-promo-card desktop-service-card">
              <Banknote aria-hidden="true" />
              <div>
                <span>شراء بدون مخاطرة</span>
                <strong>الدفع عند الاستلام</strong>
                <small>نؤكد الطلب معك قبل التوصيل</small>
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      <section className="desktop-home-services desktop-only" aria-label="خدمات المتجر">
        <div><Truck aria-hidden="true" /><span><strong>توصيل محلي</strong><small>توصيل سريع داخل طنجة</small></span></div>
        <div><Banknote aria-hidden="true" /><span><strong>الدفع عند الاستلام</strong><small>لا تدفع أي شيء مسبقا</small></span></div>
        <div><PhoneCall aria-hidden="true" /><span><strong>تأكيد شخصي</strong><small>عبر الهاتف أو واتساب</small></span></div>
      </section>

      <CategoryStrip categories={categories} />

      <ProductSection title="أقوى العروض" products={featuredProducts.length ? featuredProducts : products} />
      <ProductSection title="الأكثر طلبا" products={bestSellers.length ? bestSellers : products.slice(0, 6)} />
    </>
  );
}

function ProductSection({ title, products }: { title: string; products: StoreProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="home-product-section" aria-label={title}>
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

"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Banknote, PhoneCall, Truck } from "lucide-react";
import { useMemo } from "react";
import { CategoryStrip } from "@/components/storefront/category-strip";
import { ProductCard } from "@/components/storefront/product-card";
import { formatPrice } from "@/lib/storefront/format";
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

  return (
    <>
      {slides.length ? (
        <section className="hero" aria-label="المنتجات المميزة">
          <div className="hero-track">
            {slides.map((product, index) => (
              <Link href={`/products/${product.slug}`} className="hero-slide" key={product.id}>
                {product.main_image_url ? (
                  <img
                    className="hero-img"
                    src={product.main_image_url}
                    alt={product.name}
                    fetchPriority={index === 0 ? "high" : undefined}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ) : null}
                <div className="hero-product-info">
                  <h1 className="hero-title">{product.name}</h1>
                  <strong className="hero-price">{formatPrice(product.price)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="desktop-home-services desktop-only" aria-label="خدمات المتجر">
        <div><Truck aria-hidden="true" /><span><strong>توصيل وطني</strong><small>إلى جميع مدن المغرب</small></span></div>
        <div><Banknote aria-hidden="true" /><span><strong>الدفع عند الاستلام</strong><small>لا تدفع أي شيء مسبقا</small></span></div>
        <div><PhoneCall aria-hidden="true" /><span><strong>تأكيد شخصي</strong><small>عبر الهاتف أو واتساب</small></span></div>
      </section>

      <div className="home-category-cards">
        <CategoryStrip categories={categories} />
      </div>

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

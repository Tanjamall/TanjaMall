"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Banknote, PhoneCall, Truck } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { CategoryStrip } from "@/components/storefront/category-strip";
import { ProductCard } from "@/components/storefront/product-card";
import { formatPrice } from "@/lib/storefront/format";
import type { StoreCategory, StoreProduct } from "@/lib/storefront/types";

type HomeStorefrontProps = {
  categories: StoreCategory[];
  products: StoreProduct[];
};

export function HomeStorefront({ categories, products }: HomeStorefrontProps) {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef(0);
  const autoScrollPausedRef = useRef(false);
  const featuredProducts = useMemo(
    () => products.filter((product) => product.is_featured).slice(0, 8),
    [products]
  );
  const bestSellers = useMemo(
    () => products.filter((product) => product.is_best_seller).slice(0, 8),
    [products]
  );
  const slides = featuredProducts.length ? featuredProducts.slice(0, 3) : products.slice(0, 3);

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      if (autoScrollPausedRef.current) return;

      const track = heroTrackRef.current;
      if (!track) return;

      const nextIndex = (activeSlideRef.current + 1) % slides.length;
      const nextSlide = track.children.item(nextIndex);
      if (!(nextSlide instanceof HTMLElement)) return;

      activeSlideRef.current = nextIndex;
      nextSlide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  function syncActiveSlide() {
    const track = heroTrackRef.current;
    if (!track) return;

    const trackBounds = track.getBoundingClientRect();
    const isRtl = window.getComputedStyle(track).direction === "rtl";
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((slide, index) => {
      const slideBounds = slide.getBoundingClientRect();
      const distance = Math.abs((isRtl ? slideBounds.right : slideBounds.left) - (isRtl ? trackBounds.right : trackBounds.left));
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeSlideRef.current = closestIndex;
  }

  return (
    <>
      {slides.length ? (
        <section
          className="hero"
          aria-label="المنتجات المميزة"
          onMouseEnter={() => { autoScrollPausedRef.current = true; }}
          onMouseLeave={() => { autoScrollPausedRef.current = false; }}
          onFocusCapture={() => { autoScrollPausedRef.current = true; }}
          onBlurCapture={() => { autoScrollPausedRef.current = false; }}
          onPointerDown={() => { autoScrollPausedRef.current = true; }}
          onPointerUp={() => { autoScrollPausedRef.current = false; }}
          onPointerCancel={() => { autoScrollPausedRef.current = false; }}
        >
          <div className="hero-track" ref={heroTrackRef} onScroll={syncActiveSlide}>
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

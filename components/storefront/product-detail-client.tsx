"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Banknote, ChevronLeft, ChevronRight, Heart, MessageCircle, PhoneCall, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { InlineProductCheckout } from "@/components/storefront/inline-product-checkout";
import { ProductCard } from "@/components/storefront/product-card";
import { formatPrice } from "@/lib/storefront/format";
import type { ProductWithImages, StoreProduct, StoreSettings } from "@/lib/storefront/types";

type ProductDetailClientProps = {
  product: ProductWithImages;
  relatedProducts: StoreProduct[];
  settings: StoreSettings;
};

export function ProductDetailClient({ product, relatedProducts, settings }: ProductDetailClientProps) {
  const gallery = product.images.length
    ? product.images
    : product.main_image_url
      ? [{ id: product.id, product_id: product.id, image_url: product.main_image_url, alt_text: product.name, sort_order: 0 }]
      : [];
  const detailImages = product.detail_images.length ? product.detail_images : gallery;
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const activeImage = gallery[activeIndex] ?? null;
  const canOrder = product.stock > 0;
  const maxQuantity = Math.max(1, product.stock);
  const total = product.price * quantity;

  const whatsappUrl = useMemo(() => {
    const number = settings.whatsapp_number?.replace(/\D/g, "");
    if (!number) return null;
    const message = `I want more info on "${product.name}" / https://tanjamall.com/products/${product.slug}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }, [product.name, product.slug, settings.whatsapp_number]);

  function moveGallery(direction: number) {
    setActiveIndex((current) => (current + direction + gallery.length) % gallery.length);
  }

  function focusOrderForm() {
    document.getElementById("product-order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.querySelector<HTMLInputElement>("#product-order-form input[name='fullName']")?.focus(), 350);
  }

  return (
    <>
      <nav className="product-breadcrumb desktop-only" aria-label="مسار الصفحة">
        <Link href="/">الرئيسية</Link>
        <span>/</span>
        <Link href="/products">كل المنتجات</Link>
        <span>/</span>
        <strong>{product.name}</strong>
      </nav>

      <div className="product-buy-layout">
        <section className="product-page-media" aria-label="صور المنتج">
          <div className="main-gallery">
            {activeImage ? (
              <img src={activeImage.image_url} alt={activeImage.alt_text ?? product.name} fetchPriority="high" decoding="async" />
            ) : (
              <span className="skeleton-image">صورة المنتج</span>
            )}
            <div className="gallery-actions">
              <button
                className={`fav ${favorite ? "active" : ""}`}
                type="button"
                aria-label="إضافة للمفضلة"
                aria-pressed={favorite}
                onClick={() => setFavorite((current) => !current)}
              >
                <Heart aria-hidden="true" fill={favorite ? "currentColor" : "none"} />
              </button>
            </div>
            {gallery.length > 1 ? (
              <>
                <button className="gallery-nav gallery-next" type="button" aria-label="الصورة التالية" onClick={() => moveGallery(1)}>
                  <ChevronRight aria-hidden="true" />
                </button>
                <button className="gallery-nav gallery-previous" type="button" aria-label="الصورة السابقة" onClick={() => moveGallery(-1)}>
                  <ChevronLeft aria-hidden="true" />
                </button>
                <span className="gallery-count" aria-live="polite">{activeIndex + 1} / {gallery.length}</span>
              </>
            ) : null}
          </div>
          {gallery.length > 1 ? (
            <div className="thumb-row" aria-label="صور المنتج">
              {gallery.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  className={`thumb ${activeIndex === index ? "active" : ""}`}
                  aria-label={image.alt_text ?? `${product.name} - صورة ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={image.image_url} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          ) : null}
        </section>

        <div className="product-purchase-column">
          <section className="product-detail">
            <div className={`availability-badge ${canOrder ? "available" : "unavailable"}`}>
              {canOrder ? "متوفر للطلب" : "غير متوفر حاليا"}
            </div>
            <h1>{product.name}</h1>
            {product.short_description ? <p className="product-lead">{product.short_description}</p> : null}
            <div className="detail-price">
              <strong className="price">{formatPrice(product.price)}</strong>
              {product.compare_at_price ? <span className="old-price">{formatPrice(product.compare_at_price)}</span> : null}
            </div>
            <div className="desktop-product-assurances desktop-only">
              <div>
                <Banknote aria-hidden="true" />
                <span><strong>الدفع عند الاستلام</strong><small>لا تدفع مسبقا</small></span>
              </div>
              <div>
                <Truck aria-hidden="true" />
                <span><strong>توصيل إلى {settings.default_city}</strong><small>نؤكد الموعد معك</small></span>
              </div>
              <div>
                <PhoneCall aria-hidden="true" />
                <span><strong>تأكيد شخصي</strong><small>عبر الهاتف أو واتساب</small></span>
              </div>
            </div>
          </section>

          <InlineProductCheckout
            product={product}
            settings={settings}
            quantity={quantity}
            onIncrease={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
            onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
          />
        </div>
      </div>

      {detailImages.length ? (
        <section className="product-details-panel">
          <h2>تفاصيل المنتج</h2>
          <div className="details-image-stack">
            {detailImages.map((image) => (
              <figure className="details-image-block" key={`detail-${image.id}`}>
                <img src={image.image_url} alt={image.alt_text ?? product.name} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {relatedProducts.length ? (
        <section aria-label="منتجات مقترحة">
          <div className="section-head">
            <h2 className="section-title">منتجات مقترحة</h2>
            <Link className="view-all" href="/products">مشاهدة الكل</Link>
          </div>
          <div className="product-row">
            {relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      ) : null}

      <div className="floating-product-actions">
        {whatsappUrl ? (
          <a className="whatsapp-action" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            واتساب
          </a>
        ) : null}
        <button className="primary-btn floating-order-btn" type="button" disabled={!canOrder} onClick={focusOrderForm}>
          {canOrder ? <>اطلب الآن <span>{formatPrice(total)}</span></> : "غير متوفر"}
        </button>
      </div>
    </>
  );
}

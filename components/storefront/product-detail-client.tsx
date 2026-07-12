"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/storefront/product-card";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice, getDiscountPercent } from "@/lib/storefront/format";
import type { ProductWithImages, StoreProduct, StoreSettings } from "@/lib/storefront/types";

type ProductDetailClientProps = {
  product: ProductWithImages;
  relatedProducts: StoreProduct[];
  settings: StoreSettings;
};

export function ProductDetailClient({ product, relatedProducts, settings }: ProductDetailClientProps) {
  const router = useRouter();
  const gallery = product.images.length
    ? product.images
    : product.main_image_url
      ? [{ id: product.id, product_id: product.id, image_url: product.main_image_url, alt_text: product.name, sort_order: 0 }]
      : [];
  const [activeImage, setActiveImage] = useState(gallery[0]?.image_url ?? null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const total = product.price * quantity;

  const whatsappUrl = useMemo(() => {
    const number = settings.whatsapp_number?.replace(/\D/g, "");
    if (!number) return null;
    const message = `I want more info on "${product.name}" / https://tanjamall.com/products/${product.slug}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }, [product.name, product.slug, settings.whatsapp_number]);

  function addToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.main_image_url,
      price: product.price,
      quantity
    });
  }

  function buyNow() {
    addToCart();
    router.push("/cart");
  }

  return (
    <>
      <section className="product-page-media">
        <div className="main-gallery">
          {activeImage ? (
            <img src={activeImage} alt={product.name} />
          ) : (
            <span className="skeleton-image">صورة المنتج</span>
          )}
          <div className="gallery-actions">
            <button className="fav" type="button" aria-label="إضافة للمفضلة">
              <Heart aria-hidden="true" />
            </button>
          </div>
        </div>
        {gallery.length > 1 ? (
          <div className="thumb-row" aria-label="صور المنتج">
            {gallery.map((image) => (
              <button
                key={image.id}
                type="button"
                className={`thumb ${activeImage === image.image_url ? "active" : ""}`}
                aria-label={image.alt_text ?? product.name}
                onClick={() => setActiveImage(image.image_url)}
              >
                <img src={image.image_url} alt={image.alt_text ?? product.name} loading="lazy" />
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="product-detail">
        <h1>{product.name}</h1>
        <div className="rating-row">
          <span>4.9 من 5 - 67 تقييم</span>
          <span className="stars" aria-label="تقييم 5 نجوم">★★★★★</span>
        </div>
        <div className="detail-price">
          <strong className="price">{formatPrice(product.price)}</strong>
          {product.compare_at_price ? <span className="old-price">{formatPrice(product.compare_at_price)}</span> : null}
        </div>
      </section>

      <section className="panel">
        <h2>اختر العرض</h2>
        <div className="offer-list">
          <button className="offer-option active" type="button">
            <span className="radio-dot" />
            <span>
              <span className="offer-name">قطعة واحدة الدفع عند الاستلام</span>
              <span className="offer-note">الكمية قابلة للتغيير</span>
            </span>
            <span className="offer-price">{formatPrice(total)}</span>
          </button>
        </div>
        <div className="qty-row">
          <strong>الكمية</strong>
          <div className="qty-control">
            <button type="button" aria-label="زيادة الكمية" onClick={() => setQuantity((value) => value + 1)}>+</button>
            <span>{quantity}</span>
            <button type="button" aria-label="نقص الكمية" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
          </div>
        </div>
        <button className="primary-btn" type="button" onClick={buyNow}>
          اطلب الآن
        </button>
      </section>

      <section className="product-details-panel">
        <h2>تفاصيل المنتج</h2>
        <div className="details-image-stack">
          {gallery.map((image) => (
            <figure className="details-image-block" key={`detail-${image.id}`}>
              <img src={image.image_url} alt={image.alt_text ?? product.name} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {relatedProducts.length ? (
        <section aria-label="منتجات مقترحة">
          <div className="section-head">
            <h2 className="section-title">منتجات مقترحة</h2>
            <Link className="view-all" href="/products">مشاهدة الكل</Link>
          </div>
          <div className="product-row">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
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
        <button className="primary-btn floating-order-btn" type="button" onClick={buyNow}>
          اطلب الآن
        </button>
      </div>
    </>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice, getDiscountPercent } from "@/lib/storefront/format";
import type { StoreProduct } from "@/lib/storefront/types";

type ProductCardProps = {
  product: StoreProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const discount = getDiscountPercent(product);
  const canOrder = product.stock > 0;

  function orderProduct() {
    if (!canOrder) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.main_image_url,
      price: product.price,
      quantity: 1
    });
  }

  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-media" aria-label={product.name}>
        {product.main_image_url ? (
          <img src={product.main_image_url} alt={product.name} loading="lazy" />
        ) : (
          <span className="skeleton-image">صورة المنتج</span>
        )}
        {discount ? <span className="discount">{discount}%</span> : null}
      </Link>

      <button
        type="button"
        className={`fav ${favorite ? "active" : ""}`}
        aria-label="إضافة للمفضلة"
        onClick={() => setFavorite((current) => !current)}
      >
        <Heart aria-hidden="true" fill={favorite ? "currentColor" : "none"} />
      </button>

      <div className="product-info">
        <div className="stock-line">
          {discount ? `تخفيض ${discount}%` : product.stock > 0 ? "متوفر للطلب" : "غير متوفر حاليا"}
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <div className="price-row">
          <strong className="price">{formatPrice(product.price)}</strong>
          {product.compare_at_price ? (
            <span className="old-price">{formatPrice(product.compare_at_price)}</span>
          ) : null}
        </div>
        <button type="button" className="buy-btn" disabled={!canOrder} onClick={orderProduct}>
          اطلب
        </button>
      </div>
    </article>
  );
}

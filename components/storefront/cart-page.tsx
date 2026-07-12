"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/storefront/format";

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!items.length) {
    return (
      <section className="cart-page empty-cart-page">
        <div className="empty-state">
          <ShoppingBag aria-hidden="true" className="empty-cart-icon" />
          <h1>السلة فارغة</h1>
          <p>أضف المنتجات التي تريدها ثم أكمل طلبك بالدفع عند الاستلام.</p>
          <Link className="primary-btn" href="/products">تصفح المنتجات</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <div className="section-head">
        <h1 id="cart-title" className="section-title">السلة</h1>
        <span className="view-all" aria-live="polite">{itemCount} منتجات</span>
      </div>

      <div className="panel cart-items-panel">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;

          return (
            <article className="cart-item cart-page-item" key={item.productId}>
              <Link href={`/products/${item.slug}`} aria-label={item.name}>
                {item.image ? <img src={item.image} alt={item.name} loading="lazy" /> : <span className="cart-image-fallback">صورة المنتج</span>}
              </Link>
              <div className="cart-item-content">
                <div className="cart-item-topline">
                  <Link className="cart-title" href={`/products/${item.slug}`}>{item.name}</Link>
                  <button
                    className="cart-remove"
                    type="button"
                    aria-label={`حذف ${item.name} من السلة`}
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </div>
                <p className="cart-meta">{formatPrice(item.price)} للقطعة</p>
                <div className="cart-item-actions">
                  <div className="qty-control cart-qty-control" aria-label={`كمية ${item.name}`}>
                    <button type="button" aria-label={`زيادة كمية ${item.name}`} onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                      <Plus aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" aria-label={`تقليل كمية ${item.name}`} onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                      <Minus aria-hidden="true" />
                    </button>
                  </div>
                  <strong className="price">{formatPrice(lineTotal)}</strong>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="panel cart-summary" aria-label="ملخص الطلب">
        <div className="cart-total">
          <span>المجموع المبدئي</span>
          <strong aria-live="polite">{formatPrice(subtotal)}</strong>
        </div>
        <p className="cart-checkout-note">الدفع عند الاستلام. السعر النهائي وتكلفة التوصيل يتم تأكيدهما عند إتمام الطلب.</p>
        <Link className="primary-btn cart-checkout-button" href="/checkout">إتمام الطلب</Link>
        <Link className="secondary-btn" href="/products">متابعة التسوق</Link>
      </section>
    </section>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Banknote, Minus, PhoneCall, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/storefront/format";
import type { StoreSettings } from "@/lib/storefront/types";

export function CartPage({ settings }: { settings: StoreSettings }) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const qualifiesForFreeDelivery = settings.free_delivery_threshold !== null && subtotal >= settings.free_delivery_threshold;
  const deliveryFee = qualifiesForFreeDelivery ? 0 : settings.delivery_fee_tanger;
  const estimatedTotal = subtotal + (deliveryFee ?? 0);

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

      <div className="cart-layout">
        <div className="panel cart-items-panel">
          <div className="desktop-cart-table-head desktop-only">
            <span>المنتج</span>
            <span>الكمية والمجموع</span>
          </div>
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
          <h2>ملخص الطلب</h2>
          <div className="summary-lines">
            <div><span>ثمن المنتجات</span><strong>{formatPrice(subtotal)}</strong></div>
            <div><span>التوصيل إلى جميع مدن المغرب</span><strong>{deliveryFee === null ? "يؤكد لاحقا" : deliveryFee === 0 ? "مجاني" : formatPrice(deliveryFee)}</strong></div>
          </div>
          <div className="cart-total">
            <span>المجموع التقديري</span>
            <strong aria-live="polite">{deliveryFee === null ? formatPrice(subtotal) : formatPrice(estimatedTotal)}</strong>
          </div>
          <div className="cart-trust-list">
            <span><Banknote aria-hidden="true" /> الدفع عند الاستلام</span>
            <span><Truck aria-hidden="true" /> توصيل إلى جميع مدن المغرب</span>
            <span><PhoneCall aria-hidden="true" /> تأكيد عبر الهاتف أو واتساب</span>
          </div>
          <p className="cart-checkout-note">يحسب المتجر السعر النهائي بأحدث أسعار المنتجات عند تأكيد الطلب.</p>
          <Link className="primary-btn cart-checkout-button" href="/checkout">إتمام الطلب</Link>
          <Link className="secondary-btn" href="/products">متابعة التسوق</Link>
        </section>
      </div>
    </section>
  );
}

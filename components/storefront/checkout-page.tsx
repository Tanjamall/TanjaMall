"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MapPin, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/storefront/format";
import type { StoreSettings } from "@/lib/storefront/types";
import { createClient } from "@/lib/supabase/client";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators/checkout";

type CodOrderResult = {
  order_number: string;
  total: number | string;
};

function orderErrorMessage(message?: string) {
  if (message?.includes("unavailable")) return "بعض المنتجات لم تعد متوفرة بالكمية المطلوبة. راجع السلة وحاول مرة أخرى.";
  if (message?.includes("phone")) return "رقم الهاتف غير صحيح.";
  if (message?.includes("address")) return "أدخل عنواناً واضحاً للتوصيل.";
  if (message?.includes("city")) return "هذه المدينة غير متاحة للتوصيل حالياً.";
  return "تعذر إرسال الطلب الآن. حاول مرة أخرى بعد لحظات.";
}

export function CheckoutPage({ settings }: { settings: StoreSettings }) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cities = settings.supported_cities.length ? settings.supported_cities : [settings.default_city];
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutInput>({
    defaultValues: {
      city: cities.includes(settings.default_city) ? settings.default_city : cities[0]
    }
  });

  async function submitOrder(values: CheckoutInput) {
    clearErrors("root");
    const parsed = checkoutSchema.safeParse(values);

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof CheckoutInput;
        if (field) setError(field, { message: issue.message });
      }
      return;
    }

    if (!items.length) {
      setError("root", { message: "السلة فارغة. أضف منتجاً قبل إتمام الطلب." });
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.rpc("create_cod_order", {
      full_name: parsed.data.fullName,
      phone: parsed.data.phone,
      city: parsed.data.city,
      area: parsed.data.area || null,
      address: parsed.data.address,
      notes: parsed.data.notes || null,
      items: items.map((item) => ({ product_id: item.productId, quantity: item.quantity }))
    });

    const order = Array.isArray(data) ? (data[0] as CodOrderResult | undefined) : undefined;
    if (error || !order?.order_number) {
      setError("root", { message: orderErrorMessage(error?.message) });
      return;
    }

    clearCart();
    router.replace(`/order-success?order=${encodeURIComponent(order.order_number)}&total=${encodeURIComponent(String(order.total))}`);
  }

  if (!items.length) {
    return (
      <section className="checkout-page empty-checkout-page">
        <div className="empty-state">
          <ShoppingBag aria-hidden="true" className="empty-cart-icon" />
          <h1>السلة فارغة</h1>
          <p>أضف منتجاً قبل الانتقال إلى إتمام الطلب.</p>
          <Link className="primary-btn" href="/products">تصفح المنتجات</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page" aria-labelledby="checkout-title">
      <div className="section-head">
        <h1 id="checkout-title" className="section-title">إتمام الطلب</h1>
        <span className="view-all">الدفع عند الاستلام</span>
      </div>

      <form className="checkout-form" noValidate onSubmit={handleSubmit(submitOrder)}>
        <section className="panel checkout-details">
          <h2><MapPin aria-hidden="true" /> معلومات التوصيل</h2>
          <div className="checkout-fields">
            <label>
              <span>الاسم الكامل</span>
              <input {...register("fullName")} autoComplete="name" placeholder="الاسم الكامل" />
              {errors.fullName ? <small>{errors.fullName.message}</small> : null}
            </label>
            <label>
              <span>رقم الهاتف</span>
              <input {...register("phone")} autoComplete="tel" dir="ltr" inputMode="tel" placeholder="06xxxxxxxx" type="tel" />
              {errors.phone ? <small>{errors.phone.message}</small> : null}
            </label>
            <label>
              <span>المدينة</span>
              <select {...register("city")}>
                {cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              {errors.city ? <small>{errors.city.message}</small> : null}
            </label>
            <label>
              <span>المنطقة أو الحي <em>اختياري</em></span>
              <input {...register("area")} autoComplete="address-level2" placeholder="مثال: بني مكادة" />
            </label>
            <label className="checkout-wide-field">
              <span>العنوان الكامل</span>
              <textarea {...register("address")} autoComplete="street-address" placeholder="الحي، الشارع، رقم المنزل أو الشقة" rows={3} />
              {errors.address ? <small>{errors.address.message}</small> : null}
            </label>
            <label className="checkout-wide-field">
              <span>ملاحظات للطلب <em>اختياري</em></span>
              <textarea {...register("notes")} placeholder="أي ملاحظة تساعد في التوصيل" rows={2} />
            </label>
          </div>
        </section>

        <section className="panel checkout-summary" aria-label="ملخص الطلب">
          <h2>ملخص الطلب</h2>
          <div className="checkout-items">
            {items.map((item) => <div key={item.productId}><span>{item.name} × {item.quantity}</span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}
          </div>
          <div className="cart-total">
            <span>المجموع المبدئي</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <p className="cart-checkout-note">سيتم احتساب السعر النهائي والتوصيل من المتجر عند تأكيد الطلب.</p>
          {errors.root ? <p className="checkout-error" role="alert">{errors.root.message}</p> : null}
          <button className="primary-btn checkout-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "جار إرسال الطلب..." : "تأكيد الطلب"}
          </button>
        </section>
      </form>
    </section>
  );
}

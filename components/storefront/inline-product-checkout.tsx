"use client";

import { Banknote, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formatPrice } from "@/lib/storefront/format";
import type { StoreProduct, StoreSettings } from "@/lib/storefront/types";
import { createClient } from "@/lib/supabase/client";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators/checkout";

type CodOrderResult = {
  order_number: string;
  total: number | string;
};

type InlineProductCheckoutProps = {
  product: StoreProduct;
  settings: StoreSettings;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

function orderErrorMessage(message?: string) {
  if (message?.includes("unavailable")) return "المنتج لم يعد متوفرا بالكمية المطلوبة. جرب كمية أقل.";
  if (message?.includes("phone")) return "رقم الهاتف غير صحيح.";
  if (message?.includes("address")) return "أدخل عنوانا واضحا للتوصيل.";
  if (message?.includes("city")) return "هذه المدينة غير متاحة للتوصيل حاليا.";
  return "تعذر إرسال الطلب الآن. حاول مرة أخرى بعد لحظات.";
}

export function InlineProductCheckout({
  product,
  settings,
  quantity,
  onIncrease,
  onDecrease
}: InlineProductCheckoutProps) {
  const router = useRouter();
  const cities = settings.supported_cities.length ? settings.supported_cities : [settings.default_city];
  const productTotal = product.price * quantity;
  const qualifiesForFreeDelivery = settings.free_delivery_threshold !== null && productTotal >= settings.free_delivery_threshold;
  const deliveryFee = qualifiesForFreeDelivery ? 0 : settings.delivery_fee_tanger;
  const estimatedTotal = productTotal + (deliveryFee ?? 0);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutInput>({
    mode: "onTouched",
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

    const supabase = createClient();
    const { data, error } = await supabase.rpc("create_cod_order", {
      full_name: parsed.data.fullName,
      phone: parsed.data.phone,
      city: parsed.data.city,
      area: null,
      address: parsed.data.address,
      notes: null,
      items: [{ product_id: product.id, quantity }]
    });

    const order = Array.isArray(data) ? (data[0] as CodOrderResult | undefined) : undefined;
    if (error || !order?.order_number) {
      setError("root", { message: orderErrorMessage(error?.message) });
      return;
    }

    router.replace(`/order-success?order=${encodeURIComponent(order.order_number)}&total=${encodeURIComponent(String(order.total))}`);
  }

  return (
    <section className="inline-checkout" id="product-order-form" aria-labelledby="inline-checkout-title">
      <div className="inline-checkout-head">
        <div>
          <span>طلب سريع</span>
          <h2 id="inline-checkout-title">أدخل معلوماتك وأكد الطلب</h2>
        </div>
        <Banknote aria-hidden="true" />
      </div>

      <form noValidate onSubmit={handleSubmit(submitOrder)}>
        <div className="inline-checkout-fields">
          <label>
            <span>الاسم الكامل</span>
            <input {...register("fullName")} autoComplete="name" aria-invalid={Boolean(errors.fullName)} placeholder="الاسم الكامل" />
            {errors.fullName ? <small>{errors.fullName.message}</small> : null}
          </label>
          <label>
            <span>رقم الهاتف</span>
            <input {...register("phone")} autoComplete="tel" dir="ltr" inputMode="tel" aria-invalid={Boolean(errors.phone)} placeholder="06xxxxxxxx" type="tel" />
            {errors.phone ? <small>{errors.phone.message}</small> : null}
          </label>
          <label className="inline-checkout-wide">
            <span>المدينة</span>
            <input {...register("city")} autoComplete="address-level1" aria-invalid={Boolean(errors.city)} list="inline-city-suggestions" placeholder="المدينة" />
            <datalist id="inline-city-suggestions">
              {cities.map((city) => <option key={city} value={city} />)}
            </datalist>
            {errors.city ? <small>{errors.city.message}</small> : null}
          </label>
          <label className="inline-checkout-wide">
            <span>العنوان</span>
            <input {...register("address")} autoComplete="street-address" aria-invalid={Boolean(errors.address)} placeholder="العنوان" />
            {errors.address ? <small>{errors.address.message}</small> : null}
          </label>
        </div>

        <div className="inline-order-summary">
          <div className="inline-quantity">
            <strong>الكمية</strong>
            <div className="qty-control">
              <button type="button" aria-label="زيادة الكمية" disabled={quantity >= product.stock} onClick={onIncrease}>+</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" aria-label="نقص الكمية" disabled={quantity <= 1} onClick={onDecrease}>-</button>
            </div>
          </div>
          <div className="inline-total">
            <span>المجموع التقريبي</span>
            <strong>{formatPrice(deliveryFee === null ? productTotal : estimatedTotal)}</strong>
          </div>
        </div>

        <p className="inline-cod-note"><MapPin aria-hidden="true" /> الدفع عند الاستلام، وسنتصل بك لتأكيد العنوان.</p>
        {errors.root ? <p className="checkout-error" role="alert">{errors.root.message}</p> : null}
        <button className="primary-btn inline-submit" disabled={isSubmitting || product.stock <= 0} type="submit">
          {isSubmitting ? "جاري إرسال الطلب..." : `تأكيد الطلب - ${formatPrice(deliveryFee === null ? productTotal : estimatedTotal)}`}
        </button>
      </form>
    </section>
  );
}

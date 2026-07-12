import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { formatPrice } from "@/lib/storefront/format";
import { getCategories, getStoreSettings } from "@/lib/storefront/data";

type OrderSuccessPageProps = {
  searchParams: Promise<{ order?: string; total?: string }>;
};

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const [{ order, total }, categories, settings] = await Promise.all([searchParams, getCategories(), getStoreSettings()]);
  const orderTotal = Number(total);

  return (
    <StorefrontShell categories={categories} settings={settings}>
      <section className="order-success-page">
        <div className="panel order-success-panel">
          <CheckCircle2 aria-hidden="true" />
          <h1>تم استلام طلبك</h1>
          {order ? <p>رقم طلبك: <strong dir="ltr">{order}</strong></p> : null}
          {Number.isFinite(orderTotal) && orderTotal > 0 ? <p>المجموع المؤكد: <strong>{formatPrice(orderTotal)}</strong></p> : null}
          <p className="cart-checkout-note">سنتواصل معك عبر الهاتف أو واتساب لتأكيد الطلب قبل التوصيل.</p>
          <Link className="primary-btn" href="/">العودة للرئيسية</Link>
        </div>
      </section>
    </StorefrontShell>
  );
}

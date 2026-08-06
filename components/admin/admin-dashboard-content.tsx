import Link from "next/link";
import type { Route } from "next";
import {
  BadgeCheck,
  Bell,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Truck,
  XCircle
} from "lucide-react";
import { AdminDataTable, AdminStatCard, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminDashboardData } from "@/lib/admin/dashboard";
import { formatOrderDate, formatOrderMad } from "@/lib/orders";
import { retargetWhatsAppConfirmationUrl } from "@/lib/whatsapp/confirmation";

const previewDashboard: AdminDashboardData = {
  new_orders_today: 3,
  pending_confirmation_orders: 2,
  confirmed_orders: 1,
  delivered_orders: 12,
  cancelled_orders: 1,
  delivered_revenue: 12480,
  expected_revenue: 898,
  low_stock_count: 2,
  recent_orders: [
    {
      id: "TM-1048",
      order_number: "TM-1048",
      customer_name: "سعيد العمراني",
      customer_phone: "0612345678",
      city: "Tanger",
      area: "طنجة البالية",
      total: 498,
      status: "NEW",
      whatsapp_confirmation_url: "https://wa.me/212708012888?text=Confirmation",
      created_at: "2026-07-14T10:24:00Z"
    },
    {
      id: "TM-1047",
      order_number: "TM-1047",
      customer_name: "مريم الإدريسي",
      customer_phone: "0666123456",
      city: "Tanger",
      area: "مرشان",
      total: 549,
      status: "CONTACTED",
      whatsapp_confirmation_url: "https://wa.me/212708012888?text=Confirmation",
      created_at: "2026-07-14T09:12:00Z"
    }
  ],
  low_stock_products: [
    { id: "camp-shower-bag", name: "حقيبة استحمام محمولة للتخييم", slug: "camp-shower-bag", stock: 3, status: "DRAFT" },
    { id: "solar-projector", name: "بروجيكتور بالطاقة الشمسية", slug: "solar-projector", stock: 5, status: "PUBLISHED" }
  ]
};

export function AdminDashboardContent({
  preview = false,
  data,
  adminName = "مدير المتجر"
}: {
  preview?: boolean;
  data?: AdminDashboardData;
  adminName?: string;
}) {
  const dashboard = preview ? previewDashboard : data;
  if (!dashboard) return null;

  const basePath = preview ? "/admin-preview" : "/admin";

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="rounded-xl border border-[#d8e2dc] bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-3 rounded-lg border border-[#d8e2dc] bg-white p-3 shadow-sm sm:mb-4 sm:p-4">
          <div className="flex items-center justify-between gap-3" style={{ direction: "ltr" }}>
            <div className="flex items-center gap-2" dir="rtl">
              <details className="group relative">
                <summary className="relative grid h-10 w-10 cursor-pointer list-none place-items-center rounded-md border border-border bg-secondary text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden" aria-label={`تنبيهات المخزون: ${dashboard.low_stock_count}`}>
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  {dashboard.low_stock_count ? (
                    <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-black leading-none text-white">
                      {dashboard.low_stock_count}
                    </span>
                  ) : null}
                </summary>
                <div className="absolute left-0 z-30 mt-2 w-[min(88vw,360px)] rounded-lg border border-border bg-card p-3 text-right shadow-xl" dir="rtl">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black">تنبيهات المخزون</p>
                      <p className="mt-0.5 text-xs font-bold text-muted-foreground">منتجات بخمس قطع أو أقل</p>
                    </div>
                    <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-black text-red-700">{dashboard.low_stock_count}</span>
                  </div>
                  <div className="grid max-h-72 gap-2 overflow-x-hidden overflow-y-auto">
                    {dashboard.low_stock_products.length ? dashboard.low_stock_products.map((product) => (
                      <Link
                        className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-border p-2.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        href={`${basePath}/products/${product.id}/edit` as Route}
                        key={product.id}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black">{product.name}</p>
                          <p className="mt-0.5 text-xs font-bold text-red-700">المخزون: {product.stock}</p>
                        </div>
                        <StatusBadge status={product.status} />
                      </Link>
                    )) : (
                      <p className="rounded-md bg-emerald-50 p-3 text-sm font-bold text-emerald-700">لا توجد تنبيهات مخزون حاليا.</p>
                    )}
                  </div>
                </div>
              </details>
              <div className="hidden rounded-md border border-border bg-card px-3 py-2 text-sm font-black sm:block">{adminName}</div>
            </div>
            <div className="text-right" dir="rtl">
              <p className="text-xs font-black text-accent-foreground sm:text-sm">نظرة عامة على المتجر</p>
              <h2 className="mt-0.5 text-xl font-black sm:mt-1 sm:text-2xl">لوحة التحكم</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          <AdminStatCard title="طلبات اليوم" value={String(dashboard.new_orders_today)} description="طلبات أنشئت اليوم" icon={ClipboardList} tone="orange" />
          <AdminStatCard title="بانتظار التأكيد" value={String(dashboard.pending_confirmation_orders)} description="جديدة أو تم التواصل معها" icon={Clock3} tone="orange" />
          <AdminStatCard title="طلبات مؤكدة" value={String(dashboard.confirmed_orders)} description={`متوقع ${formatOrderMad(dashboard.expected_revenue)}`} icon={BadgeCheck} tone="green" />
          <AdminStatCard title="طلبات مسلمة" value={String(dashboard.delivered_orders)} description="تم توصيلها بنجاح" icon={Truck} tone="green" />
          <AdminStatCard title="طلبات ملغاة" value={String(dashboard.cancelled_orders)} description="لا تدخل في الإيرادات" icon={XCircle} tone="red" />
          <AdminStatCard title="إيرادات مسلمة" value={formatOrderMad(dashboard.delivered_revenue)} description="طلبات DELIVERED فقط" icon={CircleDollarSign} tone="green" />
        </div>

        <div className="mt-4">
          <Card>
            <CardHeader className="p-3 sm:p-4">
              <CardTitle>آخر الطلبات</CardTitle>
              <CardDescription>{preview ? "بيانات معاينة للتصميم." : "آخر الطلبات المسجلة في Supabase."}</CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
              <div className="grid gap-2 md:hidden">
                {dashboard.recent_orders.length ? dashboard.recent_orders.map((order) => (
                  <article className="rounded-md border border-border p-3" key={order.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-black">{order.customer_name}</p>
                        <p className="mt-1 text-xs font-bold text-muted-foreground">{[order.city, order.area].filter(Boolean).join(" / ")}</p>
                      </div>
                      <div className="shrink-0 text-left">
                        <p className="text-sm font-black" dir="ltr">{order.order_number}</p>
                        <p className="mt-1 text-sm font-black text-accent-foreground">{formatOrderMad(order.total)}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
                      <StatusBadge status={order.status} />
                      <div className="flex gap-2">
                        <WhatsAppButton href={retargetWhatsAppConfirmationUrl(order.whatsapp_confirmation_url, order.customer_phone)} label="تأكيد" />
                        <Button asChild size="sm" variant="secondary">
                          <Link href={`${basePath}/orders/${order.id}` as Route}>فتح</Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                )) : <p className="py-6 text-center text-sm font-bold text-muted-foreground">لا توجد طلبات بعد.</p>}
              </div>
              <div className="hidden md:block">
                <AdminDataTable
                  columns={["الطلب", "العميل", "المنطقة", "المجموع", "الحالة", "التاريخ", "إجراءات"]}
                  emptyText="لا توجد طلبات بعد."
                  rows={dashboard.recent_orders.map((order) => [
                    <span key={`${order.id}-number`} dir="ltr" className="font-black">{order.order_number}</span>,
                    order.customer_name,
                    [order.city, order.area].filter(Boolean).join(" / "),
                    formatOrderMad(order.total),
                    <StatusBadge key={`${order.id}-status`} status={order.status} />,
                    <span key={`${order.id}-date`} className="whitespace-nowrap text-xs">{formatOrderDate(order.created_at)}</span>,
                    <div key={`${order.id}-actions`} className="flex flex-wrap gap-2">
                      <WhatsAppButton href={retargetWhatsAppConfirmationUrl(order.whatsapp_confirmation_url, order.customer_phone)} label="تأكيد" />
                      <Button asChild size="sm" variant="secondary">
                        <Link href={`${basePath}/orders/${order.id}` as Route}>فتح</Link>
                      </Button>
                    </div>
                  ])}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

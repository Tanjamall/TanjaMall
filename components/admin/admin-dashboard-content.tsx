import Link from "next/link";
import type { Route } from "next";
import {
  BadgeCheck,
  Bell,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  PackageSearch,
  Truck,
  XCircle
} from "lucide-react";
import { AdminDataTable, AdminPageHeader, AdminStatCard, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminDashboardData } from "@/lib/admin/dashboard";
import { formatOrderDate, formatOrderMad } from "@/lib/orders";

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
      whatsapp_confirmation_url: "https://wa.me/212672975000",
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
      whatsapp_confirmation_url: "https://wa.me/212672975000",
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
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow={preview ? "معاينة التصميم" : "بيانات مباشرة من Supabase"}
        title="نظام إدارة TanjaMall"
        description="نظرة تشغيلية سريعة على الطلبات، الإيرادات المؤكدة، والتنبيهات التي تحتاج متابعة."
      >
        <span className="rounded-full bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700">
          {preview ? "بيانات معاينة" : "متصل مباشرة"}
        </span>
        <span className="rounded-full bg-[#131921] px-4 py-3 text-xs font-black text-white">COD Dashboard</span>
      </AdminPageHeader>

      <section className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm">
        <div className="mb-5 rounded-lg border border-[#d8e2dc] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4" style={{ direction: "ltr" }}>
            <div className="flex items-center gap-2" dir="rtl">
              <Button asChild type="button" variant="secondary" className="h-10 w-10 px-0" aria-label="الطلبات التي تحتاج متابعة">
                <Link href={`${basePath}/orders` as Route}>
                  <Bell className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <div className="rounded-md border border-border bg-card px-4 py-2 text-sm font-black">{adminName}</div>
            </div>
            <div className="text-right" dir="rtl">
              <p className="text-sm font-black text-accent-foreground">نظرة عامة على المتجر</p>
              <h2 className="mt-1 text-3xl font-black">لوحة التحكم</h2>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard title="طلبات اليوم" value={String(dashboard.new_orders_today)} description="طلبات أنشئت اليوم" icon={ClipboardList} tone="orange" />
          <AdminStatCard title="بانتظار التأكيد" value={String(dashboard.pending_confirmation_orders)} description="جديدة أو تم التواصل معها" icon={Clock3} tone="orange" />
          <AdminStatCard title="طلبات مؤكدة" value={String(dashboard.confirmed_orders)} description={`متوقع ${formatOrderMad(dashboard.expected_revenue)}`} icon={BadgeCheck} tone="green" />
          <AdminStatCard title="طلبات مسلمة" value={String(dashboard.delivered_orders)} description="تم توصيلها بنجاح" icon={Truck} tone="green" />
          <AdminStatCard title="طلبات ملغاة" value={String(dashboard.cancelled_orders)} description="لا تدخل في الإيرادات" icon={XCircle} tone="red" />
          <AdminStatCard title="إيرادات مسلمة" value={formatOrderMad(dashboard.delivered_revenue)} description="طلبات DELIVERED فقط" icon={CircleDollarSign} tone="green" />
          <AdminStatCard title="مخزون منخفض" value={String(dashboard.low_stock_count)} description="خمسة قطع أو أقل" icon={PackageSearch} tone="red" />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>آخر الطلبات</CardTitle>
              <CardDescription>{preview ? "بيانات معاينة للتصميم." : "آخر الطلبات المسجلة في Supabase."}</CardDescription>
            </CardHeader>
            <CardContent>
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
                    {order.whatsapp_confirmation_url ? <WhatsAppButton href={order.whatsapp_confirmation_url} label="تأكيد" /> : null}
                    <Button asChild size="sm" variant="secondary">
                      <Link href={`${basePath}/orders/${order.id}` as Route}>فتح</Link>
                    </Button>
                  </div>
                ])}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>مخزون يحتاج انتباه</CardTitle>
              <CardDescription>منتجات غير مؤرشفة بخمس قطع أو أقل.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {dashboard.low_stock_products.length ? dashboard.low_stock_products.map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-black">{product.name}</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">المخزون: {product.stock}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={product.status} />
                    <Button asChild size="sm" variant="secondary">
                      <Link href={`${basePath}/products/${product.id}/edit` as Route}>فتح</Link>
                    </Button>
                  </div>
                </div>
              )) : (
                <p className="rounded-md border border-dashed border-border p-6 text-center text-sm font-bold text-muted-foreground">
                  لا توجد منتجات بمخزون منخفض.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

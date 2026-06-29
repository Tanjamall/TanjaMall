import { Bell, Boxes, ChevronDown, CircleDollarSign, ClipboardList, Truck } from "lucide-react";
import { adminOrders, adminProducts } from "@/components/admin/admin-demo-data";
import { AdminDataTable, AdminPageHeader, AdminStatCard, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminDashboardContent({ preview = false }: { preview?: boolean }) {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="نظام إدارة TanjaMall"
        description="لوحة عربية RTL مبنية كمرجع بصري للتنفيذ القادم: شاشات إدارة المنتجات والطلبات والتصنيفات والإعدادات مع تأكيد واتساب. الواجهة العملية تستخدم ألوان TanjaMall، بينما يبقى تصميم المتجر الحالي كما هو."
      >
        <span className="rounded-full bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700">Supabase-ready</span>
        <span className="rounded-full bg-primary px-4 py-3 text-xs font-black text-primary-foreground">shadcn-style</span>
        <span className="rounded-full bg-[#131921] px-4 py-3 text-xs font-black text-white">Desktop-first</span>
      </AdminPageHeader>

      <section className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm">
        <div className="mb-5 rounded-lg border border-[#d8e2dc] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4" style={{ direction: "ltr" }}>
            <div className="flex items-center gap-2" dir="rtl">
              <Button type="button" variant="secondary" className="h-10 w-10 px-0" aria-label="التنبيهات">
                <Bell className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button type="button" variant="secondary">
                سعيد
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="text-right" dir="rtl">
              <p className="text-sm font-black text-accent-foreground">نظرة عامة على المتجر</p>
              <h2 className="mt-1 text-3xl font-black">لوحة التحكم</h2>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard title="طلبات جديدة" value="18" description="6 تحتاج تأكيد" icon={ClipboardList} tone="orange" />
          <AdminStatCard title="مبيعات مؤكدة" value="12,480 درهم" description="هذا الأسبوع" icon={CircleDollarSign} tone="green" />
          <AdminStatCard title="منتجات منشورة" value="64" description="9 مميزة" icon={Boxes} />
          <AdminStatCard title="مخزون منخفض" value="7" description="راجعها اليوم" icon={Truck} tone="red" />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>آخر الطلبات</CardTitle>
              <CardDescription>
                {preview ? "صفوف مؤقتة لمعاينة الشكل فقط." : "سيتم استبدال هذه الصفوف باستعلامات Supabase في Task 12."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                columns={["الطلب", "العميل", "المنطقة", "المجموع", "الحالة", "تأكيد"]}
                rows={adminOrders.map((order) => [
                  order.id,
                  order.customer,
                  order.area,
                  order.total,
                  <StatusBadge key={order.id} status={order.status} />,
                  <WhatsAppButton key={`${order.id}-wa`} href="https://wa.me/212672975000" label="تأكيد" />
                ])}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>منتجات تحتاج انتباه</CardTitle>
              <CardDescription>{preview ? "معاينة لقائمة المخزون والمسودات." : "قائمة مؤقتة للمخزون المنخفض والمسودات."}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {adminProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
                  <div>
                    <p className="text-sm font-black">{product.name}</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">المخزون: {product.stock}</p>
                  </div>
                  <StatusBadge status={product.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

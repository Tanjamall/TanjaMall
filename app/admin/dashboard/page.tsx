import { Boxes, CircleDollarSign, ClipboardList, Truck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminOrders, adminProducts } from "@/components/admin/admin-demo-data";
import { AdminDataTable, AdminPageHeader, AdminStatCard, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          title="لوحة التحكم"
          description="نظرة عملية على الطلبات والمنتجات والمخزون. بيانات هذه المرحلة مؤقتة إلى أن نربط الصفحات ب Supabase."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard title="طلبات جديدة" value="18" description="6 تحتاج تأكيد" icon={ClipboardList} tone="orange" />
          <AdminStatCard title="مبيعات مؤكدة" value="12,480 درهم" description="هذا الأسبوع" icon={CircleDollarSign} tone="green" />
          <AdminStatCard title="منتجات منشورة" value="64" description="9 مميزة" icon={Boxes} />
          <AdminStatCard title="مخزون منخفض" value="7" description="راجعها اليوم" icon={Truck} tone="red" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>آخر الطلبات</CardTitle>
              <CardDescription>سيتم استبدال هذه الصفوف باستعلامات Supabase في Task 12.</CardDescription>
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
              <CardDescription>قائمة مؤقتة للمخزون المنخفض والمسودات.</CardDescription>
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
      </div>
    </AdminShell>
  );
}

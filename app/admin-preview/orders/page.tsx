import Link from "next/link";
import type { Route } from "next";
import { Search } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminOrders } from "@/components/admin/admin-demo-data";
import { AdminDataTable, AdminPageHeader, StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminPreviewOrdersPage() {
  return (
    <AdminShell preview>
      <div className="space-y-6">
        <AdminPageHeader title="الطلبات" description="معاينة إدارة طلبات الدفع عند الاستلام." />

        <Card>
          <CardHeader>
            <CardTitle>كل الطلبات</CardTitle>
            <CardDescription>الحالات النهائية ستقرأ من Supabase لاحقا.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input className="pr-9" placeholder="رقم الطلب أو الهاتف..." />
              </div>
              {["الكل", "NEW", "CONFIRMED", "DELIVERED", "CANCELLED"].map((status) => (
                <Button key={status} type="button" variant="secondary">
                  {status}
                </Button>
              ))}
            </div>

            <AdminDataTable
              columns={["رقم الطلب", "العميل", "الهاتف", "المنطقة", "المجموع", "الحالة", "واتساب", "إجراءات"]}
              rows={adminOrders.map((order) => [
                order.id,
                order.customer,
                <span key={`${order.id}-phone`} dir="ltr">{order.phone}</span>,
                order.area,
                order.total,
                <StatusBadge key={order.id} status={order.status} />,
                <WhatsAppButton key={`${order.id}-wa`} href="https://wa.me/212672975000" label="تأكيد" />,
                <Button key={`${order.id}-view`} asChild variant="secondary" size="sm">
                  <Link href={`/admin-preview/orders/${order.id}` as Route}>فتح</Link>
                </Button>
              ])}
            />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminOrdersTable, type AdminOrderTableRow } from "@/components/admin/admin-orders-table";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminOrders } from "@/lib/admin/orders";
import { getStoreSettings } from "@/lib/storefront/data";
import { buildWhatsAppConfirmationUrl } from "@/lib/whatsapp/confirmation";

export default async function AdminOrdersPage() {
  const admin = await requireAdmin();
  const [orders, settings] = await Promise.all([getAdminOrders(), getStoreSettings()]);

  const rows: AdminOrderTableRow[] = orders.map((order) => ({
    ...order,
    whatsapp_url: order.whatsapp_confirmation_url ?? buildWhatsAppConfirmationUrl({
      storeName: settings.store_name,
      whatsappNumber: settings.whatsapp_number ?? "",
      customerName: order.customer_name,
      orderNumber: order.order_number,
      lines: order.items.map((item) => ({ name: item.product_name, quantity: item.quantity })),
      total: order.total,
      address: order.address
    })
  }));

  return (
    <AdminShell adminUser={admin}>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="إدارة الطلبات"
          title="الطلبات"
          description="تابع طلبات الدفع عند الاستلام، حدّث حالتها، وتواصل مع العميل عبر واتساب."
        />

        <Card>
          <CardHeader>
            <CardTitle>كل الطلبات</CardTitle>
            <CardDescription>بيانات مباشرة من Supabase مع بحث وتصفية حسب حالة الطلب.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminOrdersTable rows={rows} />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

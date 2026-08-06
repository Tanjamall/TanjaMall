import { AdminShell } from "@/components/admin/admin-shell";
import { AdminOrdersTable, type AdminOrderTableRow } from "@/components/admin/admin-orders-table";
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
    whatsapp_url: buildWhatsAppConfirmationUrl({
      storeName: settings.store_name,
      customerPhone: order.customer_phone,
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

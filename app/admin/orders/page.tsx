import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export default function AdminOrdersPage() {
  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="الطلبات"
        description="جدول الطلبات سيعرض حالات COD وروابط التأكيد عبر واتساب."
      />
    </AdminShell>
  );
}

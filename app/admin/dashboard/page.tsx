import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="لوحة التحكم"
        description="بطاقات الملخص والجداول ستتصل ببيانات Supabase في المهام القادمة."
      />
    </AdminShell>
  );
}

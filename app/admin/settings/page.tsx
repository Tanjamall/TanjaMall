import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="الإعدادات"
        description="إعدادات المتجر ستقرأ وتكتب لاحقا من جدول store_settings."
      />
    </AdminShell>
  );
}

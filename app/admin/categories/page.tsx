import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export default function AdminCategoriesPage() {
  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="التصنيفات"
        description="إدارة التصنيفات ستدعم ACTIVE و HIDDEN وترتيب العرض."
      />
    </AdminShell>
  );
}

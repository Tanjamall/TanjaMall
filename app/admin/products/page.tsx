import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export default function AdminProductsPage() {
  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="المنتجات"
        description="جدول المنتجات سيستخدم TanStack Table، والنماذج ستستخدم React Hook Form و Zod."
      />
    </AdminShell>
  );
}

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export default function NewProductPage() {
  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="منتج جديد"
        description="المنتجات الجديدة ستكون DRAFT افتراضيا عند ربط Supabase."
      />
    </AdminShell>
  );
}

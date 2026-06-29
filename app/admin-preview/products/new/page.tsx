import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

export default function AdminPreviewNewProductPage() {
  return (
    <AdminShell preview>
      <div className="space-y-6">
        <AdminPageHeader
          title="منتج جديد"
          description="معاينة محرر المنتج. الصور ستستخدم Cloudflare R2 و WebP عند التنفيذ الحقيقي."
        />
        <ProductEditorForm mode="new" />
      </div>
    </AdminShell>
  );
}

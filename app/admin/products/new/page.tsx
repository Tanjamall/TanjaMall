import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

export default function NewProductPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          title="منتج جديد"
          description="إنشاء منتج كمسودة أولا. الصور سترفع لاحقا إلى Cloudflare R2 بعد تحويلها إلى WebP."
        />
        <ProductEditorForm mode="new" />
      </div>
    </AdminShell>
  );
}

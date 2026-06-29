import { ProductEditorShell } from "@/components/admin/product-editor-shell";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

export default function AdminPreviewNewProductPage() {
  return (
    <ProductEditorShell title="إضافة أو تعديل منتج" breadcrumb="المنتجات / تحرير منتج" preview>
      <ProductEditorForm mode="new" />
    </ProductEditorShell>
  );
}

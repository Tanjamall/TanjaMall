import { ProductEditorShell } from "@/components/admin/product-editor-shell";
import { ProductEditorForm } from "@/components/admin/product-editor-form";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminCategories } from "@/lib/admin/catalog";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await getAdminCategories();

  return (
    <ProductEditorShell title="إضافة منتج جديد" breadcrumb="المنتجات / منتج جديد">
      <ProductEditorForm categories={categories} mode="new" />
    </ProductEditorShell>
  );
}

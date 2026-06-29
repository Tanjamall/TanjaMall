import { ProductEditorShell } from "@/components/admin/product-editor-shell";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

type AdminPreviewEditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPreviewEditProductPage({ params }: AdminPreviewEditProductPageProps) {
  const { id } = await params;

  return (
    <ProductEditorShell title="إضافة أو تعديل منتج" breadcrumb={`المنتجات / تحرير ${id}`} preview>
      <ProductEditorForm mode="edit" />
    </ProductEditorShell>
  );
}

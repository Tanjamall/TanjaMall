import { ProductEditorShell } from "@/components/admin/product-editor-shell";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <ProductEditorShell title="إضافة أو تعديل منتج" breadcrumb={`المنتجات / تحرير ${id}`}>
      <ProductEditorForm mode="edit" />
    </ProductEditorShell>
  );
}

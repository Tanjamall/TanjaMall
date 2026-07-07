import { ProductEditorShell } from "@/components/admin/product-editor-shell";
import { ProductEditorForm } from "@/components/admin/product-editor-form";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminCategories, getAdminProductEditorData } from "@/lib/admin/catalog";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  await requireAdmin();
  const { id } = await params;
  const [categories, editorData] = await Promise.all([
    getAdminCategories(),
    getAdminProductEditorData(id)
  ]);

  if (!editorData) {
    notFound();
  }

  return (
    <ProductEditorShell title="تعديل المنتج" breadcrumb={`المنتجات / ${editorData.product.name}`}>
      <ProductEditorForm categories={categories} editorData={editorData} mode="edit" />
    </ProductEditorShell>
  );
}

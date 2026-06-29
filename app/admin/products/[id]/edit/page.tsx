import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          title="تعديل المنتج"
          description={`واجهة تعديل المنتج ${id}. البيانات المعروضة مؤقتة إلى أن يتم ربط النموذج ب Supabase في Task 8.`}
        />
        <ProductEditorForm mode="edit" />
      </div>
    </AdminShell>
  );
}

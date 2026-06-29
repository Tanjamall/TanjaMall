import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

type AdminPreviewEditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPreviewEditProductPage({ params }: AdminPreviewEditProductPageProps) {
  const { id } = await params;

  return (
    <AdminShell preview>
      <div className="space-y-6">
        <AdminPageHeader title="تعديل المنتج" description={`معاينة محرر المنتج ${id} بدون اتصال Supabase.`} />
        <ProductEditorForm mode="edit" />
      </div>
    </AdminShell>
  );
}

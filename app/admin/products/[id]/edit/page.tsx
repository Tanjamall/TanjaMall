import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="تعديل المنتج"
        description={`مسار تعديل المنتج جاهز: ${id}.`}
      />
    </AdminShell>
  );
}

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

type AdminOrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderPage({ params }: AdminOrderPageProps) {
  const { id } = await params;

  return (
    <AdminShell>
      <AdminPlaceholderPage
        title="تفاصيل الطلب"
        description={`مسار تفاصيل الطلب جاهز: ${id}.`}
      />
    </AdminShell>
  );
}

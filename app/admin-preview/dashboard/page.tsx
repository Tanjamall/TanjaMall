import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminPreviewDashboardPage() {
  return (
    <AdminShell preview>
      <AdminDashboardContent preview />
    </AdminShell>
  );
}

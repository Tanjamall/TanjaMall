import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminDashboardData } from "@/lib/admin/dashboard";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const dashboard = await getAdminDashboardData();

  return (
    <AdminShell adminUser={admin}>
      <AdminDashboardContent
        adminName={admin.fullName || admin.email}
        data={dashboard}
      />
    </AdminShell>
  );
}

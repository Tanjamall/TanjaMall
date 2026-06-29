import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <AdminDashboardContent />
    </AdminShell>
  );
}

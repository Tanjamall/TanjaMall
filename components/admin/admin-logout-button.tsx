import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";

export function AdminLogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-black text-foreground hover:bg-secondary"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        خروج
      </button>
    </form>
  );
}

import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";

export function AdminLogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-sm font-black text-white hover:bg-white/15 lg:border-border lg:bg-background lg:text-foreground lg:hover:bg-secondary"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        خروج
      </button>
    </form>
  );
}

import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ShieldCheck, UserRound } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { AdminWorkspace } from "@/components/admin/admin-workspace";
import { requireAdmin, type AdminUser } from "@/lib/admin/auth";

const previewAdmin: AdminUser = {
  id: "preview",
  email: "preview@tanjamall.local",
  fullName: "Preview Admin",
  role: "ADMIN"
};

export async function AdminShell({
  children,
  preview = false,
  adminUser
}: Readonly<{
  children: ReactNode;
  preview?: boolean;
  adminUser?: AdminUser;
}>) {
  if (preview && process.env.NODE_ENV === "production" && process.env.ADMIN_PREVIEW_ENABLED !== "true") {
    notFound();
  }

  const admin = preview ? previewAdmin : adminUser ?? await requireAdmin();
  const basePath = preview ? "/admin-preview" : "/admin";

  return (
    <main className="min-h-screen bg-[#ece8df] px-3 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-3 text-foreground sm:px-4 md:p-8">
      <header className="mx-auto mb-3 flex max-w-[1720px] items-center justify-between rounded-xl bg-[#131921] px-4 py-3 text-white shadow-sm lg:hidden" dir="rtl">
        <Link className="flex items-center gap-3" href={`${basePath}/dashboard` as Route}>
          <div className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-lg font-black leading-none" dir="ltr"><span className="text-primary">Tanja</span>Mall</p>
            <p className="mt-1 text-[11px] font-bold text-white/60">{preview ? "معاينة الإدارة" : "إدارة المتجر"}</p>
          </div>
        </Link>
        {!preview ? <AdminLogoutButton /> : <span className="rounded-md bg-white/10 px-3 py-2 text-xs font-black">معاينة</span>}
      </header>

      <AdminWorkspace basePath={basePath} preview={preview}>
        {children}
      </AdminWorkspace>

      <div className="sr-only">
        <UserRound aria-hidden="true" />
        {admin.email || admin.fullName || "Admin"}
      </div>
    </main>
  );
}

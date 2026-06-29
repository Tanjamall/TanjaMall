import Link from "next/link";
import type { Route } from "next";
import type { ComponentType, ReactNode } from "react";
import { BarChart3, Boxes, ClipboardList, FolderTree, Settings, ShieldCheck, UserRound } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { requireAdmin } from "@/lib/admin/auth";

const navItems: Array<{
  href: Route;
  label: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}> = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: BarChart3 },
  { href: "/admin/products", label: "المنتجات", icon: Boxes },
  { href: "/admin/categories", label: "التصنيفات", icon: FolderTree },
  { href: "/admin/orders", label: "الطلبات", icon: ClipboardList },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings }
];

export async function AdminShell({ children }: Readonly<{ children: ReactNode }>) {
  const admin = await requireAdmin();

  return (
    <main className="min-h-screen bg-[#f1eee6] text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-l border-white/10 bg-[#131921] p-5 text-white">
          <Link className="mb-8 flex items-center justify-between rounded-lg bg-white/5 p-4" href="/admin/dashboard">
            <div>
              <p className="text-xs font-black text-orange-300">لوحة إدارة</p>
              <p className="text-2xl font-black" dir="ltr">
                <span className="text-primary">Tanja</span>Mall
              </p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
          </Link>

          <nav className="grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-black text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-black">إدارة المحتوى فقط</p>
            <p className="mt-2 text-xs font-bold leading-6 text-white/60">الطلبات والمنتجات والإعدادات محمية بحساب مسؤول.</p>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-5 py-3">
            <div>
              <p className="text-xs font-black text-muted-foreground">إدارة متجر الدفع عند الاستلام</p>
              <p className="text-sm font-black">طنجة أولا</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-black">
                <UserRound className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{admin.email || admin.fullName || "Admin"}</span>
              </div>
              <AdminLogoutButton />
            </div>
          </header>
          <div className="p-5 lg:p-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

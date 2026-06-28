import Link from "next/link";
import type { Route } from "next";
import { BarChart3, Boxes, ClipboardList, FolderTree, Settings, UserRound } from "lucide-react";

const navItems: Array<{
  href: Route;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}> = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: BarChart3 },
  { href: "/admin/products", label: "المنتجات", icon: Boxes },
  { href: "/admin/categories", label: "التصنيفات", icon: FolderTree },
  { href: "/admin/orders", label: "الطلبات", icon: ClipboardList },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings }
];

export function AdminShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-muted/60 text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-l border-border bg-[#131921] p-5 text-white">
          <Link className="mb-8 block text-center text-2xl font-black" href="/admin/dashboard" dir="ltr">
            <span className="text-primary">Tanja</span>Mall
          </Link>
          <nav className="grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-black text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="min-w-0">
          <header className="flex min-h-16 items-center justify-between border-b border-border bg-card px-5">
            <div>
              <p className="text-xs font-black text-muted-foreground">إدارة متجر COD</p>
              <p className="text-sm font-black">Tanger first</p>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-black">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Admin
            </div>
          </header>
          <div className="p-5 lg:p-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

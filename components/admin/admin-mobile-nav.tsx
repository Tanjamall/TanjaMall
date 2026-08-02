"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { adminNavItems, isAdminNavItemActive } from "@/components/admin/admin-nav-items";

export function AdminMobileNav({ basePath }: { basePath: "/admin" | "/admin-preview" }) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 mx-auto grid max-w-md grid-cols-5 rounded-xl border border-white/10 bg-[#131921] p-1.5 text-white shadow-2xl shadow-slate-950/30 lg:hidden" aria-label="التنقل في لوحة الإدارة" dir="rtl">
      {adminNavItems.filter((item) => item.showInDock).map((item) => {
        const href = `${basePath}${item.path}`;
        const active = isAdminNavItemActive(pathname, href, item);
        const Icon = item.icon;
        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#131921] ${active ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
            href={href as Route}
            key={item.id}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="max-w-full truncate">{item.mobileLabel ?? item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

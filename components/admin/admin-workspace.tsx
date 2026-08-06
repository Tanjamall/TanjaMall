"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useState, type FocusEvent, type ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { adminNavItems, isAdminNavItemActive } from "@/components/admin/admin-nav-items";

export function AdminWorkspace({
  children,
  basePath,
  preview
}: Readonly<{
  children: ReactNode;
  basePath: "/admin" | "/admin-preview";
  preview: boolean;
}>) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  function handleSidebarBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setCollapsed(true);
  }

  return (
    <>
      <div
        className={`mx-auto grid max-w-[1720px] gap-6 transition-[grid-template-columns] duration-200 ease-out motion-reduce:transition-none ${
          collapsed
            ? "lg:grid-cols-[minmax(0,1fr)_76px]"
            : "lg:grid-cols-[minmax(0,1fr)_288px]"
        }`}
        style={{ direction: "ltr" }}
      >
        <section className="min-w-0 space-y-4 md:space-y-8" dir="rtl">
          {children}
        </section>

        <aside
          className={`relative sticky top-6 hidden h-[calc(100vh-48px)] overflow-hidden rounded-xl border border-white/10 bg-[#131921] text-white shadow-xl shadow-slate-950/10 transition-[padding] duration-200 ease-out motion-reduce:transition-none lg:block ${
            collapsed ? "p-3" : "p-4"
          }`}
          dir="rtl"
          onBlur={handleSidebarBlur}
          onFocus={() => setCollapsed(false)}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <Link
            className={`mb-8 flex min-h-11 items-center ${collapsed ? "justify-center" : "justify-between"}`}
            href={`${basePath}/dashboard` as Route}
            aria-label={collapsed ? "TanjaMall، لوحة التحكم" : undefined}
            title={collapsed ? "TanjaMall" : undefined}
          >
            <div
              aria-hidden={collapsed}
              className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
                collapsed ? "max-w-0 translate-x-2 opacity-0" : "max-w-48 translate-x-0 opacity-100"
              }`}
            >
                <p className="text-xs font-bold text-orange-300">
                  {preview ? "معاينة محلية" : "لوحة إدارة"}
                </p>
                <p className="text-2xl font-black" dir="ltr">
                  <span className="text-primary">Tanja</span>Mall
                </p>
            </div>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
          </Link>

          <nav className="space-y-1" aria-label="التنقل في لوحة الإدارة">
            {adminNavItems.map((item) => {
              const href = `${basePath}${item.path}`;
              const active = isAdminNavItemActive(pathname, href, item);
              const Icon = item.icon;

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  className={`flex min-h-11 items-center rounded-md text-sm font-black transition-[color,background-color,padding,gap] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#131921] ${
                    collapsed ? "justify-center px-0" : "gap-3 px-3"
                  } ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-white/72 hover:bg-white/10 hover:text-white"
                  }`}
                  href={href as Route}
                  key={item.id}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  <span
                    aria-hidden={collapsed}
                    className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
                      collapsed ? "max-w-0 translate-x-2 opacity-0" : "max-w-48 translate-x-0 opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {!collapsed ? (
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/7 p-4">
              <p className="text-sm font-extrabold">{preview ? "وضع معاينة" : "وضع الإدارة"}</p>
              <p className="mt-2 text-xs font-bold leading-6 text-white/62">
                {preview
                  ? "هذه الصفحات لا تحفظ بيانات ولا تتصل بتسجيل دخول Supabase."
                  : "الصفحات محمية بحساب مسؤول في Supabase."}
              </p>
            </div>
          ) : null}
        </aside>
      </div>

      <AdminMobileNav basePath={basePath} />
    </>
  );
}

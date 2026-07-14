import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import {
  Boxes,
  ClipboardList,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Settings,
  ShieldCheck,
  UserRound
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { requireAdmin, type AdminUser } from "@/lib/admin/auth";

const navItems: Array<{
  path: string;
  label: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}> = [
  { path: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { path: "/orders", label: "الطلبات", icon: ClipboardList },
  { path: "/products", label: "المنتجات", icon: Boxes },
  { path: "/categories", label: "التصنيفات", icon: FolderTree },
  { path: "/settings", label: "الوسائط", icon: ImageIcon },
  { path: "/orders", label: "واتساب", icon: MessageCircle },
  { path: "/settings", label: "الإعدادات", icon: Settings }
];

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
    <main className="min-h-screen bg-[#ece8df] p-4 text-foreground md:p-8">
      <div className="mx-auto grid max-w-[1720px] gap-6 lg:grid-cols-[minmax(0,1fr)_288px]" style={{ direction: "ltr" }}>
        <section className="min-w-0 space-y-8" dir="rtl">
          {children}
        </section>

        <aside
          className="sticky top-6 h-[calc(100vh-48px)] rounded-xl border border-white/10 bg-[#131921] p-4 text-white shadow-xl shadow-slate-950/10"
          dir="rtl"
        >
          <Link className="mb-8 flex items-center justify-between" href={`${basePath}/dashboard` as Route}>
            <div>
              <p className="text-xs font-bold text-orange-300">{preview ? "معاينة محلية" : "لوحة إدارة"}</p>
              <p className="text-2xl font-black" dir="ltr">
                <span className="text-primary">Tanja</span>Mall
              </p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === 0;
              return (
                <Link
                  className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-black transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-white/72 hover:bg-white/10 hover:text-white"
                  }`}
                  href={`${basePath}${item.path}` as Route}
                  key={`${item.label}-${index}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/7 p-4">
            <p className="text-sm font-extrabold">{preview ? "وضع معاينة" : "وضع الإدارة"}</p>
            <p className="mt-2 text-xs font-bold leading-6 text-white/62">
              {preview
                ? "هذه الصفحات لا تحفظ بيانات ولا تتصل بتسجيل دخول Supabase."
                : "الصفحات محمية بحساب مسؤول في Supabase."}
            </p>
          </div>
        </aside>
      </div>

      <div className="sr-only">
        <UserRound aria-hidden="true" />
        {admin.email || admin.fullName || "Admin"}
        {!preview ? <AdminLogoutButton /> : null}
      </div>
    </main>
  );
}

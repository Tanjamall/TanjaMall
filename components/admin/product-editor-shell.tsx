import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowRight, Eye, PackageCheck, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";

export async function ProductEditorShell({
  title,
  breadcrumb,
  preview = false,
  children
}: {
  title: string;
  breadcrumb: string;
  preview?: boolean;
  children: ReactNode;
}) {
  if (preview && process.env.NODE_ENV === "production" && process.env.ADMIN_PREVIEW_ENABLED !== "true") {
    notFound();
  }

  if (!preview) {
    await requireAdmin();
  }

  const backHref = (preview ? "/admin-preview/products" : "/admin/products") as Route;

  return (
    <main className="min-h-screen bg-[#ece8df] text-foreground" dir="rtl">
      <header className="border-b border-[#d8e2dc] bg-[#f1eee6] px-4 py-5 md:px-8">
        <div className="mx-auto flex max-w-[1720px] items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button asChild variant="secondary" className="h-11 w-11 px-0">
              <Link href={backHref} aria-label="العودة إلى المنتجات">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <div>
              <p className="text-sm font-black text-accent-foreground">{breadcrumb}</p>
              <h1 className="mt-1 text-3xl font-black md:text-4xl">{title}</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="secondary">
              <Eye className="h-4 w-4" aria-hidden="true" />
              معاينة
            </Button>
            <Button type="button" variant="secondary">
              <Save className="h-4 w-4" aria-hidden="true" />
              حفظ كمسودة
            </Button>
            <Button type="button">
              <PackageCheck className="h-4 w-4" aria-hidden="true" />
              نشر المنتج
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1720px] px-4 py-8 md:px-8">{children}</div>
    </main>
  );
}

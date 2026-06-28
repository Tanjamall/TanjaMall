import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { redirectAdminAwayFromLogin } from "@/lib/admin/auth";

export default async function AdminLoginPage() {
  await redirectAdminAwayFromLogin();

  return (
    <main className="grid min-h-screen place-items-center bg-muted/60 px-4 py-10 text-foreground">
      <div className="grid w-full justify-items-center gap-6">
        <div className="text-center">
          <div className="text-3xl font-black" dir="ltr">
            <span className="text-primary">Tanja</span>Mall
          </div>
          <p className="mt-2 text-sm font-bold text-muted-foreground">لوحة إدارة المتجر</p>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  email: string;
  fullName: string | null;
  role: "ADMIN" | "STAFF";
};

export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .eq("role", "ADMIN")
    .maybeSingle();

  if (profileError || !profile) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile.full_name,
    role: profile.role as "ADMIN" | "STAFF"
  };
}

export async function requireAdmin() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}

export async function redirectAdminAwayFromLogin() {
  const admin = await getAdminUser();

  if (admin) {
    redirect("/admin/dashboard");
  }
}

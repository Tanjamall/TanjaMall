"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminLoginState = {
  error?: string;
};

export async function loginAdmin(_previousState: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "أدخل البريد الإلكتروني وكلمة المرور." };
  }

  const supabase = await createClient();
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    return { error: "بيانات الدخول غير صحيحة." };
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut();
    return { error: "تعذر تأكيد جلسة الدخول." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .eq("role", "ADMIN")
    .maybeSingle();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return { error: "هذا الحساب غير مخول لدخول الإدارة." };
  }

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

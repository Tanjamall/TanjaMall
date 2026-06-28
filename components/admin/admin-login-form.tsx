"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: AdminLoginState = {};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">تسجيل دخول الإدارة</CardTitle>
        <CardDescription>ادخل بحساب المدير المرتبط في Supabase.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-black" htmlFor="email">
              البريد الإلكتروني
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              dir="ltr"
              placeholder="admin@example.com"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-black" htmlFor="password">
              كلمة المرور
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              dir="ltr"
            />
          </div>

          {state.error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-bold text-destructive">
              {state.error}
            </p>
          ) : null}

          <Button type="submit" disabled={isPending}>
            {isPending ? "جار الدخول..." : "دخول"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

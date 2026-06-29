import type { Route } from "next";
import { redirect } from "next/navigation";

export default function AdminPreviewIndexPage() {
  redirect("/admin-preview/dashboard" as Route);
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { categoryFormSchema, categoryStatusSchema } from "@/lib/validators/catalog";

export type CategoryFormState = {
  status?: "success" | "error";
  message?: string;
};

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("duplicate key") || message.includes("categories_slug_key")) {
    return "هذا الرابط المختصر مستخدم من قبل.";
  }
  return "تعذر حفظ التصنيف. راجع البيانات وحاول مرة أخرى.";
}

export async function saveCategoryAction(
  _previousState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();

  const parsed = categoryFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "بيانات التصنيف غير صحيحة."
    };
  }

  const supabase = await createClient();
  const payload = {
    name: parsed.data.name,
    slug: parsed.data.slug,
    description: parsed.data.description,
    image_url: parsed.data.image_url,
    status: parsed.data.status,
    sort_order: parsed.data.sort_order
  };

  try {
    const { error } = parsed.data.id
      ? await supabase.from("categories").update(payload).eq("id", parsed.data.id)
      : await supabase.from("categories").insert(payload);

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin/categories");

    return {
      status: "success",
      message: "تم حفظ التصنيف."
    };
  } catch (error) {
    return {
      status: "error",
      message: errorMessage(error)
    };
  }
}

export async function updateCategoryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  const status = categoryStatusSchema.parse(formValue(formData, "status"));
  const supabase = await createClient();
  const { error } = await supabase.from("categories").update({ status }).eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
}

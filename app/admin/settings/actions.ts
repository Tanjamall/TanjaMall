"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { trackingSettingsSchema } from "@/lib/validators/tracking";

export type TrackingSettingsState = {
  status?: "success" | "error";
  message?: string;
};

function checkboxValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function updateTrackingSettings(
  _previousState: TrackingSettingsState,
  formData: FormData
): Promise<TrackingSettingsState> {
  await requireAdmin();

  const parsed = trackingSettingsSchema.safeParse({
    meta_pixel_enabled: checkboxValue(formData, "meta_pixel_enabled"),
    meta_pixel_id: formData.get("meta_pixel_id"),
    tiktok_pixel_enabled: checkboxValue(formData, "tiktok_pixel_enabled"),
    tiktok_pixel_id: formData.get("tiktok_pixel_id"),
    google_tag_manager_enabled: checkboxValue(formData, "google_tag_manager_enabled"),
    google_tag_manager_id: formData.get("google_tag_manager_id")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "إعدادات التتبع غير صحيحة."
    };
  }

  const supabase = await createClient();
  const { data: existingSettings, error: existingError } = await supabase
    .from("store_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (existingError) {
    return {
      status: "error",
      message: "تعذر تحميل إعدادات المتجر."
    };
  }

  const payload = parsed.data;
  const saveQuery = existingSettings?.id
    ? supabase.from("store_settings").update(payload).eq("id", existingSettings.id)
    : supabase.from("store_settings").insert({ store_name: "TanjaMall", ...payload });

  const { error: saveError } = await saveQuery;

  if (saveError) {
    return {
      status: "error",
      message: saveError.message.includes("column") || saveError.message.includes("schema")
        ? "لم يتم تطبيق تحديث قاعدة بيانات التتبع على Supabase بعد."
        : "تعذر حفظ إعدادات التتبع."
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");

  return {
    status: "success",
    message: "تم حفظ إعدادات التتبع."
  };
}

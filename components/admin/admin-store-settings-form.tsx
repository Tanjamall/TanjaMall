"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { Settings } from "lucide-react";
import { updateStoreSettings, type StoreSettingsState } from "@/app/admin/settings/actions";
import { AdminFormSection } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StoreSettings } from "@/lib/storefront/types";

type StoreSettingsFormValues = {
  store_name: string;
  store_phone: string;
  whatsapp_number: string;
  default_city: string;
  supported_cities: string;
  delivery_fee_tanger: string;
  free_delivery_threshold: string;
  announcement_text: string;
};

const initialState: StoreSettingsState = {};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs font-black text-destructive">{message}</p> : null;
}

export function AdminStoreSettingsForm({ settings }: { settings: StoreSettings }) {
  const [state, formAction, isPending] = useActionState(updateStoreSettings, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StoreSettingsFormValues>({
    defaultValues: {
      store_name: settings.store_name,
      store_phone: settings.store_phone ?? "",
      whatsapp_number: settings.whatsapp_number ?? "",
      default_city: settings.default_city,
      supported_cities: settings.supported_cities.join("\n"),
      delivery_fee_tanger: String(settings.delivery_fee_tanger ?? 0),
      free_delivery_threshold: settings.free_delivery_threshold === null ? "" : String(settings.free_delivery_threshold),
      announcement_text: settings.announcement_text ?? ""
    }
  });

  const submit = handleSubmit((values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.set(key, value));
    startTransition(() => formAction(formData));
  });

  const saveLabel = isPending ? "جار الحفظ..." : "حفظ الإعدادات";

  return (
    <form className="contents" noValidate onSubmit={submit}>
      <AdminFormSection title="المتجر" description="الاسم والهاتف ونص الإعلان." icon={Settings}>
        <div className="grid gap-4">
          <input type="hidden" {...register("whatsapp_number")} />
          <input type="hidden" {...register("default_city")} />
          <input type="hidden" {...register("supported_cities")} />
          <input type="hidden" {...register("delivery_fee_tanger")} />
          <input type="hidden" {...register("free_delivery_threshold")} />
          <div>
            <Input
              placeholder="اسم المتجر"
              {...register("store_name", { required: "اسم المتجر مطلوب.", maxLength: { value: 100, message: "اسم المتجر طويل جدا." } })}
            />
            <FieldError message={errors.store_name?.message} />
          </div>
          <div>
            <Input dir="ltr" placeholder="رقم الهاتف" {...register("store_phone")} />
            <FieldError message={errors.store_phone?.message} />
          </div>
          <div>
            <Input placeholder="نص الإعلان في الصفحة الرئيسية" {...register("announcement_text", { maxLength: 300 })} />
            <FieldError message={errors.announcement_text?.message} />
          </div>
          <Button disabled={isPending} type="submit">{saveLabel}</Button>
        </div>
      </AdminFormSection>

      {state.message ? (
        <p
          className={`xl:col-span-2 rounded-md border px-4 py-3 text-sm font-black ${
            state.status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle, Settings, Truck } from "lucide-react";
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

      <AdminFormSection title="واتساب" description="رقم تأكيد طلبات الدفع عند الاستلام." icon={MessageCircle}>
        <div className="grid gap-4">
          <div>
            <Input
              dir="ltr"
              inputMode="tel"
              placeholder="مثال: 212600000000"
              {...register("whatsapp_number", { required: "رقم واتساب مطلوب." })}
            />
            <FieldError message={errors.whatsapp_number?.message} />
          </div>
          <Button disabled={isPending} type="submit">{saveLabel}</Button>
        </div>
      </AdminFormSection>

      <AdminFormSection title="التوصيل" description="المدن المدعومة ورسوم التوصيل في MVP." icon={Truck}>
        <div className="grid gap-4">
          <div>
            <Input placeholder="المدينة الافتراضية" {...register("default_city", { required: "المدينة الافتراضية مطلوبة." })} />
            <FieldError message={errors.default_city?.message} />
          </div>
          <div>
            <textarea
              className="min-h-28 w-full rounded-md border border-input bg-card px-3 py-2 text-sm font-bold leading-7 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="مدينة واحدة في كل سطر"
              {...register("supported_cities", { required: "أضف مدينة مدعومة واحدة على الأقل." })}
            />
            <FieldError message={errors.supported_cities?.message} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input min="0" step="0.01" type="number" placeholder="رسوم التوصيل" {...register("delivery_fee_tanger", { required: true })} />
              <FieldError message={errors.delivery_fee_tanger?.message} />
            </div>
            <div>
              <Input min="0" step="0.01" type="number" placeholder="حد التوصيل المجاني" {...register("free_delivery_threshold")} />
              <FieldError message={errors.free_delivery_threshold?.message} />
            </div>
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

"use client";

import { useActionState } from "react";
import { BarChart3 } from "lucide-react";
import { updateTrackingSettings, type TrackingSettingsState } from "@/app/admin/settings/actions";
import { AdminFormSection } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StoreSettings } from "@/lib/storefront/types";

function TrackingProviderRow({
  enabledName,
  idName,
  label,
  description,
  placeholder,
  defaultEnabled,
  defaultValue,
  disabled = false
}: {
  enabledName: string;
  idName: string;
  label: string;
  description: string;
  placeholder: string;
  defaultEnabled: boolean;
  defaultValue: string | null;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-3 rounded-md border border-border bg-background p-4">
      <label className="flex items-start gap-3">
        <input
          className="mt-1 h-5 w-5 accent-primary"
          defaultChecked={defaultEnabled}
          disabled={disabled}
          name={enabledName}
          type="checkbox"
        />
        <span>
          <span className="block text-sm font-black">{label}</span>
          <span className="mt-1 block text-xs font-bold leading-6 text-muted-foreground">{description}</span>
        </span>
      </label>
      <Input
        defaultValue={defaultValue ?? ""}
        dir="ltr"
        disabled={disabled}
        name={idName}
        placeholder={placeholder}
      />
    </div>
  );
}

export function AdminTrackingSettingsForm({
  settings,
  preview = false
}: {
  settings: StoreSettings;
  preview?: boolean;
}) {
  const initialState: TrackingSettingsState = {};
  const [state, formAction, isPending] = useActionState(updateTrackingSettings, initialState);

  return (
    <AdminFormSection
      title="التتبع والإعلانات"
      description="أضف معرفات البكسل فقط. لا تلصق كود JavaScript كامل هنا."
      icon={BarChart3}
    >
      <form action={preview ? undefined : formAction} className="grid gap-4">
        <TrackingProviderRow
          defaultEnabled={settings.meta_pixel_enabled}
          defaultValue={settings.meta_pixel_id}
          description="Meta Pixel يرسل PageView على صفحات المتجر العامة، ويتجاهل صفحات الإدارة."
          disabled={preview}
          enabledName="meta_pixel_enabled"
          idName="meta_pixel_id"
          label="Meta / Facebook Pixel"
          placeholder="مثال: 123456789012345"
        />

        <TrackingProviderRow
          defaultEnabled={settings.tiktok_pixel_enabled}
          defaultValue={settings.tiktok_pixel_id}
          description="TikTok Pixel يرسل PageView على صفحات المتجر العامة عند تفعيله."
          disabled={preview}
          enabledName="tiktok_pixel_enabled"
          idName="tiktok_pixel_id"
          label="TikTok Pixel"
          placeholder="مثال: C123ABC456DEF789"
        />

        <TrackingProviderRow
          defaultEnabled={settings.google_tag_manager_enabled}
          defaultValue={settings.google_tag_manager_id}
          description="Google Tag Manager يمكنه حمل وسوم تتبع أخرى بدون تعديل الكود."
          disabled={preview}
          enabledName="google_tag_manager_enabled"
          idName="google_tag_manager_id"
          label="Google Tag Manager"
          placeholder="مثال: GTM-XXXXXXX"
        />

        {state.message ? (
          <p className={state.status === "success" ? "text-sm font-black text-emerald-700" : "text-sm font-black text-destructive"}>
            {state.message}
          </p>
        ) : null}

        <Button disabled={preview || isPending} type="submit">
          {preview ? "معاينة فقط" : isPending ? "جار الحفظ..." : "حفظ إعدادات التتبع"}
        </Button>
      </form>
    </AdminFormSection>
  );
}

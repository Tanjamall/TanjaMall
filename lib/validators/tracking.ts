import { z } from "zod";

function optionalTrimmedString(maxLength: number) {
  return z.preprocess((value) => {
    const text = typeof value === "string" ? value.trim() : "";
    return text.length ? text : null;
  }, z.string().max(maxLength).nullable());
}

export const trackingSettingsSchema = z
  .object({
    meta_pixel_enabled: z.boolean(),
    meta_pixel_id: optionalTrimmedString(40).refine((value) => value === null || /^[0-9]{5,40}$/.test(value), {
      message: "Meta Pixel ID must contain numbers only."
    }),
    tiktok_pixel_enabled: z.boolean(),
    tiktok_pixel_id: optionalTrimmedString(80).refine((value) => value === null || /^[A-Za-z0-9_-]{4,80}$/.test(value), {
      message: "TikTok Pixel ID can contain letters, numbers, underscores, and dashes only."
    }),
    google_tag_manager_enabled: z.boolean(),
    google_tag_manager_id: optionalTrimmedString(32).refine((value) => value === null || /^GTM-[A-Za-z0-9]+$/.test(value), {
      message: "Google Tag Manager ID must look like GTM-XXXXXXX."
    })
  })
  .superRefine((value, ctx) => {
    if (value.meta_pixel_enabled && !value.meta_pixel_id) {
      ctx.addIssue({ code: "custom", path: ["meta_pixel_id"], message: "Meta Pixel ID is required when enabled." });
    }
    if (value.tiktok_pixel_enabled && !value.tiktok_pixel_id) {
      ctx.addIssue({ code: "custom", path: ["tiktok_pixel_id"], message: "TikTok Pixel ID is required when enabled." });
    }
    if (value.google_tag_manager_enabled && !value.google_tag_manager_id) {
      ctx.addIssue({ code: "custom", path: ["google_tag_manager_id"], message: "Google Tag Manager ID is required when enabled." });
    }
  });

export type TrackingSettingsInput = z.infer<typeof trackingSettingsSchema>;

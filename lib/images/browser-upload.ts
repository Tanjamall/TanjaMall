"use client";

import { createClient } from "@/lib/supabase/client";
import { imageUploadRules } from "@/lib/images/r2";

export type ImageUploadPurpose = "main" | "gallery" | "detail" | "variant" | "bundle" | "category";

type UploadResult = {
  key: string;
  url: string;
  size: number;
};

function getUploadEndpoint() {
  return process.env.NEXT_PUBLIC_IMAGE_UPLOAD_ENDPOINT?.replace(/\/+$/, "") ?? "";
}

async function imageBitmapFromFile(file: File) {
  if ("createImageBitmap" in window) {
    return createImageBitmap(file);
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("تعذر قراءة الصورة."));
  });

  return image;
}

async function canvasToWebpBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("تعذر ضغط الصورة إلى WebP."));
          return;
        }
        resolve(blob);
      },
      imageUploadRules.outputMimeType,
      imageUploadRules.webpQuality
    );
  });
}

export async function compressImageToWebp(file: File, maxWidth: number) {
  if (!file.type.startsWith("image/")) {
    throw new Error("الملف المختار ليس صورة.");
  }
  if (file.size > imageUploadRules.maxInputBytes) {
    throw new Error("حجم الصورة أكبر من الحد المسموح.");
  }

  const image = await imageBitmapFromFile(file);
  const sourceWidth = image.width;
  const sourceHeight = image.height;
  const scale = Math.min(1, maxWidth / sourceWidth);
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);

  if ("close" in image && typeof image.close === "function") {
    image.close();
  }

  const blob = await canvasToWebpBlob(canvas);
  const fileName = `${file.name.replace(/\.[^.]+$/, "") || "image"}.webp`;

  return new File([blob], fileName, { type: imageUploadRules.outputMimeType });
}

export async function uploadAdminImage({
  file,
  productId,
  purpose
}: {
  file: File;
  productId: string;
  purpose: ImageUploadPurpose;
}): Promise<UploadResult> {
  const endpoint = getUploadEndpoint();
  if (!endpoint) {
    throw new Error("رابط رفع الصور غير مضبوط بعد.");
  }

  const supabase = createClient();
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error || !session?.access_token) {
    throw new Error("يجب تسجيل الدخول كمسؤول قبل رفع الصور.");
  }

  const formData = new FormData();
  formData.set("file", file);
  formData.set("productId", productId || "unassigned");
  formData.set("purpose", purpose);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${session.access_token}`
    },
    body: formData
  });

  const payload = await response.json().catch(() => null) as Partial<UploadResult> & { error?: string } | null;

  if (!response.ok || !payload?.url || !payload.key) {
    throw new Error(payload?.error ?? "تعذر رفع الصورة.");
  }

  return {
    key: payload.key,
    url: payload.url,
    size: payload.size ?? file.size
  };
}

"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compressImageToWebp, uploadAdminImage, type ImageUploadPurpose } from "@/lib/images/browser-upload";
import { imageUploadRules } from "@/lib/images/r2";

export function AdminImageUploadButton({
  productId,
  purpose,
  onUploaded,
  label = "رفع صورة",
  multiple = false,
  disabled = false,
  disabledMessage = "احفظ السجل أولا قبل رفع الصورة."
}: {
  productId: string;
  purpose: ImageUploadPurpose;
  onUploaded: (urls: string[]) => void;
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    const selectedFiles = Array.from(files ?? []);
    if (!selectedFiles.length) return;

    setIsUploading(true);
    setStatus("جار ضغط الصورة...");
    const uploadedUrls: string[] = [];

    try {
      const maxWidth = purpose === "detail" ? imageUploadRules.detailMaxWidth : imageUploadRules.galleryMaxWidth;

      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        setStatus(`جار تجهيز الصورة ${index + 1} من ${selectedFiles.length}...`);
        const webpFile = await compressImageToWebp(file, maxWidth);
        setStatus(`جار رفع الصورة ${index + 1} من ${selectedFiles.length} إلى R2...`);
        const result = await uploadAdminImage({ file: webpFile, productId, purpose });
        uploadedUrls.push(result.url);
      }

      onUploaded(uploadedUrls);
      setStatus(`تم رفع ${uploadedUrls.length} ${uploadedUrls.length === 1 ? "صورة" : "صور"}.`);
    } catch (error) {
      if (uploadedUrls.length) onUploaded(uploadedUrls);
      setStatus(error instanceof Error ? error.message : "تعذر رفع الصورة.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="grid gap-2">
      <input
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(event) => void handleFiles(event.currentTarget.files)}
        multiple={multiple}
        type="file"
      />
      <Button disabled={disabled || isUploading} onClick={() => inputRef.current?.click()} type="button" variant="secondary">
        <Upload className="h-4 w-4" aria-hidden="true" />
        {isUploading ? "جار الرفع..." : label}
      </Button>
      {disabled ? <p className="text-xs font-black text-muted-foreground">{disabledMessage}</p> : null}
      {status ? (
        <p aria-live="polite" className={`text-xs font-black ${status.startsWith("فشل") || status.startsWith("تعذر") || status.startsWith("يجب") ? "text-destructive" : "text-muted-foreground"}`}>
          {status}
        </p>
      ) : null}
    </div>
  );
}

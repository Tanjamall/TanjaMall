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
  label = "رفع صورة"
}: {
  productId: string;
  purpose: ImageUploadPurpose;
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatus("جار ضغط الصورة...");

    try {
      const maxWidth = purpose === "detail" ? imageUploadRules.detailMaxWidth : imageUploadRules.galleryMaxWidth;
      const webpFile = await compressImageToWebp(file, maxWidth);
      setStatus("جار الرفع إلى R2...");
      const result = await uploadAdminImage({ file: webpFile, productId, purpose });
      onUploaded(result.url);
      setStatus("تم رفع الصورة.");
    } catch (error) {
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
        type="file"
      />
      <Button disabled={isUploading} onClick={() => inputRef.current?.click()} type="button" variant="secondary">
        <Upload className="h-4 w-4" aria-hidden="true" />
        {isUploading ? "جار الرفع..." : label}
      </Button>
      {status ? <p className="text-xs font-black text-muted-foreground">{status}</p> : null}
    </div>
  );
}

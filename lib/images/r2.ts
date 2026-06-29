const DEFAULT_PRODUCT_IMAGE_PREFIX = "products";

export const imageUploadRules = {
  maxInputBytes: 8 * 1024 * 1024,
  galleryMaxWidth: 1200,
  detailMaxWidth: 1400,
  webpQuality: 0.82,
  outputMimeType: "image/webp"
} as const;

export function getR2PublicBaseUrl() {
  return process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.replace(/\/+$/, "") ?? "";
}

export function buildR2PublicUrl(key: string) {
  const baseUrl = getR2PublicBaseUrl();
  const normalizedKey = key.replace(/^\/+/, "");

  return baseUrl ? `${baseUrl}/${normalizedKey}` : normalizedKey;
}

export function createProductImageKey({
  productId,
  fileName,
  purpose
}: {
  productId: string;
  fileName: string;
  purpose: "main" | "gallery" | "detail" | "variant" | "bundle";
}) {
  const safeProductId = productId.replace(/[^a-zA-Z0-9_-]/g, "-");
  const baseName = fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  const finalName = baseName || "image";

  return `${DEFAULT_PRODUCT_IMAGE_PREFIX}/${safeProductId}/${purpose}/${Date.now()}-${finalName}.webp`;
}


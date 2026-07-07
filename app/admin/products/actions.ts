"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { productFormSchema, productStatusSchema } from "@/lib/validators/catalog";

export type ProductEditorState = {
  status?: "success" | "error";
  message?: string;
};

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function textLines(value: string | null) {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseEnabled(value: string | undefined) {
  return value === undefined ? true : !["0", "false", "disabled", "off", "hidden"].includes(value.trim().toLowerCase());
}

async function syncImageUrls({
  supabase,
  table,
  productId,
  urls,
  altText
}: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  table: "product_images" | "product_detail_images";
  productId: string;
  urls: string[];
  altText: string;
}) {
  const { error: deleteError } = await supabase.from(table).delete().eq("product_id", productId);
  if (deleteError) throw deleteError;

  if (!urls.length) return;

  const { error } = await supabase.from(table).insert(
    urls.map((url, index) => ({
      product_id: productId,
      image_url: url,
      alt_text: altText,
      sort_order: index
    }))
  );

  if (error) throw error;
}

async function syncVariantGroups({
  supabase,
  productId,
  text
}: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  productId: string;
  text: string | null;
}) {
  const { error: deleteError } = await supabase.from("product_variant_groups").delete().eq("product_id", productId);
  if (deleteError) throw deleteError;

  const groups = textLines(text).map((line, index) => {
    const [namePart, optionsPart = ""] = line.split(":");
    const name = namePart.trim();
    return {
      name,
      slug: slugify(name) || `group-${index + 1}`,
      sort_order: index,
      options: optionsPart
        .split(",")
        .map((option) => option.trim())
        .filter(Boolean)
    };
  }).filter((group) => group.name);

  for (const group of groups) {
    const { data, error } = await supabase
      .from("product_variant_groups")
      .insert({
        product_id: productId,
        name: group.name,
        slug: group.slug,
        display_type: "BUTTON",
        sort_order: group.sort_order,
        is_enabled: true,
        is_required: true
      })
      .select("id")
      .single();

    if (error) throw error;
    if (!group.options.length) continue;

    const { error: optionsError } = await supabase.from("product_variant_options").insert(
      group.options.map((option, index) => ({
        variant_group_id: data.id,
        label: option,
        value: slugify(option) || option,
        sort_order: index,
        is_enabled: true,
        is_default: index === 0
      }))
    );

    if (optionsError) throw optionsError;
  }
}

async function syncOffers({
  supabase,
  productId,
  text
}: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  productId: string;
  text: string | null;
}) {
  const { error: deleteError } = await supabase.from("product_offers").delete().eq("product_id", productId);
  if (deleteError) throw deleteError;

  const rows = textLines(text).map((line, index) => {
    const [name = "", quantity = "1", price = "0", compareAt = "", badge = "", enabled] = line.split("|").map((part) => part.trim());
    return {
      product_id: productId,
      name,
      quantity: Math.max(1, Number(quantity) || 1),
      price: Number(price) || 0,
      compare_at_price: compareAt ? Number(compareAt) || null : null,
      badge_text: badge || null,
      is_enabled: parseEnabled(enabled),
      is_default: index === 0,
      sort_order: index
    };
  }).filter((row) => row.name && row.price > 0);

  if (!rows.length) return;
  const { error } = await supabase.from("product_offers").insert(rows);
  if (error) throw error;
}

async function syncBundles({
  supabase,
  productId,
  text
}: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  productId: string;
  text: string | null;
}) {
  const { error: deleteError } = await supabase.from("product_bundles").delete().eq("product_id", productId);
  if (deleteError) throw deleteError;

  const rows = textLines(text).map((line, index) => {
    const [name = "", price = "0", compareAt = "", badge = "", imageUrl = "", enabled] = line.split("|").map((part) => part.trim());
    return {
      product_id: productId,
      name,
      price: Number(price) || 0,
      compare_at_price: compareAt ? Number(compareAt) || null : null,
      badge_text: badge || null,
      image_url: imageUrl || null,
      is_enabled: parseEnabled(enabled),
      is_default: index === 0,
      sort_order: index
    };
  }).filter((row) => row.name && row.price > 0);

  if (!rows.length) return;
  const { error } = await supabase.from("product_bundles").insert(rows);
  if (error) throw error;
}

function productPayload(parsed: ReturnType<typeof productFormSchema.parse>) {
  return {
    category_id: parsed.category_id,
    name: parsed.name,
    slug: parsed.slug,
    short_description: parsed.short_description,
    full_description: parsed.full_description,
    price: parsed.price,
    compare_at_price: parsed.compare_at_price,
    cost_price: parsed.cost_price,
    sku: parsed.sku,
    stock: parsed.stock,
    status: parsed.status,
    main_image_url: parsed.main_image_url,
    is_featured: parsed.is_featured,
    is_best_seller: parsed.is_best_seller,
    internal_notes: parsed.internal_notes,
    variants_enabled: parsed.variants_enabled,
    offers_enabled: parsed.offers_enabled,
    bundles_enabled: parsed.bundles_enabled,
    allow_variant_offer_combo: parsed.allow_variant_offer_combo,
    allow_variant_bundle_combo: parsed.allow_variant_bundle_combo,
    allow_offer_bundle_combo: parsed.allow_offer_bundle_combo,
    allow_variant_offer_bundle_combo: parsed.allow_variant_offer_bundle_combo
  };
}

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("duplicate key") || message.includes("products_slug_key")) {
    return "هذا الرابط المختصر مستخدم من قبل.";
  }
  return "تعذر حفظ المنتج. راجع البيانات وحاول مرة أخرى.";
}

export async function saveProductAction(
  _previousState: ProductEditorState,
  formData: FormData
): Promise<ProductEditorState> {
  await requireAdmin();

  const intent = formValue(formData, "intent");
  if (intent === "publish") formData.set("status", "PUBLISHED");
  if (intent === "draft") formData.set("status", "DRAFT");

  const parsed = productFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "بيانات المنتج غير صحيحة."
    };
  }

  const supabase = await createClient();
  const payload = productPayload(parsed.data);
  const existingId = parsed.data.id;
  let savedProductId: string | null = null;

  try {
    const { data: product, error } = existingId
      ? await supabase.from("products").update(payload).eq("id", existingId).select("id").single()
      : await supabase.from("products").insert(payload).select("id").single();

    if (error) throw error;

    const productId = String(product.id);
    savedProductId = productId;
    await syncImageUrls({
      supabase,
      table: "product_images",
      productId,
      urls: textLines(parsed.data.gallery_image_urls),
      altText: parsed.data.name
    });
    await syncImageUrls({
      supabase,
      table: "product_detail_images",
      productId,
      urls: textLines(parsed.data.detail_image_urls),
      altText: parsed.data.name
    });
    await syncVariantGroups({ supabase, productId, text: parsed.data.variants_enabled ? parsed.data.variant_groups_text : null });
    await syncOffers({ supabase, productId, text: parsed.data.offers_enabled ? parsed.data.offers_text : null });
    await syncBundles({ supabase, productId, text: parsed.data.bundles_enabled ? parsed.data.bundles_text : null });

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath(`/products/${parsed.data.slug}`);

  } catch (error) {
    return {
      status: "error",
      message: errorMessage(error)
    };
  }

  if (!existingId && savedProductId) {
    redirect(`/admin/products/${savedProductId}/edit`);
  }

  return {
    status: "success",
    message: "تم حفظ المنتج."
  };
}

export async function updateProductStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formValue(formData, "id");
  const status = productStatusSchema.parse(formValue(formData, "status"));
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ status }).eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

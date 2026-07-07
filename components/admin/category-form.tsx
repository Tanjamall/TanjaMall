"use client";

import { useActionState } from "react";
import type { ReactNode, TextareaHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { FolderPlus } from "lucide-react";
import { saveCategoryAction, type CategoryFormState } from "@/app/admin/categories/actions";
import { AdminFormSection } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AdminCategory } from "@/lib/admin/catalog";
import type { CategoryFormInput } from "@/lib/validators/catalog";

function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-24 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring ${props.className ?? ""}`}
    />
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      {children}
    </label>
  );
}

export function CategoryForm({ category }: { category?: AdminCategory }) {
  const [state, formAction, isPending] = useActionState<CategoryFormState, FormData>(saveCategoryAction, {});
  const { register } = useForm<CategoryFormInput>({
    defaultValues: {
      id: category?.id ?? null,
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      image_url: category?.image_url ?? "",
      status: category?.status ?? "ACTIVE",
      sort_order: category?.sort_order ?? 0
    }
  });

  return (
    <AdminFormSection
      title={category ? "تعديل التصنيف" : "تصنيف جديد"}
      description="التصنيفات النشطة فقط تظهر للعميل في الواجهة وشريط التصنيفات."
      icon={FolderPlus}
    >
      <form action={formAction} className="grid gap-4">
        <input type="hidden" {...register("id")} value={category?.id ?? ""} />
        <Field label="اسم التصنيف">
          <Input {...register("name")} placeholder="اسم التصنيف" />
        </Field>
        <Field label="الرابط المختصر">
          <Input {...register("slug")} dir="ltr" placeholder="category-slug" />
        </Field>
        <Field label="الوصف">
          <Textarea {...register("description")} placeholder="وصف مختصر للتصنيف" />
        </Field>
        <Field label="رابط الصورة">
          <Input {...register("image_url")} dir="ltr" placeholder="https://..." />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="الحالة">
            <select
              {...register("status")}
              className="h-11 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring"
              defaultValue={category?.status ?? "ACTIVE"}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="HIDDEN">HIDDEN</option>
            </select>
          </Field>
          <Field label="ترتيب العرض">
            <Input {...register("sort_order")} inputMode="numeric" />
          </Field>
        </div>
        {state.message ? (
          <p className={state.status === "success" ? "text-sm font-black text-emerald-700" : "text-sm font-black text-destructive"}>
            {state.message}
          </p>
        ) : null}
        <Button disabled={isPending} type="submit">
          {isPending ? "جار الحفظ..." : category ? "حفظ التعديل" : "حفظ التصنيف"}
        </Button>
      </form>
    </AdminFormSection>
  );
}

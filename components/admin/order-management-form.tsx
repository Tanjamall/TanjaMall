"use client";

import { useActionState } from "react";
import { MessageCircle, Save } from "lucide-react";
import { saveOrderNotesAction, updateOrderStatusAction, type OrderActionState } from "@/app/admin/orders/actions";
import { Button } from "@/components/ui/button";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders";

const initialState: OrderActionState = {};

const statusLabels: Record<OrderStatus, string> = {
  NEW: "جديد",
  CONTACTED: "تم التواصل",
  CONFIRMED: "تأكيد الطلب",
  PREPARING: "قيد التجهيز",
  OUT_FOR_DELIVERY: "خرج للتوصيل",
  DELIVERED: "تم التوصيل",
  CANCELLED: "إلغاء الطلب",
  RETURNED: "مرتجع"
};

function ActionMessage({ state }: { state: OrderActionState }) {
  if (!state.message) return null;
  return (
    <p className={`text-xs font-black ${state.status === "error" ? "text-red-700" : "text-emerald-700"}`} role="status">
      {state.message}
    </p>
  );
}

export function OrderManagementForm({
  orderId,
  internalNotes
}: {
  orderId: string;
  internalNotes: string | null;
}) {
  const [notesState, notesAction, notesPending] = useActionState(saveOrderNotesAction, initialState);

  return (
    <div className="grid gap-6">
      <form action={notesAction} className="grid gap-3">
        <input name="order_id" type="hidden" value={orderId} />
        <label className="text-sm font-black" htmlFor="internal_notes">ملاحظات داخلية</label>
        <textarea
          className="min-h-28 rounded-md border border-input bg-card px-3 py-2 text-sm font-bold leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          defaultValue={internalNotes ?? ""}
          id="internal_notes"
          maxLength={4000}
          name="internal_notes"
          placeholder="تظهر لفريق الإدارة فقط"
        />
        <Button disabled={notesPending} type="submit">
          <Save className="h-4 w-4" aria-hidden="true" />
          {notesPending ? "جار الحفظ..." : "حفظ الملاحظات"}
        </Button>
        <ActionMessage state={notesState} />
      </form>

      <p className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        رسالة واتساب تستخدم بيانات الطلب والأسعار المحفوظة وقت الشراء.
      </p>
    </div>
  );
}

export function OrderStatusSelect({
  orderId,
  currentStatus
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const [state, action, pending] = useActionState(updateOrderStatusAction, initialState);

  return (
    <form action={action} className="grid" aria-label="تحديث حالة الطلب">
      <input name="order_id" type="hidden" value={orderId} />
      <select
        aria-label="حالة الطلب"
        className="min-h-9 rounded-md border border-input bg-card px-3 text-sm font-black outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
        defaultValue={currentStatus}
        disabled={pending}
        name="status"
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        {ORDER_STATUSES.map((status) => (
          <option key={status} value={status}>{statusLabels[status]}</option>
        ))}
      </select>
      {state.message ? <span className="sr-only" role="status">{state.message}</span> : null}
    </form>
  );
}

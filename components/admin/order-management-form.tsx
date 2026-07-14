"use client";

import { useActionState } from "react";
import { MessageCircle, Save } from "lucide-react";
import { saveOrderNotesAction, updateOrderStatusAction, type OrderActionState } from "@/app/admin/orders/actions";
import { StatusBadge } from "@/components/admin/admin-ui";
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
  currentStatus,
  internalNotes
}: {
  orderId: string;
  currentStatus: OrderStatus;
  internalNotes: string | null;
}) {
  const [statusState, statusAction, statusPending] = useActionState(updateOrderStatusAction, initialState);
  const [notesState, notesAction, notesPending] = useActionState(saveOrderNotesAction, initialState);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-black">الحالة الحالية</span>
          <StatusBadge status={currentStatus} />
        </div>
        <form action={statusAction} className="grid grid-cols-2 gap-2">
          <input name="order_id" type="hidden" value={orderId} />
          {ORDER_STATUSES.map((status) => (
            <Button
              disabled={statusPending || status === currentStatus}
              key={status}
              name="status"
              size="sm"
              type="submit"
              value={status}
              variant={status === currentStatus ? "default" : "secondary"}
            >
              {statusLabels[status]}
            </Button>
          ))}
        </form>
        <ActionMessage state={statusState} />
      </div>

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

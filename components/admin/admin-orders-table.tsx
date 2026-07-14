"use client";

import Link from "next/link";
import type { Route } from "next";
import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Eye, Search } from "lucide-react";
import { StatusBadge, WhatsAppButton } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ORDER_STATUSES, formatOrderDate, formatOrderMad, type AdminOrderSummary, type OrderStatus } from "@/lib/orders";

export type AdminOrderTableRow = AdminOrderSummary & {
  whatsapp_url: string;
};

const statusLabels: Record<OrderStatus, string> = {
  NEW: "جديد",
  CONTACTED: "تم التواصل",
  CONFIRMED: "مؤكد",
  PREPARING: "قيد التجهيز",
  OUT_FOR_DELIVERY: "خرج للتوصيل",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغي",
  RETURNED: "مرتجع"
};

const columns: ColumnDef<AdminOrderTableRow>[] = [
  {
    accessorKey: "order_number",
    header: "رقم الطلب",
    cell: ({ row }) => <span dir="ltr" className="font-black">{row.original.order_number}</span>
  },
  { accessorKey: "customer_name", header: "العميل" },
  {
    accessorKey: "customer_phone",
    header: "الهاتف",
    cell: ({ row }) => <span dir="ltr">{row.original.customer_phone}</span>
  },
  {
    id: "location",
    header: "المدينة / المنطقة",
    cell: ({ row }) => [row.original.city, row.original.area].filter(Boolean).join(" / ")
  },
  {
    accessorKey: "total",
    header: "المجموع",
    cell: ({ row }) => <span className="whitespace-nowrap font-black text-accent-foreground">{formatOrderMad(row.original.total)}</span>
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => <StatusBadge status={row.original.status} />
  },
  {
    accessorKey: "created_at",
    header: "تاريخ الإنشاء",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatOrderDate(row.original.created_at)}</span>
  },
  {
    id: "whatsapp",
    header: "واتساب",
    cell: ({ row }) => <WhatsAppButton href={row.original.whatsapp_url} label="تأكيد" />
  },
  {
    id: "actions",
    header: "إجراءات",
    cell: ({ row }) => (
      <Button asChild variant="secondary" size="sm">
        <Link href={`/admin/orders/${row.original.id}` as Route}>
          <Eye className="h-4 w-4" aria-hidden="true" />
          فتح
        </Link>
      </Button>
    )
  }
];

export function AdminOrdersTable({ rows }: { rows: AdminOrderTableRow[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | OrderStatus>("ALL");

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((order) => {
      const matchesStatus = status === "ALL" || order.status === status;
      const matchesQuery = !normalizedQuery || [order.order_number, order.customer_name, order.customer_phone]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    });
  }, [query, rows, status]);

  const table = useReactTable({
    data: filteredRows,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-64 flex-1">
          <Search className="absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            className="pr-9"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="رقم الطلب أو اسم العميل أو الهاتف..."
            value={query}
          />
        </div>
        <select
          aria-label="تصفية الطلبات حسب الحالة"
          className="h-11 min-w-48 rounded-md border border-input bg-card px-3 text-sm font-black outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onChange={(event) => setStatus(event.target.value as "ALL" | OrderStatus)}
          value={status}
        >
          <option value="ALL">كل الحالات</option>
          {ORDER_STATUSES.map((orderStatus) => (
            <option key={orderStatus} value={orderStatus}>{statusLabels[orderStatus]}</option>
          ))}
        </select>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          )) : (
            <TableRow>
              <TableCell className="py-12 text-center text-muted-foreground" colSpan={columns.length}>
                لا توجد طلبات مطابقة.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <p className="text-xs font-bold text-muted-foreground">النتائج: {filteredRows.length} من {rows.length}</p>
    </div>
  );
}

import Link from "next/link";
import type { Route } from "next";
import type { ComponentType, ReactNode } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  eyebrow = "MagicPath admin design component",
  children
}: {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <header className="rounded-xl border border-[#d8e2dc] bg-white p-4 shadow-sm sm:p-6">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_410px] md:items-end md:gap-6" style={{ direction: "ltr" }}>
        <div className="flex flex-wrap items-center gap-2 max-md:order-2" dir="ltr">
          {children}
        </div>
        <div className="text-right" dir="rtl">
          <p className="text-sm font-black text-accent-foreground">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-black text-foreground sm:text-3xl md:mt-2 md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm font-bold leading-7 text-muted-foreground sm:mt-4 sm:text-base sm:leading-8">{description}</p>
        </div>
      </div>
    </header>
  );
}

export function AdminStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "default"
}: {
  title: string;
  value: string;
  description: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  tone?: "default" | "orange" | "green" | "red";
}) {
  const toneClass = {
    default: "bg-secondary text-foreground",
    orange: "bg-accent text-accent-foreground",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700"
  }[tone];

  return (
    <Card>
      <CardHeader className="flex min-h-[88px] items-start justify-between gap-2 p-2.5 sm:min-h-[118px] sm:gap-3 sm:p-4" style={{ direction: "ltr" }}>
        <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-md sm:h-9 sm:w-9", toneClass)}>
          <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
        </div>
        <div className="min-w-0 text-right" dir="rtl">
          <CardDescription className="text-[11px] leading-4 sm:text-xs">{title}</CardDescription>
          <CardTitle className="mt-1 text-lg leading-tight sm:text-xl">{value}</CardTitle>
          <p className="mt-1 hidden text-[11px] font-black leading-4 text-muted-foreground sm:block">{description}</p>
        </div>
      </CardHeader>
    </Card>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();
  const className =
    normalized === "PUBLISHED" || normalized === "ACTIVE" || normalized === "CONFIRMED" || normalized === "DELIVERED"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : normalized === "DRAFT" || normalized === "NEW"
        ? "border-orange-200 bg-orange-50 text-orange-700"
        : normalized === "ARCHIVED" || normalized === "HIDDEN" || normalized === "CANCELLED" || normalized === "RETURNED"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-border bg-secondary text-secondary-foreground";

  return (
    <Badge variant="outline" className={className}>
      {status}
    </Badge>
  );
}

export function AdminDataTable({
  columns,
  rows,
  emptyText = "لا توجد بيانات بعد."
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
  emptyText?: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length ? (
          rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
              {emptyText}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export function AdminFormSection({
  title,
  description,
  children,
  icon: Icon
}: {
  title: string;
  description: string;
  children: ReactNode;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}) {
  return (
    <Card>
      <CardHeader className="border-b border-border">
        <div className="flex items-start gap-3">
          {Icon ? (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          ) : null}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">{children}</CardContent>
    </Card>
  );
}

export function ConfirmActionDialog({ label = "تأكيد الإجراء" }: { label?: string }) {
  return (
    <Button type="button" variant="secondary" size="sm">
      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}

export function WhatsAppButton({ href, label = "واتساب" }: { href: string; label?: string }) {
  return (
    <Button asChild className="bg-[#25d366] text-white hover:brightness-95" size="sm">
      <a href={href} target="_blank" rel="noreferrer">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}

export function AdminLinkButton({ href, children }: { href: Route; children: ReactNode }) {
  return (
    <Button asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
}

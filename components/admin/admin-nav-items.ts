import {
  Boxes,
  ClipboardList,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Settings,
  type LucideIcon
} from "lucide-react";

export type AdminNavItem = {
  id: string;
  path: string;
  label: string;
  mobileLabel?: string;
  icon: LucideIcon;
  showInDock?: boolean;
  canonical?: boolean;
};

export const adminNavItems: AdminNavItem[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    label: "لوحة التحكم",
    mobileLabel: "الرئيسية",
    icon: LayoutDashboard,
    showInDock: true,
    canonical: true
  },
  {
    id: "orders",
    path: "/orders",
    label: "الطلبات",
    icon: ClipboardList,
    showInDock: true,
    canonical: true
  },
  {
    id: "products",
    path: "/products",
    label: "المنتجات",
    icon: Boxes,
    showInDock: true,
    canonical: true
  },
  {
    id: "categories",
    path: "/categories",
    label: "التصنيفات",
    icon: FolderTree,
    showInDock: true,
    canonical: true
  },
  {
    id: "media",
    path: "/settings",
    label: "الوسائط",
    icon: ImageIcon
  },
  {
    id: "whatsapp",
    path: "/orders",
    label: "واتساب",
    icon: MessageCircle
  },
  {
    id: "settings",
    path: "/settings",
    label: "الإعدادات",
    icon: Settings,
    showInDock: true,
    canonical: true
  }
];

export function isAdminNavItemActive(pathname: string, href: string, item: AdminNavItem) {
  if (!item.canonical) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

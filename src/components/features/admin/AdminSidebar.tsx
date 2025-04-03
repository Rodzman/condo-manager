"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building,
  Calendar,
  CreditCard,
  Home,
  Key,
  LayoutDashboard,
  PieChart,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";

interface AdminNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const adminNavItems: AdminNavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Units & Properties",
    href: "/admin/units",
    icon: <Building className="h-5 w-5" />,
  },
  {
    title: "Access Control",
    href: "/admin/access",
    icon: <Key className="h-5 w-5" />,
  },
  {
    title: "Invoicing",
    href: "/admin/invoices",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Reservations",
    href: "/admin/reservations",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: <PieChart className="h-5 w-5" />,
  },
  {
    title: "Security",
    href: "/admin/security",
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-muted/40 flex w-64 flex-col border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5" />
          <span>Reserva Sapetinga</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="space-y-1">
          {adminNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "hover:bg-muted flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          Administrator Mode
        </div>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Bell,
  Calendar,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  Users,
  HelpCircle,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/resident", icon: Home },
  { name: "Avisos", href: "/resident/notices", icon: Bell },
  { name: "Reservas", href: "/resident/reservations", icon: Calendar },
  { name: "Documentos", href: "/resident/documents", icon: FileText },
  { name: "Financeiro", href: "/resident/financial", icon: CreditCard },
  { name: "Chamados", href: "/resident/support", icon: MessageSquare },
  { name: "Vizinhos", href: "/resident/neighbors", icon: Users },
  { name: "Configurações", href: "/resident/settings", icon: Settings },
  { name: "Ajuda", href: "/resident/help", icon: HelpCircle },
];

export default function ResidentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-16 bottom-0 left-0 z-40 hidden w-64 border-r border-gray-200 bg-white md:block">
      <div className="flex h-full flex-col overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-dark-green text-white"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700",
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-4 py-6">
          <div className="bg-light-cream rounded-md p-4">
            <h3 className="text-dark-green font-medium">Precisa de ajuda?</h3>
            <p className="mt-1 text-sm text-gray-600">
              Entre em contato com a administração do condomínio.
            </p>
            <Link
              href="/resident/support"
              className="text-dark-green mt-3 inline-flex items-center text-sm font-medium hover:underline"
            >
              Abrir chamado
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

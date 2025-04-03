"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui";
import { User, LogOut, Settings, ShieldUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES } from "@/constants/roles";
import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/units", label: "Unidades" },
  { href: "/communication", label: "Comunicação" },
  { href: "/finances", label: "Financeiro" },
  { href: "/reservations", label: "Reservas" },
];

export default function Header() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === ROLES.ADMIN;

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/dashboard" className="text-2xl font-bold">
          CondoManager
        </Link>

        <ul className="hidden space-x-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-primary-foreground/80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-9 rounded-full px-3"
                >
                  <div className="flex items-center gap-2">
                    <span>{session.user?.name}</span>
                    <div className="bg-primary-foreground text-primary flex h-7 w-7 items-center justify-center rounded-full">
                      {session.user?.name?.charAt(0) || (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem>
                    <ShieldUser className="mr-2 h-4 w-4" />
                    <Link href="/admin">Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button variant="secondary">Entrar</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

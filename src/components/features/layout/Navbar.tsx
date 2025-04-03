"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
// import { signOut } from "@/auth";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, User, LogOut, Settings } from "lucide-react";
import { ROLES } from "@/constants/roles";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = session?.user?.role === ROLES.ADMIN;
  console.log("🚀 ~ Navbar ~ isAdmin:", isAdmin);
  console.log("🚀 ~ Navbar ~ session:", session);

  const handleSignOut = () => {
    // signOut();
  };
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <button
          className="mr-2 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>

        <Link href="/resident" className="flex items-center">
          <Image
            src="/assets/logo_reserva_sapetinga-1024x487.png"
            alt="Reserva Sapetinga"
            width={140}
            height={66}
            className="h-auto"
          />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" className="relative rounded-full p-2">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="relative h-9 w-9 rounded-full p-0"
              >
                <div className="bg-dark-green flex h-9 w-9 items-center justify-center rounded-full text-white">
                  {session?.user?.name?.charAt(0) || (
                    <User className="h-5 w-5" />
                  )}
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
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => null}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

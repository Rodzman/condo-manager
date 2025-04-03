"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ShieldUser,
  ChevronDown,
  Mail,
  HelpCircle,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ROLES } from "@/constants/roles";
import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";
import Image from "next/image";
import React from "react";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/resident/notices", label: "Avisos" },
  { href: "/resident/reservations", label: "Reservas" },
  { href: "/resident/documents", label: "Documentos" },
  { href: "/resident/financial", label: "Financeiro" },
];

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const isAdmin = session?.user?.role === ROLES.ADMIN;

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full justify-center border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/resident" className="flex items-center">
            <Image
              src="/assets/images/logo_reserva_sapetinga-1024x487.png"
              alt="Reserva Sapetinga"
              width={100}
              height={40}
              className="h-auto"
            />
          </Link>

          <nav className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
          >
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-[10px]"
            >
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {session ? (
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex h-auto items-center gap-2 p-0 hover:bg-transparent focus:ring-0"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="border-primary/10 hover:border-primary/30 h-8 w-8 border-2 transition-all duration-300">
                      <AvatarFallback className="bg-primary/5 text-primary">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden flex-col items-start md:flex">
                      <span className="text-sm font-medium">
                        {session.user?.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {isAdmin ? "Administrador" : "Morador"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-muted-foreground h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[280px] p-2"
                sideOffset={8}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-2 flex items-center gap-3 p-2">
                    <Avatar className="border-primary/10 h-12 w-12 border-2">
                      <AvatarFallback className="bg-primary/5 text-primary">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{session.user?.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-normal">
                      Conta
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="group flex cursor-pointer items-center gap-2">
                      <User className="group-hover:text-primary h-4 w-4 transition-colors" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group flex cursor-pointer items-center gap-2">
                      <Bell className="group-hover:text-primary h-4 w-4 transition-colors" />
                      <span>Notificações</span>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 ml-auto text-xs">
                        3
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group flex cursor-pointer items-center gap-2">
                      <Mail className="group-hover:text-primary h-4 w-4 transition-colors" />
                      <span>Mensagens</span>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 ml-auto text-xs">
                        2
                      </Badge>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem className="group flex cursor-pointer items-center gap-2">
                      <Home className="group-hover:text-primary h-4 w-4 transition-colors" />
                      <span>Minha Unidade</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group flex cursor-pointer items-center gap-2">
                      <Settings className="group-hover:text-primary h-4 w-4 transition-colors" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group flex cursor-pointer items-center gap-2">
                      <HelpCircle className="group-hover:text-primary h-4 w-4 transition-colors" />
                      <span>Ajuda & Suporte</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="group flex cursor-pointer items-center gap-2"
                      >
                        <Link href="/admin" className="flex items-center gap-2">
                          <ShieldUser className="group-hover:text-primary h-4 w-4 transition-colors" />
                          <span>Área Administrativa</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive hover:text-destructive group flex cursor-pointer items-center gap-2"
                  >
                    <LogOut className="group-hover:text-destructive h-4 w-4 transition-colors" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button variant="secondary">Entrar</Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-border/40 border-t md:hidden"
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

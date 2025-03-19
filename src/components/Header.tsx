"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/dashboard" className="text-2xl font-bold">
          CondoManager
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/dashboard"
              className="hover:text-primary-foreground/80"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/units" className="hover:text-primary-foreground/80">
              Unidades
            </Link>
          </li>
          <li>
            <Link
              href="/communication"
              className="hover:text-primary-foreground/80"
            >
              Comunicação
            </Link>
          </li>
          <li>
            <Link href="/finances" className="hover:text-primary-foreground/80">
              Financeiro
            </Link>
          </li>
          <li>
            <Link
              href="/reservations"
              className="hover:text-primary-foreground/80"
            >
              Reservas
            </Link>
          </li>
        </ul>
        <div>
          {session ? (
            <>
              <span className="mr-4">Olá, {session.user?.name}</span>
              <Button variant="secondary" onClick={() => signOut()}>
                Sair
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button variant="secondary">Entrar</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

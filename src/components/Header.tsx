"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          CondoManager
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/units" className="hover:text-primary-foreground/80">
              Units
            </Link>
          </li>
          <li>
            <Link
              href="/communication"
              className="hover:text-primary-foreground/80"
            >
              Communication
            </Link>
          </li>
          <li>
            <Link
              href="/financial"
              className="hover:text-primary-foreground/80"
            >
              Financial
            </Link>
          </li>
          <li>
            <Link
              href="/reservations"
              className="hover:text-primary-foreground/80"
            >
              Reservations
            </Link>
          </li>
        </ul>
        <div>
          {session ? (
            <>
              <span className="mr-4">Welcome, {session.user?.name}</span>
              <Button variant="secondary" onClick={() => signOut()}>
                Sign out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button variant="secondary">Sign in</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

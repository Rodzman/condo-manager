import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toast";
import { ROLES } from "@/constants/roles";
import SessionProvider from "@/providers/SessionProvider";
import { ThemeProvider } from "@/providers/themeProvider";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reserva Sapetinga",
  description: "Condomínio de luxo em harmonia com a natureza",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers: Headers;
}) {
  const session = await auth();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`}>
        <TRPCReactProvider headers={headers}>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="reserva-sapetinga-theme"
              themes={["light", "dark"]}
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

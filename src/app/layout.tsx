import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/themeProvider";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toast";

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

export default function RootLayout({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers: Headers;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`}>
        <TRPCReactProvider headers={headers}>
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
        </TRPCReactProvider>
      </body>
    </html>
  );
}

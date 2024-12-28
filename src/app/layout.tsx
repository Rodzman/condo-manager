import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CondoManager",
  description: "Aplicativo de Gerenciamento de Condomínios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto mt-8 px-4">{children}</main>
      </body>
    </html>
  );
}

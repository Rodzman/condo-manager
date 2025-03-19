import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta - Reserva Sapetinga",
  description: "Crie sua conta no Reserva Sapetinga",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { providerMap } from "@/auth";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignInForm } from "@/components/features/auth";
import { signInUser, signInWithProvider } from "./actions";

export const metadata: Metadata = {
  title: "Entrar - Reserva Sapetinga",
  description: "Acesse sua conta no Reserva Sapetinga",
};

type Provider = (typeof providerMap)[number];

export default async function SignInPage() {
  const providers = Object.fromEntries(
    providerMap.map((p: Provider) => [p.id, p]),
  );

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/assets/images/logo_reserva_sapetinga-1024x487.png"
            alt="Reserva Sapetinga"
            width={200}
            height={95}
            className="mx-auto"
            priority
          />
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="text-muted-foreground text-sm">
          Entre com seu e-mail e senha para acessar sua conta
        </p>
      </div>

      <SignInForm
        signInAction={signInUser}
        providers={providers}
        providerSignInAction={signInWithProvider}
      />

      <p className="text-muted-foreground px-8 text-center text-sm">
        Não tem uma conta?{" "}
        <Link
          href="/auth/register"
          className="hover:text-primary underline underline-offset-4"
        >
          Criar conta
        </Link>
      </p>

      <p className="text-muted-foreground px-8 text-center text-sm">
        Ao continuar, você concorda com nossos{" "}
        <Link
          href="/terms"
          className="hover:text-primary underline underline-offset-4"
        >
          Termos de Serviço
        </Link>{" "}
        e{" "}
        <Link
          href="/privacy"
          className="hover:text-primary underline underline-offset-4"
        >
          Política de Privacidade
        </Link>
        .
      </p>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/features/auth";

export default function RegisterPage() {
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
          Criar nova conta
        </h1>
        <p className="text-muted-foreground text-sm">
          Preencha os dados abaixo para criar sua conta
        </p>
      </div>

      <RegisterForm />

      <p className="text-muted-foreground px-8 text-center text-sm">
        Já tem uma conta?{" "}
        <Link
          href="/auth/signin"
          className="hover:text-primary underline underline-offset-4"
        >
          Entrar
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

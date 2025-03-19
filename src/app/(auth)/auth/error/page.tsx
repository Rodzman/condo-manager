import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Erro - Reserva Sapetinga",
  description: "Ocorreu um erro durante a autenticação",
};

const errorMessages = {
  ValidationFailed: "Erro de validação",
  UserExists: "Este e-mail já está em uso",
  RegistrationFailed: "Não foi possível criar sua conta",
  PasswordMismatch: "As senhas não conferem",
  InvalidCredentials: "E-mail ou senha inválidos",
  Default: "Ocorreu um erro durante a autenticação",
} as const;

interface Props {
  searchParams: {
    error?: string;
    message?: string;
  };
}

export default function AuthErrorPage({ searchParams }: Props) {
  const errorMessage =
    searchParams.message ||
    (searchParams.error &&
      errorMessages[searchParams.error as keyof typeof errorMessages]) ||
    errorMessages.Default;

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
          Ops! Algo deu errado
        </h1>
      </div>

      <div className="mx-auto mt-8 max-w-md px-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        <div className="mt-8 flex flex-col space-y-4 text-center">
          <p className="text-muted-foreground text-sm">
            Você pode tentar{" "}
            <Link
              href="/auth/signin"
              className="hover:text-primary underline underline-offset-4"
            >
              fazer login
            </Link>{" "}
            ou{" "}
            <Link
              href="/auth/register"
              className="hover:text-primary underline underline-offset-4"
            >
              criar uma nova conta
            </Link>
            .
          </p>
          <p className="text-muted-foreground text-sm">
            Se o problema persistir, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </>
  );
}

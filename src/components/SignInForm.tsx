"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignInState } from "@/app/(auth)/auth/signin/actions";

interface AuthProvider {
  id: string;
  name: string;
}

interface SignInFormProps {
  signInAction: (
    prevState: SignInState,
    formData: FormData,
  ) => Promise<SignInState>;
  providers: Record<string, AuthProvider>;
  providerSignInAction: (
    providerId: string,
    callbackUrl?: string,
  ) => Promise<SignInState | null>;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full"
      variant="default"
      size="lg"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Entrando...</span>
        </div>
      ) : (
        "Entrar"
      )}
    </Button>
  );
}

export default function SignInForm({
  signInAction,
  providers,
  providerSignInAction,
}: SignInFormProps) {
  const initialState: SignInState = null;
  const [state, dispatch] = useActionState(signInAction, initialState);

  const providerIcons = {
    google: <FcGoogle className="h-5 w-5" aria-hidden="true" />,
    github: <FaGithub className="h-5 w-5" aria-hidden="true" />,
  };

  return (
    <div className="grid gap-6">
      <form className="grid gap-4" action={dispatch}>
        {state?.error && (
          <div
            className="bg-destructive/15 text-destructive rounded-md p-3 text-sm"
            role="alert"
            aria-live="polite"
          >
            <p>{state.error}</p>
          </div>
        )}

        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nome@exemplo.com"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring block w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-describedby="email-description"
            />
          </div>

          <div className="mb-2 grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link
                href="/forgot-password"
                className="text-primary text-sm font-medium underline-offset-4 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring block w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-describedby="password-description"
            />
          </div>

          <SubmitButton />
        </div>
      </form>

      {Object.values(providers).length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Ou continue com
            </span>
          </div>
        </div>
      )}

      {Object.values(providers).length > 0 && (
        <div className="grid gap-2">
          {Object.values(providers).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                await providerSignInAction(provider.id);
              }}
            >
              <Button
                type="submit"
                variant="outline"
                className="w-full"
                size="lg"
              >
                {providerIcons[provider.id as keyof typeof providerIcons]}
                <span className="ml-2">Continuar com {provider.name}</span>
              </Button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}

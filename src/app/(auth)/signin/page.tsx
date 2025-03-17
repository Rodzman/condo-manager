import { providerMap, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SignInForm from "@/components/SignInForm";
import Image from "next/image";
import Link from "next/link";

const SIGNIN_ERROR_URL = "/auth/error";
const DEFAULT_CALLBACK_URL = "/dashboard";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Entrar - Reserva Sapetinga",
  description: "Acesse sua conta no Reserva Sapetinga",
};

export default async function SignInPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const callbackUrl =
    searchParams.callbackUrl?.toString() ?? DEFAULT_CALLBACK_URL;
  async function handleCredentialsSignIn(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return redirect(`${SIGNIN_ERROR_URL}?error=InvalidCredentials`);
    }

    try {
      await signIn("credentials", {
        email: email.toString(),
        password: password.toString(),
        redirectTo: callbackUrl,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  }

  async function handleProviderSignIn(providerId: string) {
    "use server";
    try {
      await signIn(providerId, {
        redirectTo: callbackUrl,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  }

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
        onSubmit={handleCredentialsSignIn}
        providers={Object.fromEntries(providerMap.map((p) => [p.id, p]))}
        onProviderSignIn={handleProviderSignIn}
      />

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

// "use client";

// import type React from "react";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { signIn } from "@/auth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const success = await signIn("credentials", {
//         email,
//         password,
//         redirectTo: "/resident",
//       });
//       if (success) {
//         router.push("/resident");
//       } else {
//         setError("Credenciais inválidas. Por favor, tente novamente.");
//       }
//     } catch (err) {
//       setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
//     }
//   };

//   return (
//     <div className="bg-light-cream flex min-h-screen items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="mb-8 text-center">
//           <Link href="/">
//             <Image
//               src="/assets/images/logo_reserva_sapetinga-1024x487.png"
//               alt="Reserva Sapetinga"
//               width={200}
//               height={95}
//               className="mx-auto"
//             />
//           </Link>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-dark-green text-center text-2xl">
//               Área do Morador
//             </CardTitle>
//             <CardDescription className="text-center">
//               Acesse sua conta para gerenciar suas informações
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">E-mail</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="seu@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Senha</Label>
//                   <Link
//                     href="/forgot-password"
//                     className="text-dark-green text-sm hover:underline"
//                   >
//                     Esqueceu a senha?
//                   </Link>
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               {error && (
//                 <div className="mt-2 text-sm text-red-500">{error}</div>
//               )}

//               <Button
//                 type="submit"
//                 className="bg-dark-green hover:bg-dark-green/90 w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Entrando...
//                   </>
//                 ) : (
//                   "Entrar"
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <Link
//               href="/"
//               className="hover:text-dark-green text-sm text-gray-500"
//             >
//               ← Voltar para o site
//             </Link>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }

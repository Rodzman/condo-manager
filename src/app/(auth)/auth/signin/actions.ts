'use server';

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/loginSchema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type SignInState = {
    error?: string;
} | null;

export async function signInUser(prevState: SignInState, formData: FormData) {
    try {
        // Extract and validate the form data
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Validate the credentials
        const result = LoginSchema.safeParse({ email, password });
        if (!result.success) {
            return { error: result.error.errors[0]?.message || "Credenciais inválidas" };
        }

        // Extract data from formData to pass directly to signIn
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: "/dashboard"
        });

        return null;
    } catch (error) {
        console.error("Sign-in error:", error);
        if (error instanceof AuthError) {
            return { error: "Credenciais inválidas. Por favor, tente novamente." };
        }
        throw error;
    }
}

export async function signInWithProvider(providerId: string, callbackUrl: string = "/dashboard") {
    try {
        await signIn(providerId, {
            redirectTo: callbackUrl,
        });
        return null;
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Falha ao entrar com o provedor. Por favor, tente novamente." };
        }
        throw error;
    }
}

'use server';

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/loginSchema";
import { AuthError } from "next-auth";

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

        // Let Auth.js handle the redirect
        return await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard"
        });
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
        return await signIn(providerId, {
            redirect: true,
            callbackUrl,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Falha ao entrar com o provedor. Por favor, tente novamente." };
        }
        throw error;
    }
}

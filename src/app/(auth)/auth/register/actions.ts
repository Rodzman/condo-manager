'use server';

import { db } from "@/server/db";
import { signIn } from "@/auth";
import { RegisterSchema } from "@/schemas/registerSchema";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export type RegisterState = {
    error?: string;
} | null;

export async function registerUser(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // Validate input
        const result = RegisterSchema.safeParse({
            email,
            password,
            name,
            confirmPassword,
        });

        if (!result.success) {
            return { error: result.error.errors[0]?.message || "Dados inválidos" };
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Este email já está em uso" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "resident",
            },
        });

        // After successful registration, sign in the user
        return await signIn("credentials", {
            email,
            password,
            redirectTo: '/dashboard',
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        return {
            error: "Erro ao criar conta. Por favor, tente novamente."
        };
    }
}

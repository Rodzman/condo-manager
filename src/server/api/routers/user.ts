import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { RegisterSchema } from "@/schemas/registerSchema";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    register: publicProcedure
        .input(RegisterSchema)
        .mutation(async ({ ctx, input }) => {
            const { email, password, name } = input;

            // Check if user already exists
            const existingUser = await ctx.prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Este e-mail já está em uso",
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await ctx.prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    role: "resident",
                },
            });

            return { success: true, user };
        }),
});

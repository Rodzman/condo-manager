import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { RegisterSchema } from "@/schemas/registerSchema";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { ROLES, type Role, hasRolePermission } from "@/constants/roles";

// Define a zod enum for role validation
const roleEnum = z.enum([
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RESIDENT,
    ROLES.STAFF,
    ROLES.SECURITY,
    ROLES.GUEST,
]);

export const userRouter = createTRPCRouter({
    register: publicProcedure
        .input(RegisterSchema)
        .mutation(async ({ ctx, input }) => {
            const { email, password, name } = input;

            // Check if user already exists
            const existingUser = await ctx.db.user.findUnique({
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
            const user = await ctx.db.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    role: "resident",
                },
            });

            return { success: true, user };
        }),

    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            // Check if user has permission
            if (ctx.session.user.role !== ROLES.ADMIN && ctx.session.user.role !== ROLES.MANAGER) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have permission to list users",
                });
            }

            try {
                return await ctx.db.user.findMany({
                    orderBy: { createdAt: "desc" },
                });
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch users",
                });
            }
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const { id } = input;
            const isCurrentUser = id === ctx.session.user.id;
            const isAdmin = ctx.session.user.role === ROLES.ADMIN;

            // Only allow admins to view any user, others can only view themselves
            if (!isAdmin && !isCurrentUser) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have permission to view this user",
                });
            }

            const user = await ctx.db.user.findUnique({
                where: { id },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            return user;
        }),

    updateRole: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                role: roleEnum,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, role } = input;

            // Check if the user has admin permissions
            if (ctx.session.user.role !== ROLES.ADMIN) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Only administrators can update user roles",
                });
            }

            // Prevent admins from demoting themselves
            if (userId === ctx.session.user.id && role !== ROLES.ADMIN) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You cannot demote yourself from admin role",
                });
            }

            try {
                const updatedUser = await ctx.db.user.update({
                    where: { id: userId },
                    data: { role },
                });

                return updatedUser;
            } catch (error) {
                console.error("Error updating user role:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to update user role",
                });
            }
        }),
});

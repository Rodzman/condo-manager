import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";

const customPrismaAdapter = Object.assign({}, PrismaAdapter(db), {
    createUser: async (data: any) => {
        // Filter out profile fields to match your User model schema
        const userData = {
            name: data.name,
            email: data.email,
            emailVerified: data.email_verified ? new Date() : null,
            image: data.picture,
            role: "resident", // Default role for Google users
        };

        return db.user.create({ data: userData });
    },
});

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface User {
        role?: string;
    }
}

// Extend JWT type to include custom claims
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role?: string;
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role,
                };
            }
        }),
        GoogleProvider({
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified ? new Date() : null,
                };
            },
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    adapter: customPrismaAdapter,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role as string;
            }
            return session;
        },
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id || "";
                token.role = user.role ?? "resident";
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
} satisfies NextAuthConfig;

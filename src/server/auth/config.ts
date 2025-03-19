import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

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
        GoogleProvider({
            profile(profile) {
                console.log("🚀 ~ profile ~ profile:", profile);
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
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && profile) {
                return true;
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user && typeof user.id === "string") {
                token.id = user.id;
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

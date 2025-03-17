import NextAuth from "next-auth"
import type { Provider } from "next-auth/providers"
import type { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "@/prisma"
import authConfig from "@/auth.config"

// declare module "next-auth" {
//     interface Session {
//         user: {
//             role?: string | null
//         } & DefaultSession["user"]
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         role?: string | null
//     }
// }

const providers: Provider[] = [
    Credentials({
        credentials: { password: { label: "Password", type: "password" } },
        authorize(c) {
            if (c.password !== "password") return null
            return {
                id: "test",
                name: "Test User",
                email: "test@example.com",
            }
        },
    }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        profile(profile) {
            console.log("🚀 ~ profile ~ profile:", profile)
            return { role: profile.role ?? "user", ...profile }
        },
    })
]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== "credentials")

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error"
    },
    ...authConfig,
});

export const { auth, signIn, signOut } = handler;
export const { GET, POST } = handler.handlers;

// // https://authjs.dev/getting-started/authentication/credentials
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { compare } from 'bcryptjs'
// import NextAuth, { NextAuthConfig } from 'next-auth'
// import Credentials from 'next-auth/providers/credentials'

// import { Role } from '@/@types/next-auth'
// import { db } from '@/lib/db'

// export const authOptions: NextAuthConfig = {
//     adapter: PrismaAdapter(db),
//     secret: process.env.NEXTAUTH_SECRET,
//     providers: [
//         Credentials({
//             name: 'Credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'email' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             authorize: async credentials => {
//                 if (!credentials?.email || !credentials.password) {
//                     throw new Error('Please enter your email and password')
//                 }

//                 const user = await db.user.findUnique({
//                     where: { email: credentials.email as string },
//                 })

//                 if (!user || !user.password) {
//                     throw new Error('No user found with this email')
//                 }

//                 const isPasswordValid = compare(
//                     credentials.password as string,
//                     user.password,
//                 )

//                 if (!isPasswordValid) {
//                     throw new Error('Invalid password')
//                 }

//                 return {
//                     id: user.id,
//                     email: user.email,
//                     name: user.name,
//                     role: user.role as Role,
//                 }
//             },
//         }),
//     ],
//     pages: {
//         signIn: '/auth/signin',
//     },
//     session: {
//         strategy: 'jwt',
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     callbacks: {
//         session({ session, token }) {
//             if (session.user) {
//                 session.user.role = token.role as Role
//                 session.user.id = token.sub as string
//             }
//             return session
//         },
//         jwt({ token, user }) {
//             if (user) {
//                 token.role = user.role as Role
//             }
//             return token
//         },
//     },
// }

// export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)

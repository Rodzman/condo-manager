import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            role?: string | null;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        email: string;
        name?: string | null;
        image?: string | null;
        password?: string | null;
        role?: string | null;
    }
}

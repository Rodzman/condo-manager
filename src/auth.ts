import { auth, signIn, signOut, handlers } from "@/server/auth";

export { auth, signIn, signOut, handlers };

export const providerMap = [
    {
        id: "google",
        name: "Google",
        type: "oauth",
        icon: "/assets/icons/google.svg"
    }
] as const;

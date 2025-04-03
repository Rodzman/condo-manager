export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password?: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export type SafeUser = Omit<User, "password">;

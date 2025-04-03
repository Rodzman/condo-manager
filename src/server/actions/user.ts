import { db } from '@/server/db';
import { type User } from '@/types/user';
import { type Role } from '@/constants/roles';

export async function updateUserRole(userId: string, role: Role): Promise<User> {
    const updatedUser = await db.user.update({
        where: { id: userId },
        data: { role },
    });

    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified,
        image: updatedUser.image,
        role: updatedUser.role as string,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
    };
}

export async function getUsers(): Promise<User[]> {
    'use server'

    try {
        const users = await db.user.findMany({
            orderBy: { createdAt: "desc" },
        });

        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Failed to fetch users");
    }
}

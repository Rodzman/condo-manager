"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export async function updateUserRole(formData: FormData) {
    const userId = formData.get("userId") as string;
    const role = formData.get("role") as string;

    if (!userId || !role) {
        return { success: false, error: "Missing required fields" };
    }

    try {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { role },
        });

        revalidatePath("/admin/users");
        return { success: true, user: updatedUser };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

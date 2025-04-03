import { db } from "@/server/db";
import type { Resident, Vehicle } from "@prisma/client";

export type ResidentWithVehicles = Resident & {
    vehicles: Vehicle[];
};

export async function getResidents(): Promise<ResidentWithVehicles[]> {
    'use server'

    try {
        const residents = await db.resident.findMany({
            include: {
                vehicles: true,
            },
        });
        return residents;
    } catch (error) {
        console.error("Failed to fetch residents:", error);
        throw new Error("Failed to fetch residents");
    }
}

export async function createResident(
    data: Omit<Resident, "id" | "createdAt" | "updatedAt">
): Promise<ResidentWithVehicles> {
    'use server'

    try {
        const newResident = await db.resident.create({
            data: {
                ...data,
                vehicles: { create: [] },
            },
            include: {
                vehicles: true,
            },
        });
        return newResident;
    } catch (error) {
        console.error("Failed to create resident:", error);
        throw new Error("Failed to create resident");
    }
}

export async function updateResident(
    id: string,
    data: Partial<Omit<Resident, "id" | "createdAt" | "updatedAt">>
): Promise<ResidentWithVehicles> {
    'use server'

    try {
        const updatedResident = await db.resident.update({
            where: { id },
            data,
            include: {
                vehicles: true,
            },
        });
        return updatedResident;
    } catch (error) {
        console.error("Failed to update resident:", error);
        throw new Error("Failed to update resident");
    }
}

export async function deleteResident(id: string): Promise<ResidentWithVehicles> {
    'use server'

    try {
        const deletedResident = await db.resident.delete({
            where: { id },
            include: {
                vehicles: true,
            },
        });
        return deletedResident;
    } catch (error) {
        console.error("Failed to delete resident:", error);
        throw new Error("Failed to delete resident");
    }
}

import { db } from "@/server/db";
import type { Resident, Vehicle } from "@prisma/client";
import { throwError, ErrorType } from "@/lib/error-handler";

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
        throwError("Failed to fetch residents", ErrorType.INTERNAL, { error });
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
        throwError("Failed to create resident", ErrorType.INTERNAL, { error });
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
        throwError("Failed to update resident", ErrorType.INTERNAL, { error });
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
        throwError("Failed to delete resident", ErrorType.INTERNAL, { error });
    }
}

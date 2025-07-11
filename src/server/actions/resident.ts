import { db } from "@/server/db";
import type { Resident, Vehicle } from "@prisma/client";
import { throwError, ErrorType } from "@/lib/error-handler";

export type ResidentWithVehicles = Resident & {
    vehicles: Vehicle[];
};

/**
 * Retrieves all residents along with their associated vehicles from the database.
 *
 * @returns An array of residents, each including their related vehicles.
 */
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

/**
 * Creates a new resident record in the database with the specified data and initializes it with no vehicles.
 *
 * @param data - The resident information to create, excluding id, createdAt, and updatedAt fields
 * @returns The newly created resident along with an empty array of associated vehicles
 */
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

/**
 * Updates an existing resident with the specified data and returns the updated resident along with their vehicles.
 *
 * @param id - The unique identifier of the resident to update
 * @param data - Partial resident data to update (excluding id, createdAt, and updatedAt)
 * @returns The updated resident object including associated vehicles
 */
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

/**
 * Deletes a resident by ID and returns the deleted resident along with their associated vehicles.
 *
 * @param id - The unique identifier of the resident to delete
 * @returns The deleted resident and their vehicles
 */
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

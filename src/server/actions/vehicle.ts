import { db } from "@/server/db";
import type { Vehicle } from "@prisma/client";
import { throwError, ErrorType } from "@/lib/error-handler";

/**
 * Retrieves all vehicle records from the database.
 *
 * @returns An array of all vehicles.
 */
export async function getVehicles(): Promise<Vehicle[]> {
    'use server'

    try {
        const vehicles = await db.vehicle.findMany();
        return vehicles;
    } catch (error) {
        throwError("Failed to fetch vehicles", ErrorType.INTERNAL, { error });
    }
}

/**
 * Creates a new vehicle record in the database with the specified data.
 *
 * @param data - The vehicle details to create, excluding `id`, `createdAt`, and `updatedAt`
 * @returns The newly created vehicle record
 */
export async function createVehicle(
    data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">
): Promise<Vehicle> {
    'use server'

    try {
        const newVehicle = await db.vehicle.create({
            data,
        });
        return newVehicle;
    } catch (error) {
        throwError("Failed to create vehicle", ErrorType.INTERNAL, { error });
    }
}

/**
 * Updates an existing vehicle record with the specified partial data.
 *
 * @param id - The unique identifier of the vehicle to update
 * @param data - Partial vehicle data to update, excluding `id`, `createdAt`, and `updatedAt`
 * @returns The updated vehicle record
 */
export async function updateVehicle(
    id: string,
    data: Partial<Omit<Vehicle, "id" | "createdAt" | "updatedAt">>
): Promise<Vehicle> {
    'use server'

    try {
        const updatedVehicle = await db.vehicle.update({
            where: { id },
            data,
        });
        return updatedVehicle;
    } catch (error) {
        throwError("Failed to update vehicle", ErrorType.INTERNAL, { error });
    }
}

/**
 * Deletes a vehicle record from the database by its ID.
 *
 * @param id - The unique identifier of the vehicle to delete
 * @returns The deleted vehicle record
 */
export async function deleteVehicle(id: string): Promise<Vehicle> {
    'use server'

    try {
        const deletedVehicle = await db.vehicle.delete({
            where: { id },
        });
        return deletedVehicle;
    } catch (error) {
        throwError("Failed to delete vehicle", ErrorType.INTERNAL, { error });
    }
}

import { db } from "@/server/db";
import type { Vehicle } from "@prisma/client";
import { throwError, ErrorType } from "@/lib/error-handler";

export async function getVehicles(): Promise<Vehicle[]> {
    'use server'

    try {
        const vehicles = await db.vehicle.findMany();
        return vehicles;
    } catch (error) {
        throwError("Failed to fetch vehicles", ErrorType.INTERNAL, { error });
    }
}

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

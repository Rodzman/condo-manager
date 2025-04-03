import { db } from "@/server/db";
import type { Vehicle } from "@prisma/client";

export async function getVehicles(): Promise<Vehicle[]> {
    'use server'

    try {
        const vehicles = await db.vehicle.findMany();
        return vehicles;
    } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        throw new Error("Failed to fetch vehicles");
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
        console.error("Failed to create vehicle:", error);
        throw new Error("Failed to create vehicle");
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
        console.error("Failed to update vehicle:", error);
        throw new Error("Failed to update vehicle");
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
        console.error("Failed to delete vehicle:", error);
        throw new Error("Failed to delete vehicle");
    }
}

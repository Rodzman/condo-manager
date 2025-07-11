import { db } from "@/server/db";
import type { Unit, Resident, Vehicle } from "@prisma/client";
import { throwError, ErrorType } from "@/lib/error-handler";

export type UnitWithRelations = Unit & {
    residents: (Resident & {
        vehicles: Vehicle[];
    })[];
};

/**
 * Retrieves all units from the database, including each unit's residents and their vehicles.
 *
 * @returns An array of units, each with their associated residents and vehicles.
 */
export async function getUnits(): Promise<UnitWithRelations[]> {
    'use server'

    try {
        const units = await db.unit.findMany({
            include: {
                residents: {
                    include: {
                        vehicles: true,
                    },
                },
            },
        });
        return units;
    } catch (error) {
        throwError("Failed to fetch units", ErrorType.INTERNAL, { error });
    }
}

/**
 * Creates a new unit in the database with no initial residents and returns the unit along with its residents and their vehicles.
 *
 * @param data - The unit data to create, excluding `id`, `createdAt`, and `updatedAt`
 * @returns The newly created unit, including its residents and their vehicles
 */
export async function createUnit(data: Omit<Unit, "id" | "createdAt" | "updatedAt">): Promise<UnitWithRelations> {
    'use server'

    try {
        const newUnit = await db.unit.create({
            data: {
                ...data,
                residents: { create: [] },
            },
            include: {
                residents: {
                    include: {
                        vehicles: true,
                    },
                },
            },
        });
        return newUnit;
    } catch (error) {
        throwError("Failed to create unit", ErrorType.INTERNAL, { error });
    }
}

/**
 * Updates an existing unit with the specified data and returns the updated unit, including its residents and their vehicles.
 *
 * @param id - The unique identifier of the unit to update
 * @param data - Partial data to update on the unit, excluding id, createdAt, and updatedAt fields
 * @returns The updated unit with its residents and their vehicles
 */
export async function updateUnit(
    id: string,
    data: Partial<Omit<Unit, "id" | "createdAt" | "updatedAt">>
): Promise<UnitWithRelations> {
    'use server'

    try {
        const updatedUnit = await db.unit.update({
            where: { id },
            data,
            include: {
                residents: {
                    include: {
                        vehicles: true,
                    },
                },
            },
        });
        return updatedUnit;
    } catch (error) {
        throwError("Failed to update unit", ErrorType.INTERNAL, { error });
    }
}

/**
 * Deletes a unit by its ID and returns the deleted unit along with its residents and their vehicles.
 *
 * @param id - The unique identifier of the unit to delete
 * @returns The deleted unit, including its residents and their vehicles
 */
export async function deleteUnit(id: string): Promise<UnitWithRelations> {
    'use server'

    try {
        const deletedUnit = await db.unit.delete({
            where: { id },
            include: {
                residents: {
                    include: {
                        vehicles: true,
                    },
                },
            },
        });
        return deletedUnit;
    } catch (error) {
        throwError("Failed to delete unit", ErrorType.INTERNAL, { error });
    }
}

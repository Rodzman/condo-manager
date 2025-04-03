import { db } from "@/server/db";
import type { Unit, Resident, Vehicle } from "@prisma/client";

export type UnitWithRelations = Unit & {
    residents: (Resident & {
        vehicles: Vehicle[];
    })[];
};

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
        console.error("Failed to fetch units:", error);
        throw new Error("Failed to fetch units");
    }
}

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
        console.error("Failed to create unit:", error);
        throw new Error("Failed to create unit");
    }
}

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
        console.error("Failed to update unit:", error);
        throw new Error("Failed to update unit");
    }
}

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
        console.error("Failed to delete unit:", error);
        throw new Error("Failed to delete unit");
    }
}

import { db } from "@/server/db";
import type { Unit, Resident, Vehicle } from "@prisma/client";
import { throwError, ErrorType } from "@/lib/error-handler";

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
        throwError("Failed to fetch units", ErrorType.INTERNAL, { error });
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
        throwError("Failed to create unit", ErrorType.INTERNAL, { error });
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
        throwError("Failed to update unit", ErrorType.INTERNAL, { error });
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
        throwError("Failed to delete unit", ErrorType.INTERNAL, { error });
    }
}

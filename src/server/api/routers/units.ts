import { z } from "zod";
import { AppError, ErrorType } from "@/lib/error-handler";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

// Input validation schemas
const unitIdSchema = z.object({
    id: z.string().uuid(),
});

// Schema correctly matching the Prisma model
const createUnitSchema = z.object({
    number: z.number().int().min(1),
    floor: z.number().int().min(0),
    tower: z.string(),
    rooms: z.number().int().min(1),
    size: z.number().int().positive(),
    ownerId: z.string().cuid(),
});

const updateUnitSchema = createUnitSchema.partial().merge(unitIdSchema);

// Unit router with organized procedures by operation type
export const unitsRouter = createTRPCRouter({
    // Queries (Read operations)
    getAll: publicProcedure
        .query(async ({ ctx }) => {
            try {
                return await ctx.db.unit.findMany({
                    orderBy: { number: "asc" },
                    include: {
                        residents: true,
                    },
                });
            } catch (error) {
                throw new AppError(
                    "Failed to fetch units",
                    ErrorType.INTERNAL,
                    { cause: error }
                );
            }
        }),

    getById: publicProcedure
        .input(unitIdSchema)
        .query(async ({ ctx, input }) => {
            try {
                const unit = await ctx.db.unit.findUnique({
                    where: { id: input.id },
                    include: {
                        residents: true,
                        vehicles: true,
                    },
                });

                if (!unit) {
                    throw new AppError(
                        `Unit with ID ${input.id} not found`,
                        ErrorType.NOT_FOUND
                    );
                }

                return unit;
            } catch (error) {
                if (error instanceof AppError) throw error;

                throw new AppError(
                    "Failed to fetch unit",
                    ErrorType.INTERNAL,
                    { cause: error }
                );
            }
        }),

    // Mutations (Create, Update, Delete operations)
    create: protectedProcedure
        .input(createUnitSchema)
        .mutation(async ({ ctx, input }) => {
            // Check if unit with same number and tower and floor already exists
            const existing = await ctx.db.unit.findFirst({
                where: {
                    tower: input.tower,
                    floor: input.floor,
                    number: input.number
                },
            });

            if (existing) {
                throw new AppError(
                    `Unit with tower ${input.tower}, floor ${input.floor} and number ${input.number} already exists`,
                    ErrorType.CONFLICT
                );
            }

            try {
                return await ctx.db.unit.create({
                    data: input,
                });
            } catch (error) {
                throw new AppError(
                    "Failed to create unit",
                    ErrorType.INTERNAL,
                    { cause: error }
                );
            }
        }),

    update: protectedProcedure
        .input(updateUnitSchema)
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;

            // Check if unit exists
            const existingUnit = await ctx.db.unit.findUnique({
                where: { id },
            });

            if (!existingUnit) {
                throw new AppError(
                    `Unit with ID ${id} not found`,
                    ErrorType.NOT_FOUND
                );
            }

            // Check for uniqueness constraint if changing tower, floor or number
            if (
                (data.tower !== undefined || data.floor !== undefined || data.number !== undefined) &&
                (data.tower !== existingUnit.tower || data.floor !== existingUnit.floor || data.number !== existingUnit.number)
            ) {
                const conflictingUnit = await ctx.db.unit.findFirst({
                    where: {
                        tower: data.tower ?? existingUnit.tower,
                        floor: data.floor ?? existingUnit.floor,
                        number: data.number ?? existingUnit.number,
                        id: { not: id },
                    },
                });

                if (conflictingUnit) {
                    throw new AppError(
                        `Unit with the same tower, floor and number already exists`,
                        ErrorType.CONFLICT
                    );
                }
            }

            try {
                return await ctx.db.unit.update({
                    where: { id },
                    data,
                });
            } catch (error) {
                throw new AppError(
                    "Failed to update unit",
                    ErrorType.INTERNAL,
                    { cause: error }
                );
            }
        }),

    delete: protectedProcedure
        .input(unitIdSchema)
        .mutation(async ({ ctx, input }) => {
            // Check if unit exists
            const existingUnit = await ctx.db.unit.findUnique({
                where: { id: input.id },
                include: {
                    residents: true,
                    vehicles: true,
                },
            });

            if (!existingUnit) {
                throw new AppError(
                    `Unit with ID ${input.id} not found`,
                    ErrorType.NOT_FOUND
                );
            }

            // Check for related records before deleting
            if (existingUnit.residents.length > 0) {
                throw new AppError(
                    "Cannot delete unit with associated residents",
                    ErrorType.CONFLICT,
                    { residentCount: existingUnit.residents.length }
                );
            }

            if (existingUnit.vehicles.length > 0) {
                throw new AppError(
                    "Cannot delete unit with associated vehicles",
                    ErrorType.CONFLICT,
                    { vehicleCount: existingUnit.vehicles.length }
                );
            }

            try {
                await ctx.db.unit.delete({
                    where: { id: input.id },
                });

                return { success: true };
            } catch (error) {
                throw new AppError(
                    "Failed to delete unit",
                    ErrorType.INTERNAL,
                    { cause: error }
                );
            }
        }),
});

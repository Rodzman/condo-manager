import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, adminProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const invoiceRouter = createTRPCRouter({
    getAll: protectedProcedure
        .input(
            z.object({
                unitId: z.string().optional(),
                isPaid: z.boolean().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const filters: any = {};

            // If user is a resident, only show their invoices
            if (ctx.session.user.role === 'resident') {
                const units = await ctx.prisma.unit.findMany({
                    where: { ownerId: ctx.session.user.id },
                    select: { id: true },
                });

                if (units.length === 0) {
                    return [];
                }

                filters.unitId = { in: units.map((unit) => unit.id) };
            } else if (input.unitId) {
                filters.unitId = input.unitId;
            }

            if (input.isPaid !== undefined) {
                filters.isPaid = input.isPaid;
            }

            return ctx.prisma.invoice.findMany({
                where: filters,
                include: {
                    unit: {
                        select: {
                            number: true,
                            floor: true,
                            tower: true,
                            owner: {
                                select: {
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                    payments: true,
                },
                orderBy: {
                    dueDate: 'desc',
                },
            });
        }),

    create: adminProcedure
        .input(
            z.object({
                unitId: z.string(),
                amount: z.number(),
                dueDate: z.date(),
                description: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // Validate unit exists
            const unit = await ctx.prisma.unit.findUnique({
                where: { id: input.unitId },
            });

            if (!unit) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Unit not found',
                });
            }

            return ctx.prisma.invoice.create({
                data: {
                    unitId: input.unitId,
                    amount: input.amount,
                    dueDate: input.dueDate,
                    description: input.description,
                    isPaid: false,
                },
            });
        }),
});

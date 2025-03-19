import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db as prisma } from "@/server/db";

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admin and manager can view expenses
    if (!["admin", "manager"].includes(session.user.role)) {
        return NextResponse.json(
            { error: "Insufficient permissions" },
            { status: 403 }
        );
    }

    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    try {
        const filters: any = {};

        if (category) {
            filters.category = category;
        }

        if (startDate && endDate) {
            filters.paymentDate = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            };
        } else if (startDate) {
            filters.paymentDate = {
                gte: new Date(startDate)
            };
        } else if (endDate) {
            filters.paymentDate = {
                lte: new Date(endDate)
            };
        }

        const expenses = await prisma.expense.findMany({
            where: filters,
            orderBy: {
                paymentDate: "desc"
            }
        });

        return NextResponse.json({ expenses });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return NextResponse.json(
            { error: "Failed to fetch expenses" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admin and manager can create expenses
    if (!["admin", "manager"].includes(session.user.role)) {
        return NextResponse.json(
            { error: "Insufficient permissions" },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const { title, amount, category, paymentDate, description, receipt } = body;

        if (!title || !amount || !category || !paymentDate) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const expense = await prisma.expense.create({
            data: {
                title,
                amount: parseFloat(amount),
                category,
                paymentDate: new Date(paymentDate),
                description,
                receipt
            }
        });

        return NextResponse.json({ expense }, { status: 201 });
    } catch (error) {
        console.error("Error creating expense:", error);
        return NextResponse.json(
            { error: "Failed to create expense" },
            { status: 500 }
        );
    }
}

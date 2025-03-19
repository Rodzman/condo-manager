import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/server/db";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const invoiceId = searchParams.get("invoiceId");

    try {
        if (!invoiceId) {
            return NextResponse.json(
                { error: "Invoice ID is required" },
                { status: 400 }
            );
        }

        const payments = await prisma.payment.findMany({
            where: { invoiceId },
            orderBy: { paymentDate: "desc" }
        });

        return NextResponse.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        return NextResponse.json(
            { error: "Failed to fetch payments" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { invoiceId, amount, paymentDate, paymentMethod, reference } = body;

        if (!invoiceId || !amount || !paymentDate || !paymentMethod) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate invoice exists
        const invoice = await prisma.invoice.findUnique({
            where: { id: invoiceId }
        });

        if (!invoice) {
            return NextResponse.json(
                { error: "Invoice not found" },
                { status: 404 }
            );
        }

        // Create payment
        const payment = await prisma.payment.create({
            data: {
                invoiceId,
                amount: parseFloat(amount),
                paymentDate: new Date(paymentDate),
                paymentMethod,
                reference
            }
        });

        // Check if invoice is fully paid
        const totalPaid = await prisma.payment.aggregate({
            where: { invoiceId },
            _sum: { amount: true }
        });

        if (totalPaid._sum.amount && totalPaid._sum.amount >= invoice.amount) {
            // Mark invoice as paid
            await prisma.invoice.update({
                where: { id: invoiceId },
                data: { isPaid: true }
            });
        }

        return NextResponse.json(payment, { status: 201 });
    } catch (error) {
        console.error("Error creating payment:", error);
        return NextResponse.json(
            { error: "Failed to create payment" },
            { status: 500 }
        );
    }
}

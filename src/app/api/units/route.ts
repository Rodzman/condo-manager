import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db as prisma } from "@/server/db"
import { Unit, Resident, Vehicle } from "@/types/unit"

export async function GET(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const units = await prisma.unit.findMany({
        include: {
            residents: {
                include: {
                    vehicles: true,
                },
            },
        },
    })
    return NextResponse.json(units)
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const newUnit = await prisma.unit.create({
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
    })
    return NextResponse.json(newUnit, { status: 201 })
}

export async function PUT(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const data = await request.json()

    // Ensure 'id' is provided
    if (!data.id) {
        return NextResponse.json({ error: "Missing unit id" }, { status: 400 })
    }

    try {
        const updatedUnit = await prisma.unit.update({
            where: { id: data.id },
            data,
            include: {
                residents: { include: { vehicles: true } },
            },
        })
        return NextResponse.json(updatedUnit)
    } catch (error) {
        return NextResponse.json({ error: "Update failed", details: error }, { status: 400 })
    }
}

export async function DELETE(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }
    try {
        const deletedUnit = await prisma.unit.delete({
            where: { id },
            include: {
                residents: { include: { vehicles: true } },
            },
        })
        return NextResponse.json(deletedUnit)
    } catch (error) {
        return NextResponse.json({ error: "Delete failed", details: error }, { status: 400 })
    }
}

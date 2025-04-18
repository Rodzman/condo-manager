import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createUnit, deleteUnit, getUnits, updateUnit } from "@/server/actions/unit"

export async function GET(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const units = await getUnits()
        return NextResponse.json(units)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch units" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const data = await request.json()
        const newUnit = await createUnit(data)
        return NextResponse.json(newUnit, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create unit" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const data = await request.json()
        if (!data.id) {
            return NextResponse.json({ error: "Missing unit id" }, { status: 400 })
        }

        const { id, ...updateData } = data
        const updatedUnit = await updateUnit(id, updateData)
        return NextResponse.json(updatedUnit)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update unit" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id")
        if (!id) {
            return NextResponse.json({ error: "Missing id" }, { status: 400 })
        }

        const deletedUnit = await deleteUnit(id)
        return NextResponse.json(deletedUnit)
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete unit" }, { status: 500 })
    }
}

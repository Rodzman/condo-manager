import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createResident, deleteResident, getResidents, updateResident } from "@/server/actions/resident"

export async function GET(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const residents = await getResidents()
        return NextResponse.json(residents)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch residents" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const data = await request.json()
        const newResident = await createResident(data)
        return NextResponse.json(newResident, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create resident" }, { status: 500 })
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
            return NextResponse.json({ error: "Missing resident id" }, { status: 400 })
        }

        const { id, ...updateData } = data
        const updatedResident = await updateResident(id, updateData)
        return NextResponse.json(updatedResident)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update resident" }, { status: 500 })
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

        const deletedResident = await deleteResident(id)
        return NextResponse.json(deletedResident)
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete resident" }, { status: 500 })
    }
}

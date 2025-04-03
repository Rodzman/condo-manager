import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createVehicle, deleteVehicle, getVehicles, updateVehicle } from "@/server/actions/vehicle"

export async function GET(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const vehicles = await getVehicles()
        return NextResponse.json(vehicles)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const data = await request.json()
        const newVehicle = await createVehicle(data)
        return NextResponse.json(newVehicle, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 })
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
            return NextResponse.json({ error: "Missing vehicle id" }, { status: 400 })
        }

        const { id, ...updateData } = data
        const updatedVehicle = await updateVehicle(id, updateData)
        return NextResponse.json(updatedVehicle)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 })
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

        const deletedVehicle = await deleteVehicle(id)
        return NextResponse.json(deletedVehicle)
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 })
    }
}

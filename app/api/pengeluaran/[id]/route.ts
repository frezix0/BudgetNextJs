import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { pengeluaranSchema } from "@/lib/validations"
import { getCurrentUserId } from "@/lib/session"

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = await getCurrentUserId()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { tanggal, ...rest } = body
        const validatedData = pengeluaranSchema.parse({ tanggal, ...rest })

        const result = await prisma.pengeluaran.updateMany({
            where: {
                id: params.id,
                budget: { userId },
            },
            data: {
                namaPengeluaran: validatedData.namaPengeluaran,
                jumlah: validatedData.jumlah,
                tanggal: new Date(validatedData.tanggal),
            },
        })
 
        if (result.count === 0) {
            return NextResponse.json({ error: "Pengeluaran not found" }, { status: 404 })
        }

        const pengeluaran = await prisma.pengeluaran.findUnique({ 
            where: { 
                id: params.id 
            } 
        })
        return NextResponse.json(pengeluaran)
    } catch (error: any) {
        console.error("Error updating pengeluaran:", error)
        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid data", details: error.errors },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = await getCurrentUserId()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const result = await prisma.pengeluaran.deleteMany({
            where: {
                id: params.id,
                budget: { userId },
            },
        })
 
        if (result.count === 0) {
            return NextResponse.json({ error: "Pengeluaran not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
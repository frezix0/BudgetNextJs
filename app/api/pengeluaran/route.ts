import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { pengeluaranSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { budgetId, tanggal, ...rest } = body
        
        // Validate the data
        const validatedData = pengeluaranSchema.parse({ tanggal, ...rest })

        const pengeluaran = await prisma.pengeluaran.create({
            data: {
                ...rest,
                jumlah: validatedData.jumlah,
                namaPengeluaran: validatedData.namaPengeluaran,
                tanggal: new Date(tanggal), // Convert to Date object
                budgetId,
            },
        })

        return NextResponse.json(pengeluaran, { status: 201 })
    } catch (error: any) {
        console.error("Error creating pengeluaran:", error)
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
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { pengeluaranSchema } from "@/lib/validations"
import { getCurrentUserId } from "@/lib/session"

export async function POST(request: NextRequest) {
    try {
        const userId = await getCurrentUserId()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { budgetId, tanggal, ...rest } = body

        if (!budgetId || typeof budgetId !== "string") {
            return NextResponse.json({ error: "budgetId is required" }, { status: 400 })
        }
        
        // Validate the data
        const validatedData = pengeluaranSchema.parse({ tanggal, ...rest })

        const budget = await prisma.budget.findFirst({
            where: { id: budgetId, userId },
            select: { id: true },
        })
        if (!budget) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 })
        }

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
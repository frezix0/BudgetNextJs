import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { budgetSchema } from "@/lib/validations"
import { getCurrentUserId } from "@/lib/session"

export async function GET() {
    try {
        const userId = await getCurrentUserId()
        if(!userId) {
            return NextResponse.json ({ error: "Unauthorized" }, { status: 401 })
        }

        const budgets = await prisma.budget.findMany({
            where: { userId },
            include: { 
                pengeluaran: {
                    orderBy: { tanggal: "desc" }
                } 
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(budgets)
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const userId = await request.json()
        if(!userId) {
            return NextResponse.json ({ error: "Unauthorized"}, { status: 401 })
        }

        const body = await request.json()
        const validatedData = budgetSchema.parse(body)

        const budget = await prisma.budget.create({
            data: {
                ...validatedData,
                userId,
            },
            include: {
                pengeluaran: true
            }
        })

        return NextResponse.json(budget, { status: 201 })
    } catch (error: any) {
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
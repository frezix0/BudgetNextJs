import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { budgetSchema } from "@/lib/validations"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user!.email! },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const budgets = await prisma.budget.findMany({
            where: { userId: user.id },
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
        const session = await getServerSession(authOptions)
        
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user!.email! },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const body = await request.json()
        const validatedData = budgetSchema.parse(body)

        const budget = await prisma.budget.create({
            data: {
                ...validatedData,
                userId: user.id,
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
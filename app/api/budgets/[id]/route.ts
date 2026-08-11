import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { budgetSchema } from "@/lib/validations"
import { getCurrentUserId } from "@/lib/session"
import { ZodError } from "zod"

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const budget = await prisma.budget.findUnique({
      where: { id: params.id, userId },
      include: { pengeluaran: true },
    })

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json(budget)
  } catch (error) {
    console.error("GET budget error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

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
    const validatedData = budgetSchema.parse(body)

    const result = await prisma.budget.updateMany({
      where: { id: params.id, userId },
      data: validatedData,
    })
 
    if (result.count === 0) {
      return NextResponse.json(
        { error: "Budget not found" }, 
        { status: 404 }
      )
    }
 
    const budget = await prisma.budget.findUnique({ where: { id: params.id } })


    return NextResponse.json(budget)
  } catch (error: any) {
    console.error("PUT budget error:", error)
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ error: error.message || "Bad Request" }, { status: 400 })
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

    const result = await prisma.budget.deleteMany({
      where: { id: params.id, userId },
    })
 
    if (result.count === 0) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("DELETE budget error:", error)
    return NextResponse.json({ error: error.message || "Bad Request" }, { status: 400 })
  }
}
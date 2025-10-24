import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validations"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = registerSchema.parse(body)

        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "Email sudah terdaftar" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10)

        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
            },
        })

        return NextResponse.json(
            { 
                id: user.id, 
                email: user.email, 
                name: user.name 
            },
            { status: 201 }
        )
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Data tidak valid", details: error.errors },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: "Terjadi kesalahan server" },
            { status: 500 }
        )
    }
}
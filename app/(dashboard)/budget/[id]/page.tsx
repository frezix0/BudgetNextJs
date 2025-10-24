import { getServerSession } from "next-auth"
import { redirect, notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import BudgetDetail from "@/components/budget/budget-detail"
import Header from "@/components/layout/header"

export async function generateMetadata({ params }: { params: { id: string } }) {
    const budget = await prisma.budget.findUnique({
        where: { id: params.id },
    })

    return {
        title: budget ? `${budget.namaBudget} - BudgetApp` : "Budget - BudgetApp",
    }
}

export default async function BudgetDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const session = await getServerSession(authOptions)
    
    if (!session) {
        redirect("/login")
    }

    const budget = await prisma.budget.findUnique({
        where: { id: params.id },
        include: { 
            pengeluaran: {
                orderBy: { tanggal: "desc" }
            } 
        },
    })

    if (!budget) {
        notFound()
    }

    // Check if budget belongs to user
    const user = await prisma.user.findUnique({
        where: { email: session.user!.email! },
    })

    if (budget.userId !== user?.id) {
        notFound()
    }

    return (
        <>
            <Header />
            <main className="container mx-auto max-w-2xl px-4 pb-8">
                <BudgetDetail budget={budget} />
            </main>
        </>
    )
}
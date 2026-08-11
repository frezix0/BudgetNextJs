import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getCurrentUserId } from "@/lib/session"
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
    const userId = await getCurrentUserId()
 
    if (!userId) {
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

    return (
        <>
            <Header />
            <main className="container mx-auto max-w-2xl px-4 pb-8">
                <BudgetDetail budget={budget} />
            </main>
        </>
    )
}
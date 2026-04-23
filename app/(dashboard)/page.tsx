import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getCurrentUserId } from "@/lib/session"
import BudgetList from "@/components/budget/budget-list"
import Header from "@/components/layout/header"

export const metadata = {
    title: "Dashboard - BudgetApp",
    description: "Kelola budget Anda",
}

export default async function HomePage() {
    const userId = await getCurrentUserId()
 
    if (!userId) {
        redirect("/login")
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

    return (
        <>
            <Header />
            <main className="container mx-auto max-w-2xl px-4 pb-8">
                <BudgetList initialBudgets={budgets} />
            </main>
        </>
    )
}
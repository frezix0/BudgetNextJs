import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import BudgetList from "@/components/budget/budget-list"
import Header from "@/components/layout/header"

export const metadata = {
    title: "Dashboard - BudgetApp",
    description: "Kelola budget Anda",
}

export default async function HomePage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user!.email! },
    })

    if (!user) {
        redirect("/login")
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

    return (
        <>
            <Header />
            <main className="container mx-auto max-w-2xl px-4 pb-8">
                <BudgetList initialBudgets={budgets} />
            </main>
        </>
    )
}
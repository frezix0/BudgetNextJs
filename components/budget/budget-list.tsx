"use client"

import { useState } from "react"
import { Budget, Pengeluaran } from "@prisma/client"
import BudgetCard from "./budget-card"
import AddBudgetButton from "./add-budget-button"
import BudgetForm from "./budget-form"

type BudgetListProps = {
  initialBudgets: (Budget & { pengeluaran: Pengeluaran[] })[]
}

export default function BudgetList({ initialBudgets }: BudgetListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        padding: '0 1rem 2rem',
        width: '100%',
        maxWidth: '40rem',
        margin: '0 auto',
      }}>
        {initialBudgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
        <AddBudgetButton onClick={() => setIsFormOpen(true)} />
      </div>

      <BudgetForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  )
}
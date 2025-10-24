"use client"

import { Budget, Pengeluaran } from "@prisma/client"
import { formatRupiah } from "@/lib/utils"
import { useRouter } from "next/navigation"

type BudgetCardProps = {
  budget: Budget & { pengeluaran: Pengeluaran[] }
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const router = useRouter()
  
  const totalPengeluaran = budget.pengeluaran.reduce(
    (total, p) => total + Number(p.jumlah),
    0
  )
  const sisaBudget = Number(budget.total) - totalPengeluaran

  return (
    <div
      onClick={() => router.push(`/budget/${budget.id}`)}
      style={{
        backgroundColor: '#10214da8',
        width: '100%',
        padding: '1rem',
        borderRadius: '1.5rem',
        color: 'white',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        minHeight: '120px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
      <h2 style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '0.5rem'
      }}>
        {budget.namaBudget}
      </h2>
      <p style={{
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '0.25rem'
      }}>
        {formatRupiah(sisaBudget)}
      </p>
      <p style={{
        fontSize: '0.875rem',
        opacity: 0.9
      }}>
        Total {formatRupiah(Number(budget.total))}
      </p>
    </div>
  )
}
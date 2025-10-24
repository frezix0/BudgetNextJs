"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Budget, Pengeluaran } from "@prisma/client"
import { ArrowLeft, Pencil, Plus } from "lucide-react"
import { formatRupiah } from "@/lib/utils"
import BudgetForm from "./budget-form"
import PengeluaranList from "../pengeluaran/pengeluaran-list"
import PengeluaranForm from "../pengeluaran/pengeluaran-form"
import SortSelect from "../pengeluaran/sort-select"
import { SortOption } from "@/types/budget"

type BudgetDetailProps = {
  budget: Budget & { pengeluaran: Pengeluaran[] }
}

export default function BudgetDetail({ budget }: BudgetDetailProps) {
  const router = useRouter()
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false)
  const [isPengeluaranFormOpen, setIsPengeluaranFormOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("tanggal|desc")

  const totalPengeluaran = budget.pengeluaran.reduce(
    (total, p) => total + Number(p.jumlah),
    0
  )
  const sisaBudget = Number(budget.total) - totalPengeluaran

  return (
    <div style={{
      width: '100%',
      maxWidth: '40rem',
      margin: '0 auto',
      padding: '0 1rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '50px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(217, 217, 217, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'white',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          fontSize: '0.875rem'
        }}
      >
        <ArrowLeft size={16} />
        Halaman Utama
      </button>

      {/* Budget Card */}
      <div style={{
        backgroundColor: '#10214da8',
        padding: '1rem',
        borderRadius: '1.5rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.5rem',
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
        <button
          onClick={() => setIsBudgetFormOpen(true)}
          style={{
            padding: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <Pencil size={24} />
        </button>
      </div>

      {/* Add Pengeluaran Button */}
      <button
        onClick={() => setIsPengeluaranFormOpen(true)}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          borderRadius: '1.5rem',
          border: '2px dashed rgba(217, 217, 217, 0.5)',
          background: 'transparent',
          color: 'rgba(217, 217, 217, 0.7)',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#10214da8'
          e.currentTarget.style.color = '#10214da8'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(217, 217, 217, 0.5)'
          e.currentTarget.style.color = 'rgba(217, 217, 217, 0.7)'
        }}
      >
        <Plus size={24} strokeWidth={3} />
        <span style={{ fontSize: '1rem', fontWeight: '600' }}>
          Tambah Pengeluaran
        </span>
      </button>

      {/* Sort Select */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      {/* Pengeluaran List */}
      <PengeluaranList 
        pengeluaran={budget.pengeluaran} 
        budgetId={budget.id}
        sortBy={sortBy}
      />

      {/* Forms */}
      <BudgetForm
        isOpen={isBudgetFormOpen}
        onClose={() => setIsBudgetFormOpen(false)}
        budgetId={budget.id}
        initialData={{
          namaBudget: budget.namaBudget,
          total: Number(budget.total),
        }}
      />

      <PengeluaranForm
        isOpen={isPengeluaranFormOpen}
        onClose={() => setIsPengeluaranFormOpen(false)}
        budgetId={budget.id}
      />
    </div>
  )
}
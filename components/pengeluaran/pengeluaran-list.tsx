"use client"

import { useState } from "react"
import { Pengeluaran } from "@prisma/client"
import PengeluaranCard from "./pengeluaran-card"
import PengeluaranForm from "./pengeluaran-form"
import { SortOption } from "@/types/budget"
import { sortPengeluaran } from "@/lib/utils"

type PengeluaranListProps = {
  pengeluaran: Pengeluaran[]
  budgetId: string
  sortBy: SortOption
}

export default function PengeluaranList({ 
  pengeluaran, 
  budgetId,
  sortBy 
}: PengeluaranListProps) {
  const [editingPengeluaran, setEditingPengeluaran] = useState<Pengeluaran | null>(null)

  const sortedPengeluaran = sortPengeluaran(pengeluaran, sortBy)

  if (sortedPengeluaran.length === 0) {
    return (
      <div 
        className="border-placeholder text-placeholder"
        style={{
          borderRadius: '1.5rem',
          border: '1px dashed',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <p>Belum ada pengeluaran</p>
      </div>
    )
  }

  return (
    <>
      <div
        className="text-primary" 
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        {sortedPengeluaran.map((item) => (
          <PengeluaranCard
            key={item.id}
            pengeluaran={item}
            onClick={() => setEditingPengeluaran(item)}
          />
        ))}
      </div>

      {editingPengeluaran && (
        <PengeluaranForm
          isOpen={true}
          onClose={() => setEditingPengeluaran(null)}
          budgetId={budgetId}
          pengeluaranId={editingPengeluaran.id}
          initialData={{
            namaPengeluaran: editingPengeluaran.namaPengeluaran,
            jumlah: Number(editingPengeluaran.jumlah),
            tanggal: new Date(editingPengeluaran.tanggal).toISOString().split('T')[0],
          }}
        />
      )}
    </>
  )
}
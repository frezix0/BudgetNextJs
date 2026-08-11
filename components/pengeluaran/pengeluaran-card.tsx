"use client"

import { Pengeluaran } from "@prisma/client"
import { formatRupiah } from "@/lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"

type PengeluaranCardProps = {
  pengeluaran: Pengeluaran
  onClick: () => void
}

export default function PengeluaranCard({ 
  pengeluaran, 
  onClick 
}: PengeluaranCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '0.25px solid var(--placeholder)',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        const cardColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--bg-hover').trim()
        e.currentTarget.style.backgroundColor = cardColor
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <div>
        <h4 
          className="text-primary"
          style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '0.25rem'
          }}
        >
          {pengeluaran.namaPengeluaran}
        </h4>
        <p 
          className="text-secondary"
          style={{
            fontSize: '0.875rem'
          }}
        >
          {format(new Date(pengeluaran.tanggal), "d MMMM yyyy", { locale: id })}
        </p>
      </div>
      <div>
        <p 
          className="text-primary-text"
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            textAlign: 'right'
          }}
        >
          {formatRupiah(Number(pengeluaran.jumlah))}
        </p>
      </div>
    </div>
  )
}
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
        borderBottom: '1px solid rgba(217, 217, 217, 0.2)',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        backgroundColor: 'transparent'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div>
        <h4 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: 'white',
          marginBottom: '0.25rem'
        }}>
          {pengeluaran.namaPengeluaran}
        </h4>
        <p style={{
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          {format(new Date(pengeluaran.tanggal), "d MMMM yyyy", { locale: id })}
        </p>
      </div>
      <div>
        <p style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: 'white',
          textAlign: 'right'
        }}>
          {formatRupiah(Number(pengeluaran.jumlah))}
        </p>
      </div>
    </div>
  )
}
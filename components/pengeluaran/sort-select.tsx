"use client"

import { ArrowUpDown } from "lucide-react"
import { SortOption } from "@/types/budget"

type SortSelectProps = {
  value: SortOption
  onChange: (value: SortOption) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <ArrowUpDown size={16} className="text-primary" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-primary border-placeholder bg-primary-bg"
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <option value="tanggal|desc">Tanggal Terbaru</option>
        <option value="namaPengeluaran|asc">Nama</option>
        <option value="jumlah|asc">Terkecil</option>
        <option value="jumlah|desc">Terbesar</option>
      </select>
    </div>
  )
}
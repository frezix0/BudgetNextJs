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
      <ArrowUpDown size={16} color="white" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        style={{
          padding: '0.5rem 0.75rem',
          border: '1px solid rgba(217, 217, 217, 0.3)',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          fontSize: '0.875rem',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <option value="tanggal|desc" style={{ color: '#000' }}>Tanggal Terbaru</option>
        <option value="namaPengeluaran|asc" style={{ color: '#000' }}>Nama</option>
        <option value="jumlah|asc" style={{ color: '#000' }}>Terkecil</option>
        <option value="jumlah|desc" style={{ color: '#000' }}>Terbesar</option>
      </select>
    </div>
  )
}
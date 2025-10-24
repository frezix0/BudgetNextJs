"use client"

import { useState, useEffect } from "react"
import { X, Trash2 } from "lucide-react"
import { usePengeluaran } from "@/hooks/use-pengeluaran"
import { PengeluaranFormData } from "@/types/budget"

type PengeluaranFormProps = {
  isOpen: boolean
  onClose: () => void
  budgetId: string
  pengeluaranId?: string
  initialData?: PengeluaranFormData
}

export default function PengeluaranForm({ 
  isOpen, 
  onClose, 
  budgetId,
  pengeluaranId,
  initialData 
}: PengeluaranFormProps) {
  const { createPengeluaran, updatePengeluaran, deletePengeluaran } = usePengeluaran(budgetId)
  const [formData, setFormData] = useState<PengeluaranFormData>({
    namaPengeluaran: "",
    jumlah: 0,
    tanggal: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        namaPengeluaran: "",
        jumlah: 0,
        tanggal: new Date().toISOString().split('T')[0],
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (pengeluaranId) {
      await updatePengeluaran.mutateAsync({ id: pengeluaranId, data: formData })
    } else {
      await createPengeluaran.mutateAsync(formData)
    }
    
    onClose()
  }

  const handleDelete = async () => {
    if (!pengeluaranId) return
    
    const confirmed = confirm("Apakah ingin menghapus pengeluaran ini?")
    if (confirmed) {
      await deletePengeluaran.mutateAsync(pengeluaranId)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    // Modal Overlay
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 5, 5, 0.37)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          width: '100%',
          maxWidth: '40rem',
          padding: '2rem',
          borderRadius: '1.5rem',
          animation: 'slideup 0.5s ease-in-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h4 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#31509e',
            margin: 0
          }}>
            {pengeluaranId ? "Update Pengeluaran" : "Tambah Pengeluaran"}
          </h4>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#f24949',
              padding: '0.25rem'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="namaPengeluaran"
              style={{
                display: 'block',
                color: '#9e9e9e',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              Nama Pengeluaran
            </label>
            <input
              id="namaPengeluaran"
              type="text"
              value={formData.namaPengeluaran}
              onChange={(e) => setFormData({ ...formData, namaPengeluaran: e.target.value })}
              required
              style={{
                width: '100%',
                fontSize: '1.5rem',
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: 'transparent',
                border: '1px solid #d9d9d9',
                color: '#4b4b4b',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="jumlah"
              style={{
                display: 'block',
                color: '#9e9e9e',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              Jumlah Pengeluaran
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                fontSize: '1.5rem',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '1rem',
                color: '#9e9e9e'
              }}>
                Rp
              </span>
              <input
                id="jumlah"
                type="number"
                value={formData.jumlah || ""}
                onChange={(e) => setFormData({ ...formData, jumlah: Number(e.target.value) })}
                required
                min="0"
                style={{
                  width: '100%',
                  fontSize: '1.5rem',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid #d9d9d9',
                  color: '#4b4b4b',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="tanggal"
              style={{
                display: 'block',
                color: '#9e9e9e',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              Tanggal
            </label>
            <input
              id="tanggal"
              type="date"
              value={formData.tanggal}
              onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              required
              style={{
                width: '100%',
                fontSize: '1.5rem',
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: 'transparent',
                border: '1px solid #d9d9d9',
                color: '#4b4b4b',
                outline: 'none'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: pengeluaranId ? 'space-between' : 'flex-end',
            marginTop: '1.5rem'
          }}>
            {pengeluaranId && (
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  width: '4rem',
                  height: '4rem',
                  padding: 0,
                  backgroundColor: 'transparent',
                  color: '#f24949',
                  border: '2px solid #f24949',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash2 size={20} />
              </button>
            )}
            <button
              type="submit"
              disabled={createPengeluaran.isPending || updatePengeluaran.isPending}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.25rem',
                borderRadius: '10px',
                backgroundColor: '#31509e',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                opacity: (createPengeluaran.isPending || updatePengeluaran.isPending) ? 0.6 : 1
              }}
            >
              {createPengeluaran.isPending || updatePengeluaran.isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { X, Trash2 } from "lucide-react"
import { useBudgets } from "@/hooks/use-budgets"
import { BudgetFormData } from "@/types/budget"

type BudgetFormProps = {
  isOpen: boolean
  onClose: () => void
  budgetId?: string
  initialData?: BudgetFormData
}

export default function BudgetForm({ 
  isOpen, 
  onClose, 
  budgetId,
  initialData 
}: BudgetFormProps) {
  const { createBudget, updateBudget, deleteBudget } = useBudgets()
  const [formData, setFormData] = useState<BudgetFormData>({
    namaBudget: "",
    total: 0,
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ namaBudget: "", total: 0 })
    }
  }, [initialData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (budgetId) {
      await updateBudget.mutateAsync({ id: budgetId, data: formData })
    } else {
      await createBudget.mutateAsync(formData)
    }
    
    onClose()
    setFormData({ namaBudget: "", total: 0 })
  }

  const handleDelete = async () => {
    if (!budgetId) return
    
    const confirmed = confirm("Apakah ingin menghapus budget ini?")
    if (confirmed) {
      await deleteBudget.mutateAsync(budgetId)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    // Modal Overlay
    <div style={{
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
          backgroundColor: 'rgb(12, 19, 41)',
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
            color: '#d4dbee',
            margin: 0
          }}>
            {budgetId ? "Update Budget" : "Tambah Budget"}
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
              htmlFor="namaBudget"
              style={{
                display: 'block',
                color: '#9e9e9e',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              Nama Budget
            </label>
            <input
              id="namaBudget"
              type="text"
              value={formData.namaBudget}
              onChange={(e) => setFormData({ ...formData, namaBudget: e.target.value })}
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
              htmlFor="total"
              style={{
                display: 'block',
                color: '#9e9e9e',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              Jumlah Budget
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
                id="total"
                type="number"
                value={formData.total || ""}
                onChange={(e) => setFormData({ ...formData, total: Number(e.target.value) })}
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

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: budgetId ? 'space-between' : 'flex-end',
            marginTop: '1.5rem'
          }}>
            {budgetId && (
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
              disabled={createBudget.isPending || updateBudget.isPending}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.25rem',
                borderRadius: '10px',
                backgroundColor: '#31509e',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                opacity: (createBudget.isPending || updateBudget.isPending) ? 0.6 : 1
              }}
            >
              {createBudget.isPending || updateBudget.isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
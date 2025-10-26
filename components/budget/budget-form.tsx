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
    
    try {
      if (budgetId) {
        await updateBudget.mutateAsync({ id: budgetId, data: formData })
      } else {
        await createBudget.mutateAsync(formData)
      }
      
      onClose()
      setFormData({ namaBudget: "", total: 0 })
    } catch (error) {
      console.error("Error submitting budget:", error)
    }
  }

  const handleDelete = async () => {
    if (!budgetId) return
    
    const confirmed = confirm("Apakah ingin menghapus budget ini?")
    if (confirmed) {
      try {
        await deleteBudget.mutateAsync({
          id: budgetId,
          namaBudget: formData.namaBudget
        })
        onClose()
      } catch (error) {
        console.error("Error deleting budget:", error)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 5, 5, 0.5)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-primary-bg"
        style={{
          width: '100%',
          maxWidth: '40rem',
          padding: '2rem',
          borderRadius: '1.5rem',
          animation: 'slideup 0.5s ease-in-out',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h4 
            className="text-primary-title"
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: 0
            }}
          >
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="namaBudget"
              className="text-secondary"
              style={{
                display: 'block',
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
              className="text-primary border-placeholder"
              style={{
                width: '100%',
                fontSize: '1.5rem',
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: 'transparent',
                border: '1px solid',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="total"
              className="text-secondary"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              Jumlah Budget
            </label>
            <div style={{ position: 'relative' }}>
              <span 
                className="text-secondary"
                style={{
                  fontSize: '1.5rem',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '1rem'
                }}
              >
                Rp
              </span>
              <input
                id="total"
                type="number"
                value={formData.total || ""}
                onChange={(e) => setFormData({ ...formData, total: Number(e.target.value) })}
                required
                min="0"
                className="text-primary border-placeholder"
                style={{
                  width: '100%',
                  fontSize: '1.5rem',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: budgetId ? 'space-between' : 'flex-end',
            marginTop: '1.5rem'
          }}>
            {budgetId && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteBudget.isPending}
                style={{
                  width: '4rem',
                  height: '4rem',
                  padding: 0,
                  backgroundColor: 'transparent',
                  color: '#f24949',
                  border: '2px solid #f24949',
                  borderRadius: '10px',
                  cursor: deleteBudget.isPending ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: deleteBudget.isPending ? 0.5 : 1
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
                cursor: (createBudget.isPending || updateBudget.isPending) ? 'not-allowed' : 'pointer',
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
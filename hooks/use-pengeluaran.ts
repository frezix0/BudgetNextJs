import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PengeluaranFormData } from "@/types/budget"
import { useNotification } from "./use-notification"
import { useRouter } from "next/navigation"

export function usePengeluaran(budgetId: string) {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()
  const router = useRouter()

  const createPengeluaran = useMutation({
    mutationFn: async (data: PengeluaranFormData) => {
      const res = await fetch("/api/pengeluaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, budgetId }),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Gagal menambah pengeluaran")
      }
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["budget", budgetId] })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      showNotification(`✔️ Pengeluaran ${variables.namaPengeluaran} berhasil disimpan!`)
      router.refresh()
    },
    onError: (error: Error) => {
      showNotification(`❌ ${error.message}`)
    }
  })

  const updatePengeluaran = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PengeluaranFormData }) => {
      const res = await fetch(`/api/pengeluaran/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Gagal mengupdate pengeluaran")
      }
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["budget", budgetId] })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      showNotification(`✔️ Pengeluaran ${variables.data.namaPengeluaran} berhasil diupdate!`)
      router.refresh()
    },
    onError: (error: Error) => {
      showNotification(`❌ ${error.message}`)
    }
  })

  const deletePengeluaran = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/pengeluaran/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Gagal menghapus pengeluaran")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", budgetId] })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      showNotification("✔️ Pengeluaran berhasil dihapus!")
      router.refresh()
    },
    onError: (error: Error) => {
      showNotification(`❌ ${error.message}`)
    }
  })

  return {
    createPengeluaran,
    updatePengeluaran,
    deletePengeluaran,
  }
}
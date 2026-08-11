import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { BudgetFormData, BudgetWithPengeluaran } from "@/types/budget"
import { useNotification } from "./use-notification"
import { useRouter } from "next/navigation"

export function useBudgets() {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()
  const router = useRouter()

  const { data: budgets, isLoading } = useQuery<BudgetWithPengeluaran[]>({
    queryKey: ["budgets"],
    queryFn: async () => {
      const res = await fetch("/api/budgets")
      if (!res.ok) throw new Error("Gagal mengambil data budget")
      return res.json()
    },
  })

  const createBudget = useMutation({
    mutationFn: async (data: BudgetFormData) => {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Gagal membuat budget")
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      showNotification(`✔️ Budget ${variables.namaBudget} berhasil disimpan!`)
      router.refresh()
    },
  })

  const updateBudget = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BudgetFormData }) => {
      const res = await fetch(`/api/budgets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Gagal mengupdate budget")
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      queryClient.invalidateQueries({ queryKey: ["budget", variables.id] })
      showNotification(`✔️ Budget ${variables.data.namaBudget} berhasil diupdate!`)
      router.refresh()
    },
  })

  const deleteBudget = useMutation({
    mutationFn: async ({ id, namaBudget }: { id: string; namaBudget: string }) => {
      const res = await fetch(`/api/budgets/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Gagal menghapus budget")
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      showNotification(`✔️ Budget ${variables.namaBudget} berhasil dihapus!`)
      router.push("/")
      router.refresh()
    },
  })

  return {
    budgets: budgets ?? [],
    isLoading,
    createBudget,
    updateBudget,
    deleteBudget,
  }
}

export function useBudget(id: string) {
  return useQuery<any>({
    queryKey: ["budget", id],
    queryFn: async () => {
      const res = await fetch(`/api/budgets/${id}`)
      if (!res.ok) throw new Error("Gagal mengambil data budget")
      return res.json()
    },
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PengeluaranFormData } from "@/types/budget"
import { useNotification } from "./use-notification"

export function usePengeluaran(budgetId: string) {
    const queryClient = useQueryClient()
    const { showNotification } = useNotification()

    const createPengeluaran = useMutation({
        mutationFn: async (data: PengeluaranFormData) => {
            const res = await fetch("/api/pengeluaran", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, budgetId }),
            })
            if (!res.ok) throw new Error("Gagal menambah pengeluaran")
            return res.json()
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["budget", budgetId] })
            queryClient.invalidateQueries({ queryKey: ["budgets"] })
            showNotification(`✔️ Pengeluaran ${variables.namaPengeluaran} berhasil disimpan!`)
        },
    })

    const updatePengeluaran = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: PengeluaranFormData }) => {
            const res = await fetch(`/api/pengeluaran/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error("Gagal mengupdate pengeluaran")
            return res.json()
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["budget", budgetId] })
            queryClient.invalidateQueries({ queryKey: ["budgets"] })
            showNotification(`✔️ Pengeluaran ${variables.data.namaPengeluaran} berhasil diupdate!`)
        },
    })

    const deletePengeluaran = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/pengeluaran/${id}`, {
                method: "DELETE",
            })
            if (!res.ok) throw new Error("Gagal menghapus pengeluaran")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budget", budgetId] })
            queryClient.invalidateQueries({ queryKey: ["budgets"] })
            showNotification("✔️ Pengeluaran berhasil dihapus!")
        },
    })

    return {
        createPengeluaran,
        updatePengeluaran,
        deletePengeluaran,
    }
}
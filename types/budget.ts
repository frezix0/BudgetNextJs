import { Budget, Pengeluaran } from "@prisma/client"

export type BudgetWithPengeluaran = Budget & {
    pengeluaran: Pengeluaran[]
}

export type BudgetFormData = {
    namaBudget: string
    total: number
}

export type PengeluaranFormData = {
    namaPengeluaran: string
    jumlah: number
    tanggal: string
}

export type SortOption = "tanggal|desc" | "namaPengeluaran|asc" | "jumlah|asc" | "jumlah|desc"
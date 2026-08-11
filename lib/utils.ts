import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SortOption } from "@/types/budget"
import { Pengeluaran } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatRupiah(angka: number | string): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(angka))
}

export function generateId(): string {
    return new Date().getTime().toString()
}

export function sortPengeluaran(
    pengeluaran: Pengeluaran[],
    sortBy: SortOption
): Pengeluaran[] {
    const [field, order] = sortBy.split("|") as [string, "asc" | "desc"]

    const direction = order === "asc" ? 1 : -1
 
    const getValue = (p: Pengeluaran): number | string => {
        if (field === "jumlah") return Number(p.jumlah)
        if (field === "tanggal") return new Date(p.tanggal).getTime()
        return p.namaPengeluaran.toLowerCase()
    }
 
    return [...pengeluaran].sort((a, b) => {
        const aValue = getValue(a)
        const bValue = getValue(b)
        if (aValue === bValue) return 0
        return aValue > bValue ? direction : -direction
    })
}
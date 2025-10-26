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

    return pengeluaran.sort((a, b) => {
        let aValue: any
        let bValue: any

        if (field === "jumlah") {
            aValue = Number(a.jumlah)
            bValue = Number(b.jumlah)
        } else if (field === "tanggal") {
            aValue = new Date(a.tanggal).getTime()
            bValue = new Date(b.tanggal).getTime()
        } else if (field === "namaPengeluaran") {
            aValue = a.namaPengeluaran.toLowerCase()
            bValue = b.namaPengeluaran.toLowerCase()
        }

        if (order === "asc") {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })
}
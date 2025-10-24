import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SortOption } from "@/types/budget"

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

export function sortPengeluaran<T extends {
    namaPengeluaran: string
    jumlah: number | string
    tanggal: Date | string
}>(
    pengeluaran: T[],
    sortBy: SortOption
): T[] {
    const [field, order] = sortBy.split("|") as [keyof T, "asc" | "desc"]

    return pengeluaran.sort((a, b) => {
        let aValue: any = a[field]
        let bValue: any = b[field]

        // Convert to numbers for jumlah comparison
        if (field === "jumlah") {
        aValue = Number(aValue)
        bValue = Number(bValue)
        }

        // Convert to date for tanggal comparison
        if (field === "tanggal") {
            aValue = new Date(aValue).getTime()
            bValue = new Date(bValue).getTime()
        }

        if (order === "asc") {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })
}
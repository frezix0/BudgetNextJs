import { z } from "zod"

export const budgetSchema = z.object({
  namaBudget: z.string().min(1, "Nama budget harus diisi"),
  total: z.coerce.number().positive("Total budget harus lebih dari 0"),
})

export const pengeluaranSchema = z.object({
  namaPengeluaran: z.string().min(1, "Nama pengeluaran harus diisi"),
  jumlah: z.coerce.number().positive("Jumlah harus lebih dari 0"),
  tanggal: z.string().min(1, "Tanggal harus diisi"),
})

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
})

export type BudgetFormData = z.infer<typeof budgetSchema>
export type PengeluaranFormData = z.infer<typeof pengeluaranSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
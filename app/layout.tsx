import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import Notification from "@/components/layout/notification"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BudgetApp - Kelola Budget Anda",
  description: "Aplikasi manajemen budget sederhana dan modern",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={outfit.className}>
        <Providers>
          <Notification />
          {children}
        </Providers>
      </body>
    </html>
  )
}
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="mb-4 text-6xl font-bold text-primary-title">404</h1>
            <p className="mb-8 text-xl text-secondary">Halaman tidak ditemukan</p>
            <Link
                href="/"
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
            >
                <ArrowLeft className="h-5 w-5" />
                Kembali ke Beranda
            </Link>
        </div>
    )
}
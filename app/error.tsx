"use client"

import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h2 className="mb-4 text-2xl font-bold text-primary-title">
                Terjadi Kesalahan
            </h2>
            <p className="mb-8 text-secondary">
                Maaf, terjadi kesalahan saat memuat halaman
            </p>
            <button
                onClick={reset}
                className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
            >
                Coba Lagi
            </button>
        </div>
    )
}
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
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '32rem',
                textAlign: 'center'
            }}>
                {/* Error Icon */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(242, 73, 73, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <svg 
                            width="60" 
                            height="60" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="var(--danger)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: 'var(--primary-title)',
                    marginBottom: '1rem'
                }}>
                    Terjadi Kesalahan
                </h2>
                
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--secondary)',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6'
                }}>
                    Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.
                </p>

                {/* Error Details */}
                {process.env.NODE_ENV === 'development' && (
                    <div style={{
                        backgroundColor: 'var(--bg-hover)',
                        border: '1px solid var(--placeholder)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        marginBottom: '2rem',
                        textAlign: 'left',
                        maxHeight: '200px',
                        overflow: 'auto'
                    }}>
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--danger)',
                            fontFamily: 'monospace',
                            wordBreak: 'break-word'
                        }}>
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={reset}
                    style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'white',
                        backgroundColor: 'var(--primary)',
                        border: 'none',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(49, 80, 158, 0.3)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(49, 80, 158, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(49, 80, 158, 0.3)'
                    }}
                >
                    Coba Lagi
                </button>
            </div>
        </div>
    )
}
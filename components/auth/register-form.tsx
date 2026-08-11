"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"
import AuthInput from "./auth-input"
import { AlertCircle } from "lucide-react"

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({ name: "", email: "", password: "", confirmPassword: "" })

    let hasError = false
    const newFieldErrors = { name: "", email: "", password: "", confirmPassword: "" }

    if (!formData.name) {
      newFieldErrors.name = "Nama wajib diisi"
      hasError = true
    }
    if (!formData.email) {
      newFieldErrors.email = "Email wajib diisi"
      hasError = true
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newFieldErrors.email = "Format email tidak valid"
      hasError = true
    }
    if (!formData.password) {
      newFieldErrors.password = "Password wajib diisi"
      hasError = true
    } else if (formData.password.length < 6) {
      newFieldErrors.password = "Password minimal 6 karakter"
      hasError = true
    }
    if (!formData.confirmPassword) {
      newFieldErrors.confirmPassword = "Konfirmasi password wajib diisi"
      hasError = true
    } else if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = "Password tidak cocok"
      hasError = true
    }

    if (hasError) {
      setFieldErrors(newFieldErrors)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Pendaftaran gagal. Email mungkin sudah terdaftar.")
        return
      }

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

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
        maxWidth: '28rem',
      }}>
        {/* Logo & Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <Image 
              src="/img/bag.png" 
              alt="Budget App" 
              width={56} 
              height={56}
              priority
            />
            <h1 
            className="text-primary-title"
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',

            }}>
              BudgetApp.
            </h1>
          </div>
          <p 
          className="text-secondary"
          style={{
            fontSize: '1.125rem',
          }}>
            Buat akun baru
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: 'var(--auth-card-bg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--auth-card-border)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          boxShadow: 'var(--auth-card-shadow)'
        }}>
          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              backgroundColor: 'var(--auth-error-bg)',
              color: 'var(--auth-error-text)',
              padding: '1rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}
 
          <form onSubmit={handleSubmit} noValidate>
            <AuthInput
              label="Nama"
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" })
              }}
              placeholder="Nama lengkap"
              wrapperMarginBottom="1.25rem"
              error={fieldErrors.name}
            />
 
            <AuthInput
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" })
              }}
              placeholder="nama@email.com"
              wrapperMarginBottom="1.25rem"
              error={fieldErrors.email}
            />
 
            <AuthInput
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" })
              }}
              placeholder="Minimal 6 karakter"
              minLength={6}
              wrapperMarginBottom="1.25rem"
              error={fieldErrors.password}
            />
 
            <AuthInput
              label="Konfirmasi Password"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value })
                if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: "" })
              }}
              placeholder="Ulangi password"
              error={fieldErrors.confirmPassword} 
            />
 
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                marginTop: '0.5rem',
                fontSize: '1rem',
                fontWeight: '700',
                color: 'white',
                backgroundColor: '#31509e',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
                boxShadow: '0 4px 12px rgba(49, 80, 158, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#2a4585'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(49, 80, 158, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#31509e'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(49, 80, 158, 0.3)'
              }}
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </button>
          </form>
 
          <div style={{
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--auth-muted)'
            }}>
              Sudah punya akun?{" "}
              <Link
                href="/login"
                style={{
                  color: '#2a4585',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
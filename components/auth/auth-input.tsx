"use client"
 
import { AlertCircle } from "lucide-react"
import { InputHTMLAttributes, useState } from "react"
 
interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  wrapperMarginBottom?: string
  error?: string
}
 
export default function AuthInput({
  label,
  id,
  wrapperMarginBottom = "1.5rem",
  error,
  type,
  value,
  ...props
}: AuthInputProps) {

  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type
  const hasValue = value !== undefined && value !== null && String(value).length > 0
    
  return (
    <div style={{ marginBottom: wrapperMarginBottom }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "0.5rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--auth-label)",
          transition: "color 0.2s"
        }}
      >
        {label}
      </label>

      <div style={{ position: "relative" }}>
        <input
            id={id}
            type={inputType}
            value={value}
            {...props}
            style={{
            width: "100%",
            padding: "0.875rem 1rem",
            paddingRight: isPassword ? "2.5rem" : "1rem",
            fontSize: "1rem",
            border: `2px solid ${error ? "var(--auth-error-text)" : "var(--auth-input-border)"}`,
            borderRadius: "0.75rem",
            backgroundColor: "var(--auth-input-bg)",
            color: "var(--auth-input-text)",
            outline: "none",
            transition: "all 0.2s",
            }}
            onFocus={(e) => {
            e.target.style.borderColor = "#31509e"
            e.target.style.backgroundColor = "var(--auth-input-bg-focus)"
            e.target.style.boxShadow = "0 0 0 3px rgba(49, 80, 158, 0.15)"
            }}
            onBlur={(e) => {
            e.target.style.borderColor = "var(--auth-input-border)"
            e.target.style.backgroundColor = "var(--auth-input-bg)"
            e.target.style.boxShadow = "none"
            }}
        />

        {/* Reveal Password */}
        {isPassword && hasValue && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              padding: "0.25rem"
            }}
            title={showPassword ? "Sembunyikan password" : "Lihat password"}
          >
            {showPassword ? (
              // Eye-off icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              // Eye icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error Field */}
      {error && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          margin: "0.5rem 0 0 0",
          fontSize: "0.8rem",
          color: "var(--auth-error-text)",
          fontWeight: 500
        }}>
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          {error}
        </div>
      )}
    </div>
  )
}
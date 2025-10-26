"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

export default function ThemeSwitcher() {
  const { isDark, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <button style={{
        padding: '0.5rem',
        borderRadius: '2rem',
        border: '2px solid rgba(217, 217, 217, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        width: '40px',
        height: '40px'
      }}>
        <div style={{ width: '20px', height: '20px' }} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem',
        borderRadius: '2rem',
        border: '2px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(49, 80, 158, 0.3)',
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDark 
          ? 'rgba(255, 255, 255, 0.2)' 
          : 'rgba(49, 80, 158, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isDark 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(255, 255, 255, 0.8)'
      }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon size={20} color="#d4dbee" />
      ) : (
        <Sun size={20} color="#31509e" />
      )}
    </button>
  )
}
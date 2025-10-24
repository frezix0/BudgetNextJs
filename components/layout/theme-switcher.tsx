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
        border: '2px solid rgba(217, 217, 217, 0.5)',
        color: 'white',
        background: 'transparent',
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
        border: '2px solid rgba(217, 217, 217, 0.5)',
        color: 'white',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
      aria-label="Toggle theme"
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
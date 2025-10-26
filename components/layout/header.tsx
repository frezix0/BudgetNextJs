import Image from "next/image"
import ThemeSwitcher from "./theme-switcher"

export default function Header() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Theme Switcher */}
      <div style={{
        position: 'absolute',
        top: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <ThemeSwitcher />
      </div>

      {/* Logo & Title */}
      <header 
        className="text-primary-title"
        style={{
          width: '100%',
          maxWidth: '40rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '6rem 1rem 4rem'
        }}
      >
        <Image 
          src="/img/bag.png" 
          alt="Budget App" 
          width={48} 
          height={48}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        />
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          margin: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          BudgetApp.
        </h1>
      </header>
    </div>
  )
}
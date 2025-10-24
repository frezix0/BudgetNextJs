import Image from "next/image"
import ThemeSwitcher from "./theme-switcher"

export default function Header() {
  return (
    <header style={{
      width: '100%',
      maxWidth: '40rem',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '6rem 1rem 4rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '3rem',
        right: '1rem'
      }}>
        <ThemeSwitcher />
      </div>
      
      <Image 
        src="/img/bag.png" 
        alt="Budget App" 
        width={48} 
        height={48}
      />
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'white',
        margin: 0
      }}>
        BudgetApp.
      </h1>
    </header>
  )
}
import { useEffect, useState } from "react"
import Button from "./Button"

// Header
const headerBase = "fixed top-0 left-0 w-full z-50 transition-all duration-300"
const headerScrolled = `${headerBase} bg-white/10 backdrop-blur-xl border-b border-white/10`
const headerTop = `${headerBase} bg-transparent`

// Inner
const innerBase = "flex justify-between items-center px-6 py-1 max-w-[1440px] mx-auto"

// Logo
const logoBase = "flex items-center gap-2 text-primary font-bold text-xl"
const logoImg = "h-15 w-auto"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={scrolled ? headerScrolled : headerTop}>
      <div className={innerBase}>

        {/* Logo */}
        <div className={logoBase}>
          <img src="assets/Logo.png" alt="Logo GoGoMap" className={logoImg} />
        </div>

        {/* CTA */}
        <Button label="Entrar en la App" href="/login" variant="primary" />

      </div>
    </header>
  )
}
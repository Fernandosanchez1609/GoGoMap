

// Footer
const footer = "relative px-6 py-10 border-t border-white/10 bg-black/10 backdrop-blur-xl"

// Inner
const inner = "flex flex-col items-center gap-6 max-w-sm mx-auto text-center"

// Logo wrapper
const logoWrapper = "flex flex-col items-center"
const logoContainer = "relative flex items-center justify-center"
const logoGlow = "absolute w-32 h-32 rounded-full bg-white/30 blur-2xl"
const logoImg = "relative h-16 w-auto drop-shadow-lg"

// Links
const links = "flex flex-wrap justify-center gap-6"
const link = "text-white/60 text-sm hover:text-white transition-colors"

// Copy
const copy = "text-white/40 text-xs"

export default function Footer() {
  return (
    <footer className={footer}>
      <div className={inner}>

        {/* Logo */}
        <div className={logoWrapper}>
          <div className={logoContainer}>
            <div className={logoGlow} />
              <img src="assets/Logo.svg" alt="Logo GoGoMap" className={logoImg} />
          </div>
        </div>

        {/* Links */}
        <nav className={links}>
          <a href="#features" className={link}>Funciones</a>
          <a href="#ods" className={link}>ODS</a>
          <a href="#how-it-works" className={link}>Cómo funciona</a>
        </nav>

        {/* Copy */}
        <p className={copy}>
          © 2026 GoGoMap · Hecho con cariño por los Super Chachi Pistachi · Málaga
        </p>

      </div>
    </footer>
  )
}
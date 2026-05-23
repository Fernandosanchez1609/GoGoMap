

// Footer
const footer = "relative px-6 py-10 border-t border-white/10 bg-black/20 backdrop-blur-md"

// Inner
const inner = "flex flex-col items-center gap-6 max-w-sm mx-auto text-center"

// Logo
const logoBase = "flex items-center gap-2 text-primary font-bold text-xl"
const logoImg = "h-15 w-auto"

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
        <div className={logoBase}>
          <img src="assets/Logo.png" alt="Logo GoGoMap" className={logoImg} />
        </div>

        {/* Links */}
        <nav className={links}>
          <a href="#features" className={link}>Funciones</a>
          <a href="#ods" className={link}>ODS</a>
          <a href="#how-it-works" className={link}>Cómo funciona</a>
          <a href="#karma" className={link}>Karma</a>
        </nav>

        {/* Copy */}
        <p className={copy}>
          © 2026 GoGoMap · Hecho con cariño por los Super Chachi Pistachi · Málaga
        </p>

      </div>
    </footer>
  )
}
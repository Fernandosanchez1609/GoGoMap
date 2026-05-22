import { useEffect, useState } from "react"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', hendleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-50
                backdrop-blur-xl border-b border-white/10
                transition-all duration-300
                ${scrolled ? 'bg-surface/95' : 'bg-surface/80'}
            `}
        >
            <div className="flex justify-between items-center px-6 py-4 max-w-[1440px] mx-auto">
                {/* Logo */}
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <img src="assets/Logo.png" alt="Logo GoGoMap" />
                </div>

                {/* Links */}
                <nav className="hidden md:flex gap-8">
                    <a href="#features" className="text-on-surface-variant hover:text-primary transition-colors">Funciones</a>
                    <a href="#ods" className="text-on-surface-variant hover:text-primary transition-colors">ODS</a>
                    <a href="#karma" className="text-on-surface-variant hover:text-primary transition-colors">Karma</a>
                </nav>

                {/* CTA */}
                href="/login"
                className="border border-primary/40 text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/10 transition-all"
            
                Entrar a la App
                
            </div>
        </header>
    )
}
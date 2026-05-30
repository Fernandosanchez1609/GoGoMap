import { Link } from "react-router-dom"

const header = "bg-app-bg px-4 pt-5 pb-3 flex items-center justify-between w-full"
const logoBase = "flex items-center gap-2 text-primary font-bold text-xl"
const logoImg = "h-15"
const texto = "h-5"
const homeButton = "flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm font-medium"

// Componente
export default function Header() {
  return (
    <header className={header}>
      <Link to="/" className={homeButton} title="Volver al inicio">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="hidden sm:inline">Inicio</span>
      </Link>

      <Link to="/map" className={logoBase}>
        <img src="/assets/SoloLogo-removebg.svg" alt="Logo GoGoMap" className={logoImg} />
        <img src="/assets/SoloLetras-removebg.svg" alt="Logo GoGoMap" className={texto} />  
      </Link>

      <div className="w-20"></div>
    </header>
  )
}
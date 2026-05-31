import { Link } from "react-router-dom"

const header = "bg-app-bg px-4 pt-5 pb-3 flex items-center w-full"
const headerInner = "max-w-screen-xl mx-auto w-full flex items-center justify-center"
const logoBase = "flex items-center gap-2 text-primary font-bold text-xl"
const logoImg = "h-15"
const texto = "h-5"

// Componente
export default function Header() {
  return (
    <header className={header}>
      <div className={headerInner}>
        <Link to="/map" className={logoBase}>
          <img src="/assets/SoloLogo-removebg.svg" alt="Logo GoGoMap" className={logoImg} />
          <img src="/assets/SoloLetras-removebg.svg" alt="Logo GoGoMap" className={texto} />  
        </Link>
      </div>
    </header>
  )
}
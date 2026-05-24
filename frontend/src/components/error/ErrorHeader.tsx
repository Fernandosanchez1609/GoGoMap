// Estilos
const header = "w-full flex items-center justify-center py-1 border-b border-gray-200 gap-5"
const logo = "h-15"
const texto = "h-5"

export default function ErrorHeader404() {
    return (
        <header className={header}>
            <img src="/assets/SoloLogo-removebg.svg" alt="Logo GoGoMap" className={logo} />
            <img src="/assets/SoloLetras-removebg.svg" alt="Logo GoGoMap" className={texto} />
        </header>
    )
}
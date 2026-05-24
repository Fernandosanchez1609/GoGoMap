// Estilos
const header = "w-full flex items-center justify-center py-1 border-b border-gray-200"
const logo = "h-15"

export default function ErrorHeader404() {
    return (
        <header className={header}>
            <img src="/assets/Logo.png" alt="Logo GoGoMap" className={logo} />
        </header>
    )
}
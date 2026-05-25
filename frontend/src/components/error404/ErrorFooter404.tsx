// Estilos
const footer = "w-full mt-auto py-3 border-t border-gray-400 flex flex-col items-center gap-2"
const brand = "text-green-800 font-bold text-lg"
const copy = "text-gray-400 text-xs"

export default function ErrorFooter404() {
    return (
        <footer className={footer}>
            <span className={brand}>GoGoMap</span>
            <p className={copy}>© 2026 GoGoMap · Hecho con cariño por los Super Chachi Pistachi · Málaga</p>
        </footer>
    )
}
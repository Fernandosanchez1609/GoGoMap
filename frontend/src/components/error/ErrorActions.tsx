import { useNavigate } from "react-router-dom"
import { RefreshCw } from "lucide-react"

// Estilos
const container = "w-full mt-4 flex flex-col items-center gap-4 max-w-sm"
const retryButton = "w-full h-14 rounded-full bg-green-800 hover:bg-green-900 text-white text-base font-bold shadow-lg flex items-center justify-center gap-2"
const backLink = "text-green-700 font semibold underline underline-offset-2 cursor-pointer"
const icon = "w-5 h-5"

export default function ErrorActions() {
    const navigate = useNavigate()

    return (
        <div className={container}>
            {/* BOTÓN REINTENTAR */}
            <button className={retryButton} onClick={() => window.location.reload()}>
                <RefreshCw className={icon} />
                REINTENTAR
            </button>

            {/* ENLACE VOLVER */}
            <span className={backLink} onClick={() => navigate(-1)}>
                Volver
            </span>
        </div>
    )
}
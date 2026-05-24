import { useNavigate } from "react-router-dom"

// Estilos
const container = "w-full mt-4 flex flex-col items-center gap-4 max-w-sm"
const backButton = "w-full h-14 rounded-full bg-green-800 hover:bg-green-900 text-white text-base font-bold shadow-lg flex items-center justify-center gap-2"
const icon = "w-5 h-5 invert"

export default function ErrorActions404() {
    const navigate = useNavigate()

    return (
        <div className={container}>
            {/* BOTÓN REINTENTAR */}
            <button className={backButton} onClick={() => {navigate("/map")}}>
                <img src="/assets/icons/mapa.svg" alt="Mapa" className={icon} />
                VOLVER AL MAPA
            </button>            
        </div>
    )
}
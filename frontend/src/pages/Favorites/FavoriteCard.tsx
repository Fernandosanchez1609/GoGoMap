import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { PointDetail } from "@/api/types/index"
import userService from "@/api/services/userService"

// Estilos (hemos añadido cursor-pointer y hover a la tarjeta)
const card        = "bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-start w-full cursor-pointer hover:bg-gray-50 transition-colors"
const odsChip     = "w-20 h-20 shrink-0 rounded-xl overflow-hidden"
const odsImg      = "w-full h-full object-cover"
const body        = "flex-1 min-w-0"
const topRow      = "flex items-start justify-between gap-2"
const name        = "font-bold text-gray-900 text-base leading-tight"
const odsName     = "text-green-600 font-semibold text-sm mt-0.5"
const bottomRow   = "flex items-center gap-2 mt-2"
const statusOpen  = "text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700"
const statusClose = "text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 text-gray-500"
const statusBroken  = "text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600"

function getStatusStyle(status: string) {
    if(status === "active") return statusOpen
    if(status === "closed") return statusClose
    return statusBroken
}

function translateStatus(status: string) {
    if(status === "active") return "Funcionando"
    if(status === "closed") return "Cerrado"
    return status
}

export default function FavoriteCard({ place, onFavoriteRemoved }: { place: PointDetail; onFavoriteRemoved: (id: number) => void }) {
    const navigate = useNavigate();
    
    // Inicia en true porque si está en esta lista, sabemos que es favorito
    const [isFavorite, setIsFavorite] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const odsImageNumber = place.odsNumber ? String(place.odsNumber).padStart(2, "0") : "01"

    // Función para manejar el clic SOLO en la estrella
    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Clave: evita que el clic "atraviese" y active la navegación de la tarjeta
        if (!place.id) return;

        setIsLoading(true);
        try {
            if (isFavorite) {
                await userService.removeFavorite(place.id);
                setIsFavorite(false); // Cambia la estrella a gris
                onFavoriteRemoved(place.id); // Notifica al padre para actualizar la lista
            } else {
                await userService.addFavorite(place.id);
                setIsFavorite(true); // Cambia la estrella a amarilla
            }
        } catch (error) {
            console.error("Error al modificar favorito:", error);
        } finally {
            setIsLoading(false);
        }
    };

   // Función para manejar el clic en el resto de la tarjeta
    const handleCardClick = () => {
        if (!place.id) return;
        
        // Navegamos al mapa pasándole solo el ID. El mapa ya buscará dónde está.
        navigate('/map', { 
            state: { 
                selectedPointId: place.id 
            } 
        });
    };

    return (
        <div className={card} onClick={handleCardClick}>
            <div className={odsChip}>
                <img src={`/assets/ods/S-WEB-Goal-${odsImageNumber}.png`} alt={`ODS ${place.odsNumber}`} className={odsImg} />
            </div>

            <div className={body}>
                <div className={topRow}>
                    <h3 className={name}>{place.title}</h3>
                    
                    {/* Botón de la Estrella */}
                    <button 
                        onClick={handleToggleFavorite}
                        disabled={isLoading}
                        className={`text-2xl shrink-0 transition-colors ${
                            isFavorite ? "text-yellow-400 hover:text-yellow-500" : "text-gray-300 hover:text-yellow-400"
                        } disabled:opacity-50`}
                        title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                        ★
                    </button>
                </div>

                <p className={odsName}>ODS {place.odsNumber}</p>
                <p className="text-gray-500 text-sm mt-1">{place.address}</p>

                <div className={bottomRow}>
                    <span className={getStatusStyle(place.status || "")}>
                        {translateStatus(place.status || "")}
                    </span>
                </div>
            </div>
        </div>
    )
}
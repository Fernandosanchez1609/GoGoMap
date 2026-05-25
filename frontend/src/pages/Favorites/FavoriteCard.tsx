import type { FavoritePlace } from "./data/Favorites.mock"

// Estilos
const card        = "bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-start w-full"
const odsChip     = "w-20 h-20 shrink-0 rounded-xl overflow-hidden"
const odsImg      = "w-full h-full object-cover"
const body        = "flex-1 min-w-0"
const topRow      = "flex items-start justify-between gap-2"
const name        = "font-bold text-gray-900 text-base leading-tight"
const star        = "text-yellow-400 text-xl shrink-0"
const odsName     = "text-green-600 font-semibold text-sm mt-0.5"
const bottomRow   = "flex items-center gap-2 mt-2"
const statusOpen  = "text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700"
const statusClose = "text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 text-gray-500"
const statusBroken  = "text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600"
const distance    = "text-gray-400 text-xs"

// Helper:  devuelve los estilos del estado según su valor
function getStatusStyle(status: FavoritePlace["status"]) {
    if(status === "Abierto") return statusOpen
    if(status === "Cerrado") return statusClose
    return statusBroken
}

// Componente
export default function FavoriteCard({ place }: { place: FavoritePlace }) {
    return (
        <div className={card}>
            {/* Chip ODS */}
            <div className={odsChip}>
                <img src={`/assets/ods/S-WEB-Goal-${String(place.ods).padStart(2, "0")}.png`} alt={`ODS ${place.ods}`} className={odsImg} />
            </div>

            {/* Contenido */}
            <div className={body}>
                <div className={topRow}>
                    <h3 className={name}>{place.name}</h3>
                    <span className={star}>★</span>
                </div>

                <p className={odsName}>{place.odsName}</p>
                <p className="text-gray-500 text-sm mt-1">{place.address}</p>

                <div className={bottomRow}>
                    <span className={getStatusStyle(place.status)}>{place.status}</span>
                    <span className={distance}>A {place.distance}</span>
                </div>

            </div>
        </div>
    )
}
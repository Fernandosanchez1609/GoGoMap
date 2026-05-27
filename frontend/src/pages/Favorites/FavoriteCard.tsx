import type { FavoritePlaceAPI } from '../../services/favorites'

// Estilos (extraTailwind)
const card     = "bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-start w-full"
const odsChip  = "w-20 h-20 shrink-0 rounded-xl overflow-hidden"
const odsImg   = "w-full h-full object-cover"
const body     = "flex-1 min-w-0"
const topRow   = "flex items-start justify-between gap-2"
const name     = "font-bold text-gray-900 text-base leading-tight"
const star     = "text-yellow-400 text-xl shrink-0"
const odsName  = "text-green-600 font-semibold text-sm mt-0.5"
const coords   = "text-gray-400 text-xs mt-1"

// Componente
export default function FavoriteCard({ place }: { place: FavoritePlaceAPI }) {
  return (
    <div className={card}>

      {/* Chip ODS */}
      <div className={odsChip}>
        <img
          src={`/assets/ods/S-WEB-Goal-${String(place.odsNumber).padStart(2, "0")}.png`}
          alt={`ODS ${place.odsNumber}`}
          className={odsImg}
        />
      </div>

      {/* Contenido */}
      <div className={body}>
        <div className={topRow}>
          <h3 className={name}>{place.title}</h3>
          <span className={star}>★</span>
        </div>

        <p className={odsName}>{place.ods.replace(/_/g, ' ')}</p>
        <p className={coords}>📍 {place.latitude}, {place.longitude}</p>
      </div>

    </div>
  )
}
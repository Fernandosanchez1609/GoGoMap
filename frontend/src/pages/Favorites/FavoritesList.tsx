import { useFavorites } from '../../hooks/useFavorites'
import FavoriteCard from './FavoriteCard'

// Estilos (extraTailwind)
const list     = "flex flex-col gap-4 px-4 pt-4 w-full"
const loading  = "flex justify-center items-center py-20 text-green-600 font-semibold"
const error    = "flex justify-center items-center py-20 text-red-500 font-semibold"
const empty    = "flex flex-col items-center justify-center py-20 px-6 text-center"
const emptyIcon = "text-6xl mb-4"
const emptyText = "text-gray-700 font-semibold text-lg mb-1"
const emptyDesc = "text-gray-400 text-sm"

// Componente
export default function FavoritesList({ selectedOds }: { selectedOds: number | null }) {
  const { favorites, loading: isLoading, error: hasError } = useFavorites()

  if (isLoading) {
    return <div className={loading}>Cargando favoritos...</div>
  }

  if (hasError) {
    return <div className={error}>⚠️ {hasError}</div>
  }

  const filtered = selectedOds === null
    ? favorites
    : favorites.filter((p) => p.odsNumber === selectedOds)

  if (filtered.length === 0) {
    return (
      <div className={empty}>
        <span className={emptyIcon}>🔍</span>
        <h3 className={emptyText}>Sin resultados</h3>
        <p className={emptyDesc}>No hay favoritos con ese filtro ODS.</p>
      </div>
    )
  }

  return (
    <div className={list}>
      {filtered.map((place) => (
        <FavoriteCard key={place.id} place={place} />
      ))}
    </div>
  )
}
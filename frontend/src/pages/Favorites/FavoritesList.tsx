import FavoriteCard from "./FavoriteCard"
import type { PointDetail } from "@/api/types/index"

// Estilos
const list = "flex flex-col gap-4 px-4 pt-4 w-full md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 max-w-screen-xl mx-auto"
const empty = "flex flex-col items-center justify-center py-20 px-6 text-center"
const emptyIcon = "text-6x1 mb-4"
const emptyText = "text-gray-700 font-semibold text-lg mb-1"
const emptyDesc = "text-gray-400 text-sm"

interface Props {
  favorites: PointDetail[];
  selectedOds: number | null;
  onFavoriteRemoved: (id: number) => void;
}

// Componente
export default function FavoritesList({ favorites, selectedOds, onFavoriteRemoved }: Props) {
    const filtered = selectedOds === null ? favorites : favorites.filter((p) => p.odsNumber === selectedOds)

    if(filtered.length === 0) {
        return (
            <div className={empty}>
                <span className={emptyIcon}>🔍</span>
                <h3 className={emptyText}>Sin resultados</h3>
                <p className={emptyDesc}>No hay favoritos con ese filtro ODS o no tienes puntos guardados.</p>
            </div>
        )
    }

    return (
        <div className={list}>
            {filtered.map((place) => (
                <FavoriteCard key={place.id} place={place} onFavoriteRemoved={onFavoriteRemoved} />
            ))}
        </div>
    )
}
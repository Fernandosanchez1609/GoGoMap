import FavoriteCard from "./FavoriteCard"
import { FAVORITES_MOCK } from "./data/Favorites.mock"

// Estilos
const list = "flex flex-col gap-4 px-4 pt-4 w-full"
const empty = "flex flex-col items-center justify-center py-20 px-6 text-center"
const emptyIcon = "text-6x1 mb-4"
const emptyText = "text-gray-700 font-semibold text-lg mb-1"
const emptyDesc = "text-gray-400 text-sm"

// Componente
export default function FavoritesList({ selectedOds }: { selectedOds: number | null }) {
    const filtered = selectedOds === null ? FAVORITES_MOCK : FAVORITES_MOCK.filter((p) => p.ods === selectedOds)

    if(filtered.length === 0) {
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
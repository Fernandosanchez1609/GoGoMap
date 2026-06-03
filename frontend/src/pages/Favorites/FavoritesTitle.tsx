// Estilos
const wrapper = "bg-app-surface-1 px-4 pb-4 w-full"
const title = "text-2xl font-bold text-green-700"

// Componente
export default function  FavoritesTitle() {
    return (
        <div className={wrapper}>
            <h1 className={title}>Favoritos</h1>
        </div>
    )
}
import Header from "../../components/Header/Header"
import FavoritesTitle from "./FavoritesTitle"
import { useState, useEffect } from "react"
import FavoritesList from "./FavoritesList"
import Footer from "@/components/Footer/Footer"
import FilterDrawer from "@/components/Map/FilterDrawer"
import { SlidersHorizontal } from "lucide-react"
import userService from "@/api/services/userService"
import type { PointDetail } from "@/api/types/index"

// Estilos
const page = "min-h-screen bg-app-surface-1 flex flex-col items-center"
const content = "w-full flex-1 flex flex-col pb-24 md:pb-8"

const footerWrapper = "fixed bottom-0 left-0 right-0 z-50 md:static md:w-full"

// Componente
export default function FavoritesPage() {
    const [selectedOds, setSelectedOds] = useState<number[]>([]) // ¡Vuelve a ser un array!
    const [favorites, setFavorites] = useState<PointDetail[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const response = await userService.getFavorites()
                setFavorites(response.data)
            } catch (error) {
                console.error("Error al cargar favoritos reales:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadFavorites()
    }, [])

    const handleFavoriteRemoved = (id: number) => {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id))
    }

    return (
        <div className={page}>
            <Header />

            {/* Botón flotante para abrir filtros  */}
            <button
                onClick={() => setIsDrawerOpen(true)}
                className="fixed top-24 left-4 z-[1000] flex flex-col items-center gap-1"
                title="Abrir filtros"
            >
                <div className="relative p-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 hover:bg-gray-50 transition-colors">
                    <SlidersHorizontal size={24} className="text-gray-700" />
                    {selectedOds.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 shadow-sm animate-pulse" />
                    )}
                </div>
                <span className="text-[10px] font-bold text-gray-700 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                    Filtros
                </span>
            </button>

            {/* Drawer de filtros reutilizado */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                selectedOds={selectedOds}
                onSelectOds={setSelectedOds}
                radiusKm={0} // No se usa en Favoritos
                onRadiusChange={() => {}} // No se usa en Favoritos
                visibleCount={favorites.length}
                hasUserPosition={false} 
                showFavoritesOnly={true} 
                onToggleFavorites={() => {}} 
                isAuthenticated={false}
            />

            <div className={content}>
                <FavoritesTitle />
                
                {isLoading ? (
                    <div className="flex flex-col gap-4 px-4 pt-4 w-full md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 max-w-screen-xl mx-auto">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="animate-pulse bg-gray-200 rounded-2xl h-32 w-full"
                            />
                        ))}
                    </div>
                ) : (
                    <FavoritesList 
                        favorites={favorites} 
                        selectedOds={selectedOds} 
                        onFavoriteRemoved={handleFavoriteRemoved}
                    />
                )}

            </div>
            <div className={footerWrapper}>
                <Footer />
            </div>
        </div>
    )
}
import Header from "../../components/Header/Header"
import FavoritesTitle from "./FavoritesTitle"
import { useState, useEffect } from "react"
import Filter from "@/components/Map/Filter"
import FavoritesList from "./FavoritesList"
import Footer from "@/components/Footer/Footer"
import userService from "@/api/services/userService"
import type { PointDetail } from "@/api/types/index"

// Estilos
const page = "min-h-screen bg-app-surface-1 flex flex-col items-center"
const content = "w-full flex-1 flex flex-col pb-24"

const filterWrapper = "w-full overflow-hidden"

const footerWrapper = "fixed bottom-0 left-0 w-full z-50"

// Componente
export default function FavoritesPage() {
    const [selectedOds, setSelectedOds] = useState<number | null>(null)
    const [favorites, setFavorites] = useState<PointDetail[]>([])
    const [isLoading, setIsLoading] = useState(true)

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

    return (
        <div className={page}>
            <Header />
            <div className={content}>
                
                <div className={filterWrapper}>
                    <div >
                        <Filter selected={selectedOds} onSelect={setSelectedOds} />
                    </div>
                </div>
                <FavoritesTitle />
                
                {isLoading ? (
                    <div className="text-center py-10 text-gray-500 font-medium">
                        Cargando tus favoritos...
                    </div>
                ) : (
                    <FavoritesList favorites={favorites} selectedOds={selectedOds} />
                )}

            </div>
            <div className={footerWrapper}>
                <Footer />
            </div>
        </div>
    )
}
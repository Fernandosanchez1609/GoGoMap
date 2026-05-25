import FavoritesHeader from "./FavoritesHeader"
import FavoritesTitle from "./FavoritesTitle"
import { useState } from "react"
import Filter from "@/components/Map/Filter"
import FavoritesList from "./FavoritesList"
import Footer from "@/components/Footer/Footer"

// Estilos
const page = "min-h-screen bg-[#F5F5EE] flex flex-col items-center"
const content = "w-full flex-1 flex flex-col pb-24"

const filterWrapper = "w-full overflow-hidden"
const filterOffset  = "-mt-[84px]"

const footerWrapper = "fixed bottom-0 left-0 w-full z-50"

// Componente
export default function FavoritesPage() {
    const [selectedOds, setSelectedOds] = useState<number | null>(null)

    return (
        <div className={page}>
            <div className={content}>
                <FavoritesHeader />                
                <div className={filterWrapper}>
                    <div className={filterOffset}>
                        <Filter selected={selectedOds} onSelect={setSelectedOds} />
                    </div>
                </div>
                <FavoritesTitle />
                <FavoritesList selectedOds={selectedOds} />
            </div>
            <div className={footerWrapper}>
                <Footer />
            </div>
        </div>
    )

}
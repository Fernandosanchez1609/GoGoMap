import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { LogOut, Loader2, MapPin, Pencil, Gift } from "lucide-react"
import Header from "../../components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Leaderboard from "@/components/Profile/Leaderboard"
import EditProfileModal from "@/components/Profile/EditProfileModal"
import Weal from "@/components/Points/Weal"
import { useState } from "react"

export default function UserPage() {
    // Usamos profile como en tu código original, y lo renombramos a user para este componente
    const { profile: user, logout, isLoading, refreshProfile } = useAuth()
    const navigate = useNavigate()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [showWeal, setShowWeal] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <Header />

            {/* Dashboard Container */}
            <div className="w-full flex-1 max-w-6xl mx-auto px-4 pt-6 pb-24 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Columna Izquierda: Perfil y Stats */}
                    <div className="space-y-6">
                        {/* Tarjeta de Perfil */}
                        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center relative">
                            {/* Botón Editar */}
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            >
                                <Pencil size={20} />
                            </button>

                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                                <span className="text-3xl font-bold text-green-600">
                                    {user.nombre.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.nombre} {user.apellidos}</h2>
                            <p className="text-gray-500 mb-4">{user.email}</p>
                            
                            <div className="w-full bg-gray-50 rounded-2xl p-4 flex justify-around">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{user.karmaPoints}</div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Karma</div>
                                </div>
                                <div className="w-px bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Pionero</div>
                                </div>
                            </div>
                        </div>

                        {/* Botón Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-red-100 text-red-600 py-4 px-6 rounded-2xl hover:bg-red-50 hover:border-red-200 transition-colors font-semibold"
                        >
                            <LogOut size={20} />
                            Cerrar Sesión
                        </button>
                    </div>

                    {/* Columnas Derecha: Gamificación */}
                    <div className="md:col-span-2 space-y-6 flex flex-col">
                        
                        {/* Ruleta Compacta */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">¡Prueba tu suerte!</h3>
                                <p className="text-green-100 text-sm">Gira la Ruleta Karma todos los días para ganar premios y puntos extra.</p>
                            </div>
                            <div className="w-full md:w-auto">
                                <button
                                    onClick={() => setShowWeal(true)}
                                    className="w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white text-green-600 font-bold text-base shadow-lg hover:bg-green-50 hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    <Gift size={20} />
                                    Girar Ruleta
                                </button>
                            </div>
                        </div>

                        {/* Clasificación */}
                        <div className="flex-1 min-h-[400px]">
                            <Leaderboard />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Edición */}
            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                currentUser={user} 
                onSuccess={() => { if (refreshProfile) refreshProfile() }} 
            />

            {/* Modal de la Ruleta (Weal) */}
            {showWeal && <Weal onClose={() => setShowWeal(false)} />}

            <div className="fixed bottom-0 left-0 right-0 z-50 md:static md:w-full">
                <Footer />
            </div>
        </div>
    )
}
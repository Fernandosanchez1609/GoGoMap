import Footer from "@/components/Footer/Footer";
import { Gift, LogOut, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Weal from "@/components/Points/Weal";
import { useAuth } from "@/context/AuthContext";

export default function UserPage() {
  const navigate = useNavigate();
  const { logout, profile } = useAuth();
  const [showWeal, setShowWeal] = useState(false);
  const userData = {
    name: profile ? `${profile.nombre} ${profile.apellidos}` : "Cargando...",
    email: profile ? profile.email : "",
    createDate: profile ? profile.createdAt : new Date().toISOString(),
    karmaPoints: profile ? profile.karmaPoints : 0,
  };

  const memberSince = new Date(userData.createDate).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const initial = userData.name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-app-surface-2">
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-4 gap-5 overflow-y-auto">

        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-app-green flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-green-900/30">
            {initial}
          </div>
          <h1 className="text-2xl font-bold text-app-text-dark tracking-tight">
            {userData.name}
          </h1>
          <p className="text-sm text-app-muted">
            Miembro desde {memberSince}
          </p>
        </div>

        {/* Eco Points Card */}
        <div className="w-full bg-app-green rounded-2xl p-5 flex justify-between items-center shadow-lg shadow-green-900/25">
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">
              Total Impacto
            </p>
            <p className="text-3xl font-bold text-white tracking-tight">
              {userData.karmaPoints} Karma Points
            </p>
          </div>
        </div>

        {/* Nombre */}
        <div className="w-full bg-white rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold text-text-h uppercase tracking-widest mb-2">
            Nombre De usuario
          </p>
          <div className="flex items-center gap-3 text-text-h font-medium">
            <User size={18} className="text-sdg-13 opacity-60" />
            {userData.name}
          </div>
        </div>

        {/* Email */}
        <div className="w-full bg-white rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold text-text-h uppercase tracking-widest mb-2">
            Correo Electrónico
          </p>
          <div className="flex items-center gap-3 text-[#1a2e1c] font-medium">
            <Mail size={18} className="text-text-h opacity-60" />
            {userData.email}
          </div>
        </div>

        <button
          onClick={() => setShowWeal(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-destructive text-white font-semibold text-base shadow-lg shadow-orange-400/25 hover:bg-[#e09510] active:scale-95 transition-all duration-200"
        >
          <Gift size={18} />
          Girar la ruleta
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full border-2 border-sdg-17 bg-ruleta text-sdg-17 font-semibold text-base hover:bg-sdg-17 hover:text-white transition-all duration-200 mt-1"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>

      </div>

      <Footer />

      {showWeal && <Weal onClose={() => setShowWeal(false)} />}
    </div>
  );
}
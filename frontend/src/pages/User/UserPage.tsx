import Footer from "@/components/Footer/Footer";
import { Gift, LogOut, Mail, User } from "lucide-react";
import {NavLink} from "react-router-dom";
import { useState } from "react";
import Weal from "@/components/Points/Weal";

export default function UserPage() {
  const [showWeal, setShowWeal] = useState(false);
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    createDate: "2024-01-01",
    karmaPoints: 100,
  };

  const memberSince = new Date(userData.createDate).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const initial = userData.name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-[#f0f4ec]">
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-4 gap-5 overflow-y-auto">

        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-[#2d6a35] flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-green-900/30">
            {initial}
          </div>
          <h1 className="text-2xl font-bold text-[#1a2e1c] tracking-tight">
            {userData.name}
          </h1>
          <p className="text-sm text-[#7a9a7e]">
            Miembro desde {memberSince}
          </p>
        </div>

        {/* Eco Points Card */}
        <div className="w-full bg-[#2d6a35] rounded-2xl p-5 flex justify-between items-center shadow-lg shadow-green-900/25">
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
          <p className="text-xs font-semibold text-[#7a9a7e] uppercase tracking-widest mb-2">
            Nombre De usuario
          </p>
          <div className="flex items-center gap-3 text-[#1a2e1c] font-medium">
            <User size={18} className="text-[#2d6a35] opacity-60" />
            {userData.name}
          </div>
        </div>

        {/* Email */}
        <div className="w-full bg-white rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold text-[#7a9a7e] uppercase tracking-widest mb-2">
            Correo Electrónico
          </p>
          <div className="flex items-center gap-3 text-[#1a2e1c] font-medium">
            <Mail size={18} className="text-[#2d6a35] opacity-60" />
            {userData.email}
          </div>
        </div>

        <button
          onClick={() => setShowWeal(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#f5a623] text-white font-semibold text-base shadow-lg shadow-orange-400/25 hover:bg-[#e09510] active:scale-95 transition-all duration-200"
        >
          <Gift size={18} />
          Girar la ruleta
        </button>

        {/* Logout */}
        <NavLink to="/login">
          <button className="w-full flex items-center justify-center gap-2 py-4 rounded-full border-2 border-[#d64040] text-[#d64040] font-semibold text-base hover:bg-[#d64040] hover:text-white transition-all duration-200 mt-1">
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </NavLink>

      </div>

      <Footer />

      {showWeal && <Weal onClose={() => setShowWeal(false)} />}
    </div>
  );
}
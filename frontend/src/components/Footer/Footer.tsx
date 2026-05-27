import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-around p-4 bg-white border-t">
      <NavLink to="/map">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200 ${isActive ? "bg-gray-100" : ""}`}
          >
            <img
              src="/assets/icons/mapa.svg"
              alt="Mapa"
              className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
            />
            <span
              className={`text-xs font-medium transition-all duration-200 ${isActive ? "text-sdg-13" : "text-gray-400"}`}
            >
              Mapa
            </span>
          </div>
        )}
      </NavLink>

      <NavLink to="/favorites">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200 ${isActive ? "bg-gray-100" : ""}`}
          >
            <img
              src="/assets/icons/favoritos.svg"
              alt="Favoritos"
              className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
            />
            <span
              className={`text-xs font-medium transition-all duration-200 ${isActive ? "text-sdg-13" : "text-gray-400"}`}
            >
              Favoritos
            </span>
          </div>
        )}
      </NavLink>

      <NavLink to="/user">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200 ${isActive ? "bg-gray-100" : ""}`}
          >
            <img
              src="/assets/icons/perfil.svg"
              alt="Perfil"
              className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
            />
            <span
              className={`text-xs font-medium transition-all duration-200 ${isActive ? "text-sdg-13" : "text-gray-400"}`}
            >
              Perfil
            </span>
          </div>
        )}
      </NavLink>
    </footer>
  );
}

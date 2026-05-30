import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-around p-4 bg-white border-t">
      <NavLink to="/">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200 ${isActive ? "bg-gray-100" : ""}`}
          >
            <svg
              className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span
              className={`text-xs font-medium transition-all duration-200 ${isActive ? "text-sdg-13" : "text-gray-400"}`}
            >
              Inicio
            </span>
          </div>
        )}
      </NavLink>

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

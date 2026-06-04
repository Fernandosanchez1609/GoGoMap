import { NavLink, useLocation } from "react-router-dom";
import { Heart } from "lucide-react"

export default function Footer() {
  const location = useLocation();
  const publicRoutes = ["/", "/login", "/register", "/error", "/about"];
  
  if (publicRoutes.includes(location.pathname) || location.pathname.startsWith("/error")) {
    return null;
  }

  return (
    <footer className="bg-app-bg border-t">
      <div className="max-w-screen-xl mx-auto flex justify-around p-4">
        <NavLink to="/map">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200">
              <img
                src="/assets/icons/mapa.svg"
                alt="Mapa"
                className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
              />
              <span
                className={`text-xs transition-all duration-200 ${isActive ? "text-green-600 font-bold" : "text-gray-400 font-medium"}`}
              >
                Mapa
              </span>
            </div>
          )}
        </NavLink>

        <NavLink to="/favorites">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200">

              <Heart className={`h-8 w-8 transition-opacity duration-200 ${isActive ? "opacity-100 text-black" : "opacity-40 text-gray-400"}`} />

              <span
                className={`text-xs transition-all duration-200 ${isActive ? "text-green-600 font-bold" : "text-gray-400 font-medium"}`}
              >
                Favoritos
              </span>
            </div>
          )}
        </NavLink>

        <NavLink to="/user">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200">
              <img
                src="/assets/icons/perfil.svg"
                alt="Perfil"
                className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
              />
              <span
                className={`text-xs transition-all duration-200 ${isActive ? "text-green-600 font-bold" : "text-gray-400 font-medium"}`}
              >
                Perfil
              </span>
            </div>
          )}
        </NavLink>
      </div>
    </footer>
  );
}
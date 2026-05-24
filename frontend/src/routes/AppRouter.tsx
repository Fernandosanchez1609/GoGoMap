import { Route, Routes } from "react-router-dom";
import MapPage from "@/pages/Map/MapPage";
import GoGomapOnboarding from "@/components/onboarding/GoGomapOnboarding";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import ErrorPage from "@/components/error/ErrorPage";
import ErrorPage404 from "@/components/error404/ErrorPage404";
import FavoritesPage from "@/pages/Favorites/FavoritesPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<GoGomapOnboarding/>} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/errorpage" element={<ErrorPage/>} />
      <Route path="/errorpage404" element={<ErrorPage404/>} />
      <Route path="/favorites" element={<FavoritesPage/>} />

    </Routes>
  )
}
import { Route, Routes } from "react-router-dom";
import MapPage from "@/pages/Map/MapPage";
import GoGomapOnboarding from "@/components/onboarding/GoGomapOnboarding";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import ErrorPage from "@/components/error/ErrorPage";
import ErrorPage404 from "@/components/error404/ErrorPage404";
import FavoritesPage from "@/pages/Favorites/FavoritesPage";
import UserPage from "@/pages/User/UserPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RedirectIfAuthenticated from "@/routes/RedirectIfAuthenticated";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectIfAuthenticated>
            <GoGomapOnboarding />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuthenticated>
            <Register />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="/error" element={<ErrorPage />} />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  )
}
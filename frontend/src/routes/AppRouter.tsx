import { Route, Routes } from "react-router-dom";
import MapPage from "@/pages/Map/MapPage";
import GoGomapOnboarding from "@/components/onboarding/GoGomapOnboarding";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import UserPage from "@/pages/User/UserPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<GoGomapOnboarding/>} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/user" element={<UserPage/>} />
    </Routes>
  )
}
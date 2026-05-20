import { Route, Routes } from "react-router-dom";
import MapPage from "@/pages/Map/MapPage";
import GoGomapOnboarding from "@/components/onboarding/GoGomapOnboarding";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<GoGomapOnboarding />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  )
}
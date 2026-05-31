import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import type { Point, PointDetail } from "@/api/types/index";
import pointService from "@/api/services/pointService";
import userService from "@/api/services/userService";
import { getDistanceKm } from "@/utils/Distance";
import { useDebounce } from "use-debounce";
import MapControls from "@/components/Map/MapControls";
import MapAlerts from "@/components/Map/MapAlerts";
import MapView from "@/components/Map/MapView";
import PointDetailModal from "@/components/Map/PointDetailModal";
import { fetchOsrmRoute } from "@/utils/map";
import Filter from "@/components/Map/Filter";
import { toast } from "sonner";


export default function MapPage() {
const location = useLocation();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [selectedOds, setSelectedOds] = useState<number[]>([1]);
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [debouncedRadius] = useDebounce(radiusKm, 150);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<PointDetail | null>(null);
  const [selectedPointCoords, setSelectedPointCoords] = useState<
    [number, number] | null
  >(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(
    null,
  );
  const [loadingRoute, setLoadingRoute] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        setLoading(true);
        const response = await pointService.getAll();
        setPoints(response.data);
      } catch {
        setError("Error al cargar los puntos del mapa");
      } finally {
        setLoading(false);
      }
    };

    void fetchPoints();
  }, []);

  useEffect(() => {
    const checkWheelSpinStatus = async () => {
      try {
        const response = await userService.getWheelSpinStatus();
        if (!response.data.hasSpunToday) {
          toast.success(
            "🎡 ¡Tienes una tirada diaria disponible en la Ruleta Karma!",
            {
              id: "ruleta-toast", // 3. Esto evita que salga doble
              duration: 6000,
              action: {
                label: "Ir a la ruleta",
                onClick: () => navigate("/user"), // 4. Navega al perfil
              },
            }
          );
        }
      } catch (err) {
        console.error("Error al verificar el estado de la ruleta:", err);
      }
    };

    void checkWheelSpinStatus();
  }, [ navigate]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Tu navegador no soporta geolocalización.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        setGeoError(null);
      },
      (err) => {
        setGeoError(`No se pudo obtener tu ubicación: ${err.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const state = location.state as { selectedPointId?: number } | null;
    if (state?.selectedPointId && points.length > 0) {
      const point = points.find((p) => p.id === state.selectedPointId);
      if (point) {
        handlePointClick(String(point.id), point.latitude, point.longitude);
      }
    }
  }, [location.state, points]);
  

  const centerOnUser = () => {
    if (mapRef.current && userPosition) {
      mapRef.current.flyTo(userPosition, 16, { duration: 1.2 });
    }
  };

  const handlePointClick = async (id: string, lat: number, lng: number) => {
    try {
      setLoadingDetail(true);
      setSelectedPointCoords([lat, lng]);
      setRouteCoords(null);
      const response = await pointService.getById(id);
      setSelectedPoint(response.data);
    } catch {
      setError("Error al cargar el detalle del punto");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedPoint(null);
    setSelectedPointCoords(null);
  };

  const handleRequestRoute = useCallback(
    async (destLat: number, destLng: number) => {
      if (!userPosition) {
        setError("Activa tu ubicación para calcular la ruta.");
        return;
      }

      try {
        setLoadingRoute(true);
        handleCloseModal();
        const coords = await fetchOsrmRoute(userPosition, [destLat, destLng]);
        setRouteCoords(coords);
      } catch {
        setError("No se pudo calcular la ruta.");
      } finally {
        setLoadingRoute(false);
      }
    },
    [userPosition],
  );

  const handleClearRoute = () => {
    setRouteCoords(null);
  };

  const visiblePoints = useMemo(() => {
    return points.filter((p) => {
      const odsMatch =
        selectedOds.length === 0 || selectedOds.includes(p.odsNumber);
      const distanceMatch =
        userPosition === null ||
        getDistanceKm(
          userPosition[0],
          userPosition[1],
          p.latitude,
          p.longitude,
        ) <= debouncedRadius;
      return odsMatch && distanceMatch;
    });
  }, [points, selectedOds, debouncedRadius, userPosition]);

  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <Filter selected={selectedOds} onSelect={setSelectedOds} />

      {userPosition && (
        //<div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-200 text-sm">
        <div className="flex items-center gap-4 px-4 py-2 bg-app-bg border-b border-gray-200 text-sm">
          <div className="flex items-center gap-2 flex-1 ">
            <span className="text-gray-600 whitespace-nowrap">Radio:</span>
            <input
              type="range"
              min={0.5}
              max={30}
              step={0.5}
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <span className="text-gray-800 font-medium whitespace-nowrap w-12">
              {radiusKm} km
            </span>
          </div>
          <span className="font-semibold text-gray-800 whitespace-nowrap">
            {visiblePoints.length}
          </span>
        </div>
      )}

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <MapAlerts
          geoError={geoError}
          error={error}
          loading={loading}
          loadingRoute={loadingRoute}
        />

        {routeCoords && (
          <button
            onClick={handleClearRoute}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-md hover:bg-gray-50 flex items-center gap-2"
          >
            <span>✕</span> Eliminar ruta
          </button>
        )}
        {userPosition && (
          <button
            onClick={centerOnUser}
            className="absolute bottom-6 right-4 z-[1000] flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
            title="Centrar en mi ubicación"
          >
            {/* Si tienes un SVG de ubicación úsalo aquí. Si no, este SVG genérico queda genial: */}
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="#5e8cee"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22C12 22 4 15.56 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10C20 15.56 12 22 12 22Z" />

              <circle cx="12" cy="10" r="3" fill="#FF5722" />
            </svg>
          </button>
        )}
        <MapView
          points={visiblePoints}
          userPosition={userPosition}
          routeCoords={routeCoords}
          selectedOds={selectedOds}
          radiusKm={radiusKm}
          onPointClick={handlePointClick}
          mapRef={mapRef}
        />

        <PointDetailModal
          selectedPoint={selectedPoint}
          selectedPointCoords={selectedPointCoords}
          loadingDetail={loadingDetail}
          userPosition={userPosition}
          onRequestRoute={handleRequestRoute}
          onClose={handleCloseModal}
        />
      </div>

      <Footer />
    </div>
  );
}

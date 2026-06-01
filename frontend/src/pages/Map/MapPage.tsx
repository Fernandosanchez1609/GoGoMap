import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import type { Point, PointDetail } from "@/api/types/index";
import pointService from "@/api/services/pointService";
import userService from "@/api/services/userService";
import { getDistanceKm } from "@/utils/Distance";
import { useDebounce } from "use-debounce";
import MapAlerts from "@/components/Map/MapAlerts";
import MapView from "@/components/Map/MapView";
import PointDetailModal from "@/components/Map/PointDetailModal";
import FilterDrawer from "@/components/Map/FilterDrawer";
import { fetchOsrmRoute } from "@/utils/map";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function MapPage() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [selectedOds, setSelectedOds] = useState<number[]>([1]);
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [debouncedRadius] = useDebounce(radiusKm, 150);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<PointDetail | null>(null);
  const [selectedPointCoords, setSelectedPointCoords] = useState<[number, number] | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);

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
          toast.success("🎡 ¡Tienes una tirada diaria disponible en la Ruleta Karma! Pon a prueba tu suerte.", {
            duration: 5000,
          });
        }
      } catch (err) {
        console.error("Error al verificar el estado de la ruleta:", err);
      }
    };

    void checkWheelSpinStatus();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!isAuthenticated) {
        setFavoriteIds([]);
        return;
      }

      try {
        const response = await userService.getFavorites();
        const ids = response.data.map((fav: PointDetail) => fav.id);
        setFavoriteIds(ids);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
      }
    };

    void loadFavorites();
  }, [isAuthenticated]);

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
      const odsMatch = selectedOds.length === 0 || selectedOds.includes(p.odsNumber);
      const distanceMatch =
        userPosition === null ||
        getDistanceKm(
          userPosition[0],
          userPosition[1],
          p.latitude,
          p.longitude,
        ) <= debouncedRadius;
      const favoritesMatch = !showFavoritesOnly || favoriteIds.includes(p.id);
      return odsMatch && distanceMatch && favoritesMatch;
    });
  }, [points, selectedOds, debouncedRadius, userPosition, showFavoritesOnly, favoriteIds]);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Botón flotante para abrir filtros */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-20 left-4 z-[1000] bg-white rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] transition-all duration-200 border border-gray-100"
        title="Abrir filtros"
      >
        <SlidersHorizontal size={24} className="text-gray-700" />
      </button>

      {/* Drawer de filtros */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedOds={selectedOds}
        onSelectOds={setSelectedOds}
        radiusKm={radiusKm}
        onRadiusChange={setRadiusKm}
        visibleCount={visiblePoints.length}
        hasUserPosition={Boolean(userPosition)}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={setShowFavoritesOnly}
        isAuthenticated={isAuthenticated}
      />

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

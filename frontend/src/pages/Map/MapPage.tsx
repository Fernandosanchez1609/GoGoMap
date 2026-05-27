import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import type { Point, PointDetail } from "@/api/types/index";
import pointService from "@/api/services/pointService";
import { getDistanceKm } from "@/utils/Distance";
import { useDebounce } from "use-debounce";
import MapControls from "@/components/Map/MapControls";
import MapAlerts from "@/components/Map/MapAlerts";
import MapView from "@/components/Map/MapView";
import PointDetailModal from "@/components/Map/PointDetailModal";
import { fetchOsrmRoute } from "@/utils/map";

export default function MapPage() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [selectedOds, setSelectedOds] = useState<number | null>(null);
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
      const odsMatch = selectedOds === null || p.odsNumber === selectedOds;
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
    <div className="flex flex-col h-screen">
      <Header />
      <MapControls
        selectedOds={selectedOds}
        onSelect={setSelectedOds}
        radiusKm={radiusKm}
        onRadiusChange={setRadiusKm}
        visibleCount={visiblePoints.length}
        onCenterClick={centerOnUser}
        hasUserPosition={Boolean(userPosition)}
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

        <button
          onClick={centerOnUser}
          disabled={!userPosition}
          className="absolute bottom-6 right-3 z-[1000] bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-xl shadow-md transition-colors
          enabled:hover:bg-gray-50 enabled:cursor-pointer
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          title="Centrar en mi ubicación"
        >
          📍
        </button>

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

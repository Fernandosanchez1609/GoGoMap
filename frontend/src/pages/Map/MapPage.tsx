import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import Footer from "@/components/Footer/Footer";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Filter from "@/components/Map/Filter";
import { createOdsIcon, ODS_COLORS } from "@/utils/OdsColors";
import pointService from "@/api/services/pointService";
import type { Point, PointDetail } from "@/api/types/index";
import { getDistanceKm } from "@/utils/Distance";
import { useDebounce } from "use-debounce";
import PointModel from "@/components/Map/PointModel";
import Header from "@/components/Header/Header";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MALAGA_BOUNDS = L.latLngBounds(
  L.latLng(36.4, -5.1),
  L.latLng(37.2, -3.8),
);

function getZoomForRadius(km: number): number {
  if (km <= 1) return 15;
  if (km <= 2) return 14;
  if (km <= 4) return 13;
  if (km <= 7) return 12;
  if (km <= 12) return 11;
  return 10;
}

// Decodifica la polyline encodada que devuelve OSRM
function decodePolyline(encoded: string): [number, number][] {
  const coords: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    coords.push([lat / 1e5, lng / 1e5]);
  }

  return coords;
}

async function fetchOsrmRoute(
  from: [number, number],
  to: [number, number],
): Promise<[number, number][]> {
  const url = `https://router.project-osrm.org/route/v1/foot/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=polyline`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.length) throw new Error("Sin ruta");
  return decodePolyline(data.routes[0].geometry);
}

function FitRouteBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length) {
      map.fitBounds(L.latLngBounds(coords), {
        padding: [40, 40],
        animate: true,
      });
    }
  }, [coords]);
  return null;
}

function ClusteredMarkers({
  points,
  onPointClick,
}: {
  points: Point[];
  onPointClick: (id: string, lat: number, lng: number) => void;
}) {
  const map = useMap();
  const clustersRef = useRef<Map<number, L.MarkerClusterGroup>>(new Map());

  useEffect(() => {
    clustersRef.current = new Map();

    Object.entries(ODS_COLORS).forEach(([odsKey, color]) => {
      const ods = Number(odsKey);

      const cluster = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: (c) => {
          const count = c.getChildCount();
          const size = count < 10 ? 36 : count < 100 ? 44 : 52;
          return L.divIcon({
            html: `<div style="
              width:${size}px;
              height:${size}px;
              background:${color};
              border:3px solid white;
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              color:white;
              font-weight:700;
              font-size:${count < 100 ? 13 : 11}px;
              box-shadow:0 2px 6px rgba(0,0,0,0.3);
            ">${count}</div>`,
            className: "",
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
          });
        },
      });

      clustersRef.current.set(ods, cluster);
      map.addLayer(cluster);
    });

    return () => {
      clustersRef.current.forEach((cluster) => map.removeLayer(cluster));
      clustersRef.current = new Map();
    };
  }, [map]);

  useEffect(() => {
    clustersRef.current.forEach((cluster) => cluster.clearLayers());

    points.forEach((p) => {
      const cluster = clustersRef.current.get(p.odsNumber);
      if (!cluster) return;

      const marker = L.marker([p.latitude, p.longitude], {
        icon: createOdsIcon(p.odsNumber),
      });

      marker.on("click", () =>
        onPointClick(String(p.id), p.latitude, p.longitude),
      );
      cluster.addLayer(marker);
    });
  }, [points, onPointClick]);

  return null;
}

function FlyToUser({ position }: { position: [number, number] | null }) {
  const map = useMap();
  const isFirst = useRef(true);

  useEffect(() => {
    if (!position) return;
    if (isFirst.current) {
      map.flyTo(position, 15, { duration: 1.5 });
      isFirst.current = false;
    } else {
      map.panTo(position, { animate: true, duration: 0.5 });
    }
  }, [position]);

  return null;
}

function OdsFlyTo({
  selectedOds,
  radiusKm,
  userPosition,
}: {
  selectedOds: number | null;
  radiusKm: number;
  userPosition: [number, number] | null;
}) {
  const map = useMap();
  const prevOds = useRef<number | null>(null);

  useEffect(() => {
    if (selectedOds !== null && selectedOds !== prevOds.current) {
      const center = userPosition ?? [36.7213, -4.4214];
      map.flyTo(center, getZoomForRadius(radiusKm), { duration: 1.2 });
    }
    prevOds.current = selectedOds;
  }, [selectedOds]);

  return null;
}

export default function MapPage() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [selectedOds, setSelectedOds] = useState<number | null>(null);
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
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        setLoading(true);
        const response = await pointService.getAll();
        setPoints(response.data);
      } catch (err) {
        setError("Error al cargar los puntos del mapa");
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
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

  function centerOnUser() {
    if (mapRef.current && userPosition) {
      mapRef.current.flyTo(userPosition, 16, { duration: 1.2 });
    }
  }

  async function handlePointClick(id: string, lat: number, lng: number) {
    try {
      setLoadingDetail(true);
      setSelectedPointCoords([lat, lng]);
      setRouteCoords(null); // limpia ruta anterior al abrir nuevo punto
      const response = await pointService.getById(id);
      setSelectedPoint(response.data);
    } catch {
      setError("Error al cargar el detalle del punto");
    } finally {
      setLoadingDetail(false);
    }
  }

  function handleCloseModal() {
    setSelectedPoint(null);
    setSelectedPointCoords(null);
  }

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

  function handleClearRoute() {
    setRouteCoords(null);
  }

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
      <Filter selected={selectedOds} onSelect={setSelectedOds} />

      {userPosition && (
        <div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-200 text-sm">
          <div className="flex items-center gap-2 flex-1">
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
        {geoError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            ⚠️ {geoError}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            ⚠️ {error}
          </div>
        )}
        {loading && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded shadow text-sm">
            Cargando puntos...
          </div>
        )}
        {loadingRoute && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded shadow text-sm">
            Calculando ruta...
          </div>
        )}

        {/* Botón limpiar ruta */}
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

        <MapContainer
          ref={mapRef}
          center={[36.7213, -4.4214]}
          zoom={13}
          minZoom={10}
          maxZoom={18}
          maxBounds={MALAGA_BOUNDS}
          maxBoundsViscosity={1.0}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          <ClusteredMarkers
            points={visiblePoints}
            onPointClick={handlePointClick}
          />

          {userPosition && (
            <>
              <Marker position={userPosition} icon={userIcon}>
                <Popup>📍 Estás aquí</Popup>
              </Marker>
              <FlyToUser position={userPosition} />
            </>
          )}

          <OdsFlyTo
            selectedOds={selectedOds}
            radiusKm={radiusKm}
            userPosition={userPosition}
          />

          {routeCoords && (
            <>
              <Polyline
                positions={routeCoords}
                pathOptions={{ color: "#2563eb", weight: 5, opacity: 0.8 }}
              />
              <FitRouteBounds coords={routeCoords} />
            </>
          )}
        </MapContainer>

        {(selectedPoint || loadingDetail) && (
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl leading-none"
              >
                ×
              </button>
              {loadingDetail ? (
                <p className="text-sm text-gray-500">Cargando...</p>
              ) : selectedPoint && selectedPointCoords ? (
                <PointModel
                  point={selectedPoint}
                  latitude={selectedPointCoords[0]}
                  longitude={selectedPointCoords[1]}
                  onRequestRoute={handleRequestRoute}
                  canRoute={!!userPosition}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

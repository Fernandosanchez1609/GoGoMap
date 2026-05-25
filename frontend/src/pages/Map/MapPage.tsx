import { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
import type { Point } from "@/api/types/index";
import { getDistanceKm } from "@/utils/Distance";
import { useDebounce } from "use-debounce";

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

function ClusteredMarkers({ points }: { points: Point[] }) {
  const map = useMap();
  const clustersRef = useRef<Map<number, L.MarkerClusterGroup>>(new Map());

  useEffect(() => {
    // Inicializar siempre un Map nuevo al montar
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
      }).bindPopup(`<strong>${p.title}</strong>`);

      cluster.addLayer(marker);
    });
  }, [points]);

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
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [selectedOds, setSelectedOds] = useState<number | null>(null);
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [debouncedRadius] = useDebounce(radiusKm, 150);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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

  const visiblePoints = useMemo(() => {
    return points.filter((p) => {
      const odsMatch = selectedOds === null || p.odsNumber === selectedOds;
      const distanceMatch =
        userPosition === null ||
        getDistanceKm(userPosition[0], userPosition[1], p.latitude, p.longitude) <= debouncedRadius;
      return odsMatch && distanceMatch;
    });
  }, [points, selectedOds, debouncedRadius, userPosition]);

  return (
    <div className="flex flex-col h-screen">
      <Filter selected={selectedOds} onSelect={setSelectedOds} />

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
        <div className="text-gray-500 whitespace-nowrap">
          {userPosition ? (
            <span>
              <span className="font-semibold text-gray-800">{visiblePoints.length}</span>
            </span>
          ) : (
            <span className="italic">Activa ubicación para filtrar por distancia</span>
          )}
        </div>
      </div>

      <div className="relative flex-1">
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

          <ClusteredMarkers points={visiblePoints} />

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
        </MapContainer>
      </div>

      <Footer />
    </div>
  );
}
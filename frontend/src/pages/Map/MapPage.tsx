import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/Footer/Footer";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Filter from "@/components/Map/Filter";
import { createOdsIcon } from "@/utils/OdsColors";
import pointService from "@/api/services/pointService";
import type { Point } from "@/api/types/index";

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

export default function Map() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [selectedOds, setSelectedOds] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]); // <-- datos de la API
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Fetch de los puntos
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

  // Geolocalización
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

  // Ten en cuenta que tu API devuelve latitude/longitude en vez de lat/lng
  const visiblePoints = selectedOds
    ? points.filter((p) => p.ods === selectedOds)
    : points;

  return (
    <div className="flex flex-col h-screen">
      <Filter selected={selectedOds} onSelect={setSelectedOds} />

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
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-1000 bg-white px-4 py-2 rounded shadow text-sm">
            Cargando puntos...
          </div>
        )}

        <button
          onClick={centerOnUser}
          disabled={!userPosition}
          className="absolute bottom-6 right-3 z-1000 bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-xl shadow-md transition-colors
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

          {visiblePoints.map((p) => (
            <Marker
              key={p.id}
              position={[p.latitude, p.longitude]} // <-- latitude/longitude en vez de lat/lng
              icon={createOdsIcon(p.ods)}
            >
              <Popup>{p.title}</Popup> {/* <-- title en vez de label */}
            </Marker>
          ))}

          {userPosition && (
            <>
              <Marker position={userPosition} icon={userIcon}>
                <Popup>📍 Estás aquí</Popup>
              </Marker>
              <FlyToUser position={userPosition} />
            </>
          )}
        </MapContainer>
      </div>

      <Footer />
    </div>
  );
}

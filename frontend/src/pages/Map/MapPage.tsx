import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (common Leaflet + bundler issue)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Icono azul para el usuario
const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Límites geográficos de la provincia de Málaga
const MALAGA_BOUNDS = L.latLngBounds(
  L.latLng(36.4, -5.1), // suroeste
  L.latLng(37.2, -3.8)  // noreste
);

const points = [
  { id: 1, lat: 36.7213, lng: -4.4214, label: "Punto 1" },
  { id: 2, lat: 36.725,  lng: -4.42,   label: "Punto 2" },
];

// Componente auxiliar para centrar el mapa en el usuario al cargar
function FlyToUser({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position]);
  return null;
}

export default function Map() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

 useEffect(() => {
  if (!navigator.geolocation) {
    setGeoError("Tu navegador no soporta geolocalización.");
    return;
  }

  // watchPosition en lugar de getCurrentPosition
  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      setGeoError(null);
    },
    (err) => {
      setGeoError(`No se pudo obtener tu ubicación: ${err.message}`);
    },
    {
      enableHighAccuracy: true,  // GPS en lugar de WiFi/IP
      maximumAge: 0,             // no usar posición cacheada
      timeout: 10000,
    }
  );

  // Limpiar el watcher al desmontar el componente
  return () => navigator.geolocation.clearWatch(watchId);
}, []);

  return (
    <>
      {geoError && (
        <div style={{ background: "#fee", padding: "8px", fontSize: "13px" }}>
          ⚠️ {geoError}
        </div>
      )}

      <MapContainer
        center={[36.7213, -4.4214]}
        zoom={13}
        minZoom={10}
        maxZoom={18}
        maxBounds={MALAGA_BOUNDS}
        maxBoundsViscosity={1.0}   // ← impide salir de los límites (1 = rígido)
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Puntos estáticos */}
        {points.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>{p.label}</Popup>
          </Marker>
        ))}

        {/* Ubicación del usuario */}
        {userPosition && (
          <>
            <Marker position={userPosition} icon={userIcon}>
              <Popup>📍 Estás aquí</Popup>
            </Marker>
            <FlyToUser position={userPosition} />
          </>
        )}
      </MapContainer>
    </>
  );
}
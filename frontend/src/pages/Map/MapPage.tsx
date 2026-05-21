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

//puntos genericos para los 17 ODS bien separados
const points = [
  { id: 1, ods: 1, lat: 36.76, lng: -4.45, label: "Punto 1" },
  { id: 2, ods: 2, lat: 36.78, lng: -4.48, label: "Punto 2" },
  { id: 3, ods: 3, lat: 36.74, lng: -4.52, label: "Punto 3" },
  { id: 4, ods: 4, lat: 36.80, lng: -4.44, label: "Punto 4" },
  { id: 5, ods: 5, lat: 36.77, lng: -4.39, label: "Punto 5" },
  { id: 6, ods: 6, lat: 36.79, lng: -4.50, label: "Punto 6" },
  { id: 7, ods: 7, lat: 36.75, lng: -4.47, label: "Punto 7" },
  { id: 8, ods: 8, lat: 36.81, lng: -4.46, label: "Punto 8" },
  { id: 9, ods: 9, lat: 36.74, lng: -4.41, label: "Punto 9" },
  { id: 10, ods: 10, lat: 36.82, lng: -4.43, label: "Punto 10" },
  { id: 11, ods: 11, lat: 36.76, lng: -4.53, label: "Punto 11" },
  { id: 12, ods: 12, lat: 36.78, lng: -4.41, label: "Punto 12" },
  { id: 13, ods: 13, lat: 36.75, lng: -4.55, label: "Punto 13" },
  { id: 14, ods: 14, lat: 36.80, lng: -4.50, label: "Punto 14" },
  { id: 15, ods: 15, lat: 36.77, lng: -4.42, label: "Punto 15" },
  { id: 16, ods: 16, lat: 36.79, lng: -4.45, label: "Punto 16" },
  { id: 17, ods: 17, lat: 36.74, lng: -4.47, label: "Punto 17" },
  { id: 18, ods: 1, lat: 36.73, lng: -4.44, label: "Punto 18" },
  { id: 19, ods: 2, lat: 36.76, lng: -4.48, label: "Punto 19" },
  { id: 20, ods: 3, lat: 36.78, lng: -4.52, label: "Punto 20" },
];

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
  const mapRef = useRef<L.Map | null>(null);

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

   const visiblePoints = selectedOds
    ? points.filter((p) => p.ods === selectedOds)
    : points;

  return (
    <div className="flex flex-col h-screen">
      <Filter selected={selectedOds} onSelect={setSelectedOds} />
      {/* MAPA */}
      <div className="relative flex-1">
        {geoError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            ⚠️ {geoError}
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
            <Marker key={p.id} position={[p.lat, p.lng]} icon={createOdsIcon(p.ods)}>
              <Popup>{p.label}</Popup>
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

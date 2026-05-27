import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import type { RefObject } from "react";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { Point } from "@/api/types/index";
import { createOdsIcon } from "@/utils/OdsColors";
import ClusteredMarkers from "@/components/Map/ClusteredMarkers";

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

const MALAGA_BOUNDS = L.latLngBounds(L.latLng(36.4, -5.1), L.latLng(37.2, -3.8));

interface MapViewProps {
  points: Point[];
  userPosition: [number, number] | null;
  routeCoords: [number, number][] | null;
  selectedOds: number | null;
  radiusKm: number;
  onPointClick: (id: string, lat: number, lng: number) => void;
  mapRef: RefObject<LeafletMap | null>;
}

function FitRouteBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (!coords.length) return;
    map.fitBounds(L.latLngBounds(coords), {
      padding: [40, 40],
      animate: true,
    });
  }, [coords, map]);

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
  }, [position, map]);

  return null;
}

function getZoomForRadius(km: number): number {
  if (km <= 1) return 15;
  if (km <= 2) return 14;
  if (km <= 4) return 13;
  if (km <= 7) return 12;
  if (km <= 12) return 11;
  return 10;
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
  }, [selectedOds, radiusKm, userPosition, map]);

  return null;
}

export default function MapView({
  points,
  userPosition,
  routeCoords,
  selectedOds,
  radiusKm,
  onPointClick,
  mapRef,
}: MapViewProps) {
  return (
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

      <ClusteredMarkers points={points} onPointClick={onPointClick} />

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
  );
}

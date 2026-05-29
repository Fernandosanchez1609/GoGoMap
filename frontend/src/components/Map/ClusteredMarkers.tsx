import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import type { Point } from "@/api/types/index";
import { createOdsIcon, ODS_COLORS } from "@/utils/OdsColors";
import "leaflet.markercluster";
import L from "leaflet";

interface ClusteredMarkersProps {
  points: Point[];
  onPointClick: (id: string, lat: number, lng: number) => void;
}

export default function ClusteredMarkers({ points, onPointClick }: ClusteredMarkersProps) {
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

      marker.on("click", () => onPointClick(String(p.id), p.latitude, p.longitude));
      cluster.addLayer(marker);
    });
  }, [points, onPointClick]);

  return null;
}

import type { LatLngExpression } from "leaflet";

export function getZoomForRadius(km: number): number {
  if (km <= 1) return 15;
  if (km <= 2) return 14;
  if (km <= 4) return 13;
  if (km <= 7) return 12;
  if (km <= 12) return 11;
  return 10;
}

export function decodePolyline(encoded: string): [number, number][] {
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

export async function fetchOsrmRoute(
  from: [number, number],
  to: [number, number],
): Promise<[number, number][]> {
  const url = `https://router.project-osrm.org/route/v1/foot/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=polyline`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.length) throw new Error("Sin ruta");
  return decodePolyline(data.routes[0].geometry);
}

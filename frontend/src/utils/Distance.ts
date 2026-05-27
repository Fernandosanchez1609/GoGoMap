export function getDistanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getDistanceMeters(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  return getDistanceKm(lat1, lng1, lat2, lng2) * 1000;
}

export function isWithinMeters(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  meters: number,
): boolean {
  return getDistanceMeters(lat1, lng1, lat2, lng2) <= meters;
}
import api from "@/api/axiosConfig"

// Forma exacta que devuelve el backend
export interface FavoritePlaceAPI {
  id: number
  title: string
  latitude: number
  longitude: number
  ods: string
  odsNumber: number
}

// Llamada al endpoint
export async function getFavorites(): Promise<FavoritePlaceAPI[]> {
  const response = await api.get('/v1/users/me/favorites')
  return response.data
}
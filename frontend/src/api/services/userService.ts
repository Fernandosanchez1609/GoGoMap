import api from "../axiosConfig";
import type { PointDetail } from "../types/index";

export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  activo: boolean;
  roles: string[];
  karmaPoints: number;
  createdAt: string;
}

export interface WheelSpinResponse {
  slotIndex: number;
  multiplier: "X1" | "X2" | "X5" | "X10";
  karmaEarned: number;
  newTotalKarma: number;
  message: string;
}

export interface WheelSpinStatus {
  hasSpunToday: boolean;
}

const userService = {
  getProfile: () => api.get<User>("/v1/users/me"),
  
  // Funciones de favoritos (Tus cambios)
  addFavorite: (pointId: number) => api.post(`/v1/users/me/favorites/${pointId}`),
  removeFavorite: (pointId: number) => api.delete(`/v1/users/me/favorites/${pointId}`),
  getFavorites: () => api.get<PointDetail[]>("/v1/users/me/favorites"),

  // Funciones de ruleta (Cambios de tus compañeros)
  getWheelSpinStatus: () => api.get<WheelSpinStatus>("/v1/users/me/wheel-spin/status"),
  spinDailyWheel: () => api.post<WheelSpinResponse>("/v1/users/me/wheel-spin"),
};

export default userService;
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

const userService = {
  getProfile: () => api.get<User>("/v1/users/me"),
  addFavorite: (pointId: number) => api.post(`/v1/users/me/favorites/${pointId}`),
  removeFavorite: (pointId: number) => api.delete(`/v1/users/me/favorites/${pointId}`),
  getFavorites: () => api.get<PointDetail[]>("/v1/users/me/favorites"),
};

export default userService;
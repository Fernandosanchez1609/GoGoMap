import api from "../axiosConfig";

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
};

export default userService;
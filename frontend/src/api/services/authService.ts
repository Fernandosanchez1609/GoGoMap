import api from "../axiosConfig";

export interface AuthResponse {
  token: string;
  tokenType: string;
}

const authService = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),
  register: (nombre: string, apellidos: string, email: string, password: string) =>
    api.post<AuthResponse>("/auth/register", { nombre, apellidos, email, password }),
};

export default authService;

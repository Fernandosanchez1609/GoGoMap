import type { LoginRequest, AuthResponse } from "../types/Auth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    if (res.status === 401 || res.status === 403) {
      throw new Error("Email o contraseña incorrectos");
    }

    throw new Error(error?.message ?? "Error inesperado");
  }

  return res.json();
}
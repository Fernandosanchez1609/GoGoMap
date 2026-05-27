import { createContext, useContext, useMemo, useState } from "react";

export interface UserProfile {
  sub: string;
  email?: string;
  roles?: string[];
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  isAuth: boolean;
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "gogomap_auth_token";
const REFRESH_STORAGE_KEY = "gogomap_refresh_token";

function safeDecodeJwt(token: string): UserProfile | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + (4 - (normalized.length % 4)) % 4, "=");
    const decoded = atob(padded);
    const parsed = JSON.parse(decoded);

    const roles = parsed.roles
      ? typeof parsed.roles === "string"
        ? parsed.roles.split(" ").filter(Boolean)
        : Array.isArray(parsed.roles)
        ? parsed.roles
        : []
      : [];

    return {
      sub: parsed.sub || "",
      email: parsed.email || parsed.sub || "",
      roles,
      exp: typeof parsed.exp === "number" ? parsed.exp : undefined,
      iat: typeof parsed.iat === "number" ? parsed.iat : undefined,
      ...parsed,
    };
  } catch {
    return null;
  }
}

function tokenIsValid(token: string): boolean {
  const decoded = safeDecodeJwt(token);
  return !!decoded && typeof decoded.exp === "number" && decoded.exp * 1000 > Date.now();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialAuth = (() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (!storedToken) {
      return { token: null, user: null };
    }

    if (!tokenIsValid(storedToken)) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REFRESH_STORAGE_KEY);
      return { token: null, user: null };
    }

    return { token: storedToken, user: safeDecodeJwt(storedToken) };
  })();

  const [token, setToken] = useState<string | null>(initialAuth.token);
  const [user, setUser] = useState<UserProfile | null>(initialAuth.user);

  const login = (newToken: string, refreshToken?: string) => {
    const decoded = safeDecodeJwt(newToken);
    if (!decoded) return;

    localStorage.setItem(STORAGE_KEY, newToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_STORAGE_KEY, refreshToken);
    }

    setToken(newToken);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REFRESH_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuth: Boolean(token && user),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

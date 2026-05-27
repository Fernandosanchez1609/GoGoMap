import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface RedirectIfAuthenticatedProps {
  children: JSX.Element;
}

export default function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/map" replace />;
  }

  return children;
}

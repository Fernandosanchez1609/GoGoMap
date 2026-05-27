import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { useAuth } from "@/context/AuthContext";
import authService from "@/api/services/authService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ usuario: "", password: "" });
  const [apiError, setApiError] = useState("");

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/map";

  const validate = () => {
    const newErrors = { usuario: "", password: "" };
    let isValid = true;

    if (!usuario.trim()) {
      newErrors.usuario = "El usuario es obligatorio";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
      isValid = false;
    } else if (password.trim().length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
      isValid = false
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      const response = await authService.login(usuario, password);
      login(response.data.token);
      navigate(from, { replace: true });
    } catch (error) {
      setApiError("No se ha podido iniciar sesión. Revisa tus credenciales.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5EE] flex justify-center items-center px-6">
      <Card className="w-full max-w-sm bg-transparent border-none shadow-none">
        <CardContent className="flex flex-col gap-6 pt-10">
          <div className="flex flex-col items-center">
            <img src="/assets/Logo.png" alt="GoGoMap" className="w-64" />
            <p className="text-sm text-gray-500 mt-6 text-center">
              No. 1 in Spain for passing karmas :)
            </p>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mt-6">Bienvenidos</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Email</Label>
              <Input
                type="text"
                placeholder="Email"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.usuario ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.usuario && <p className="text-red-500 text-sm">{errors.usuario}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Contraseña</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

            <Button type="submit" className="h-14 rounded-full bg-green-800 hover:bg-green-900 text-lg font-bold shadow-lg">
              Login
            </Button>
          </form>

          <div className="text-center">
            <Link to="/register" className="text-green-700 font-semibold cursor-pointer">
              Regístrate aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

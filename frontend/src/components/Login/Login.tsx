import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { useAuth } from "@/context/AuthContext";
import authService from "@/api/services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/map";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await authService.login(email, password);
      const token = response.data.token;
      login(token);
      navigate(from, { replace: true });
    } catch (error) {
      setError("No se ha podido iniciar sesión. Revisa tus credenciales.");
    }
  };

  return (
     <div className="min-h-screen bg-[#F5F5EE] flex justify-center items-center px-6">

      <Card className="w-full max-w-sm bg-transparent border-none shadow-none">

        <CardContent className="flex flex-col gap-6 pt-10">

          {/* LOGO */}
          <div className="flex flex-col items-center ">

            <img
              src="/assets/Logo.png"
              alt="GoGoMap"
              className="w-64"
            />

            <p className="text-sm text-gray-500 mt-6 text-center">
              No. 1 in Spain for passing karmas :)
            </p>

          </div>

          {/* TITLE */}
          <div className="text-center">

            <h1 className="text-3xl font-bold text-gray-800 mt-6">
              Bienvenidos
            </h1>

          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Correo electrónico</Label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ejemplo@correo.com"
                className="h-14 rounded-xl border-gray-300 bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Contraseña</Label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Contraseña"
                className="h-14 rounded-xl border-gray-300 bg-white"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              type="submit"
              className="h-14 rounded-full bg-green-800 hover:bg-green-900 text-lg font-bold shadow-lg"
            >
              Login
            </Button>
          </form>

         {/* REGISTER */}
          <div className="text-center">

            <Link 
              to="/register"
              className="text-green-700 font-semibold cursor-pointer"
            >
              Regístrate aquí
            </Link>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}
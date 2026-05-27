import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { useAuth } from "@/context/AuthContext";
import authService from "@/api/services/authService";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (email !== confirmEmail) {
      setError("Los correos no coinciden.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await authService.register(nombre, apellidos, email, password);
      const token = response.data.token;
      login(token);
      navigate("/map", { replace: true });
    } catch (error) {
      setError("No se pudo crear la cuenta. Comprueba los datos e inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5EE] flex flex-col justify-center items-center px-6">
		{/* LOGO */}
          <div className="flex flex-col items-center">

            <img
              src="/assets/Logo.png"
              alt="GoGoMap"
              className="w-64"
            />

          </div>
      {/* CARD */}
      <Card className="w-full max-w-sm mt-6">

        <CardContent className="flex flex-col gap-6 pt-10 pb-8">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-gray-600">Nombre</Label>
                <Input
                  type="text"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                  placeholder="Nombre"
                  className="h-14 rounded-xl border-gray-300 bg-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-gray-600">Apellido</Label>
                <Input
                  type="text"
                  value={apellidos}
                  onChange={(event) => setApellidos(event.target.value)}
                  placeholder="Apellido"
                  className="h-14 rounded-xl border-gray-300 bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Correo</Label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ejemplo@correo.com"
                className="h-14 rounded-xl border-gray-300 bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Escribir otra vez el correo</Label>
              <Input
                type="email"
                value={confirmEmail}
                onChange={(event) => setConfirmEmail(event.target.value)}
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
                placeholder=""
                className="h-14 rounded-xl border-gray-300 bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Escribir otra vez la contraseña</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder=""
                className="h-14 rounded-xl border-gray-300 bg-white"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              type="submit"
              className="h-14 rounded-xl bg-green-800 hover:bg-green-900 text-lg font-bold shadow-lg mt-4"
            >
              Registrarse
            </Button>
          </form>

        </CardContent>

      </Card>

      {/* LOGIN LINK */}
      <div className="mt-6 text-center">

        <span className="text-gray-700">
          ¿Ya tienes una cuenta?
        </span>

       <Link
          to="/login"
          className="ml-2 text-green-700 font-bold hover:underline cursor-pointer"
        >
          Inicia sesión
        </Link>

      </div>

    </div>
  )
}
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { useAuth } from "@/context/AuthContext";
import authService from "@/api/services/authService";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const newErrors = {
      nombre: "",
      apellido: "",
      email: "",
      repeatEmail: "",
      password: "",
      repeatPassword: "",
    }
    let isValid = true

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
      isValid = false
    }

    if (!form.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio"
      isValid = false
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio"
      isValid = false
    }

    if (!form.repeatEmail.trim()) {
      newErrors.repeatEmail = "Debes repetir el correo"
      isValid = false
    } else if (form.email !== form.repeatEmail) {
      newErrors.repeatEmail = "Los correos no coinciden"
      isValid = false
    }

    if (!form.password.trim()) {
      newErrors.password = "La contraseña es obligatoria"
      isValid = false
    }else if (form.password.trim().length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
      isValid = false
    }

    if (!form.repeatPassword.trim()) {
      newErrors.repeatPassword = "Debes repetir la contraseña"
      isValid = false
    } else if (form.password !== form.repeatPassword) {
      newErrors.repeatPassword = "Las contraseñas no coinciden"
      isValid = false
    }else if (form.password.trim().length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const [apiError, setApiError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      const response = await authService.register(
        form.nombre,
        form.apellido,
        form.email,
        form.password
      );
      await login(response.data.token);
      navigate("/map", { replace: true });
    } catch (error) {
      setApiError("No se pudo crear la cuenta. Comprueba los datos e inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-app-bg flex flex-col justify-center items-center px-6">

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
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                  <Label htmlFor="register-nombre" className="text-gray-600">Nombre</Label>
                  <Input
                    id="register-nombre"
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    placeholder="Nombre"
                    className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
                  />
                {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="register-apellido" className="text-gray-600">Apellido</Label>
                <Input
                  id="register-apellido"
                  name="apellido"
                  type="text"
                  value={form.apellido}
                  onChange={(e) => handleChange("apellido", e.target.value)}
                  placeholder="Apellido"
                  className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.apellido ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="register-email" className="text-gray-600">Correo</Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="ejemplo@correo.com"
                className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="register-repeatEmail" className="text-gray-600">Escribir otra vez el correo</Label>
              <Input
                id="register-repeatEmail"
                name="repeatEmail"
                type="email"
                value={form.repeatEmail}
                onChange={(e) => handleChange("repeatEmail", e.target.value)}
                placeholder="ejemplo@correo.com"
                className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.repeatEmail ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.repeatEmail && <p className="text-red-500 text-sm">{errors.repeatEmail}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="register-password" className="text-gray-600">Contraseña</Label>
              <Input
                id="register-password"
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder=""
                className={`h-14 rounded-xl bg-white text-gray-700 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="register-repeatPassword" className="text-gray-600">Escribir otra vez la contraseña</Label>
              <Input
                id="register-repeatPassword"
                name="repeatPassword"
                type="password"
                value={form.repeatPassword}
                onChange={(e) => handleChange("repeatPassword", e.target.value)}
                placeholder=""
                className={`h-14 rounded-xl bg-white text-gray-700 ${errors.repeatPassword ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword}</p>}
            </div>

            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

            <Button type="submit" className="h-14 rounded-xl bg-green-800 hover:bg-green-900 text-lg font-bold shadow-lg mt-4">
              Registrarse
            </Button>
          </form>

        </CardContent>

      </Card>

      {/* LOGIN LINK */}
      <div className="mt-6 text-center">
        <span className="text-gray-700">¿Ya tienes una cuenta?</span>
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
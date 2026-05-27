import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useNavigate, Link } from "react-router-dom"
import {
  Card,
  CardContent,
} from "../ui/card"

export default function Login() {
  const Navigate = useNavigate();

  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ usuario: "", password: "" })

  const validate = () => {
    const newErrors = { usuario: "", password: "" }
    let isValid = true

    if (!usuario.trim()) {
      newErrors.usuario = "El usuario es obligatorio"
      isValid = false
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es obligatoria"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (validate()) {
      Navigate("/map")
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5EE] flex justify-center items-center px-6">

      <Card className="w-full max-w-sm bg-transparent border-none shadow-none">

        <CardContent className="flex flex-col gap-6 pt-10">

          {/* LOGO */}
          <div className="flex flex-col items-center">
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
          <form className="flex flex-col gap-5">

            {/* USER */}
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Usuario</Label>
              <Input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className={`
                  h-14 rounded-xl bg-white
                  ${errors.usuario ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.usuario && (
                <p className="text-red-500 text-sm">{errors.usuario}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Contraseña</Label>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`
                  h-14 rounded-xl bg-white
                  ${errors.password ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* BUTTON */}
            <Button
              onClick={handleLogin}
              className="
                h-14 rounded-full bg-green-800
                hover:bg-green-900 text-lg font-bold shadow-lg
              "
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

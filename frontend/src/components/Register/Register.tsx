import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
} from "../ui/card"

export default function Register() {
  const Navigate = useNavigate();

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
          <form className="flex flex-col gap-5">

            {/* NAME + LASTNAME */}
            <div className="grid grid-cols-2 gap-3">

              <div className="flex flex-col gap-2">

                <Label className="text-gray-600">Nombre</Label>

                <Input
                  type="text"
                  placeholder="Nombre"
                  className="
                    h-14
                    rounded-xl
                    border-gray-300
                    bg-white
                  "
                />

              </div>

              <div className="flex flex-col gap-2">

                <Label className="text-gray-600">Apellido</Label>

                <Input
                  type="text"
                  placeholder="Apellido"
                  className="
                    h-14
                    rounded-xl
                    border-gray-300
                    bg-white
                  "
                />

              </div>

            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">

              <Label className="text-gray-600">Correo</Label>

              <Input
                type="email"
                placeholder="ejemplo@correo.com"
                className="
                  h-14
                  rounded-xl
                  border-gray-300
                  bg-white
                "
              />

            </div>

            {/* REPEAT EMAIL */}
            <div className="flex flex-col gap-2">

              <Label className="text-gray-600">Escribir otra vez el correo</Label>

              <Input
                type="email"
                placeholder="ejemplo@correo.com"
                className="
                  h-14
                  rounded-xl
                  border-gray-300
                  bg-white
                "
              />

            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">

              <Label className="text-gray-600">Contraseña</Label>

              <Input
                type="password"
                placeholder=""
                className="
                  h-14
                  rounded-xl
                  border-gray-300
                  bg-white
                "
              />

            </div>

            {/* REPEAT PASSWORD */}
            <div className="flex flex-col gap-2">

              <Label>Escribir otra vez la contraseña</Label>

              <Input
                type="password"
                placeholder=""
                className="
                  h-14
                  rounded-xl
                  border-gray-300
                  bg-white
                "
              />

            </div>

            {/* BUTTON */}
            <Button onClick={() => {Navigate("/login")}}
              className="
                h-14
                rounded-xl
                bg-green-800
                hover:bg-green-900
                text-lg
                font-bold
                shadow-lg
                mt-4
              "
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

        <a
          onClick={() => {Navigate("/login")}}
          className="ml-2 text-green-700 font-bold hover:underline"
        >
          Inicia sesión
        </a>

      </div>

    </div>
  )
}
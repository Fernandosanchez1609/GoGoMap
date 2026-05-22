import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
} from "../ui/card"

export default function Login() {
  const Navigate = useNavigate();
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

              <Label className="text-gray-600">
                Usuario
              </Label>

              <Input
                type="text"
                placeholder="Usuario"
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

              <Label className="text-gray-600">
                Contraseña
              </Label>

              <Input
                type="password"
                placeholder="Contraseña"
                className="
                  h-14
                  rounded-xl
                  border-gray-300
                  bg-white
                "
              />

            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right">

            </div>

            {/* BUTTON */}
            <Button
              className="
                h-14
                rounded-full
                bg-green-800
                hover:bg-green-900
                text-lg
                font-bold
                shadow-lg
              "
            >
              {<a 
              onClick={() => {Navigate("/map")}}
            >
              Login
              </a>}
            </Button>

          </form>

          {/* REGISTER */}
          <div className="text-center">

            {<a 
              onClick={() => {Navigate("/register")}}
              className="text-green-700 font-semibold"
            >
              Regístrate aquí
            </a>}

          </div>

        </CardContent>

      </Card>

    </div>
  )
}
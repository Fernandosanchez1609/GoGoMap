import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useNavigate, Link } from "react-router-dom"
import {
  Card,
  CardContent,
} from "../ui/card"

export default function Register() {
  const Navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
  })

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
  })

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
    }

    if (!form.repeatPassword.trim()) {
      newErrors.repeatPassword = "Debes repetir la contraseña"
      isValid = false
    } else if (form.password !== form.repeatPassword) {
      newErrors.repeatPassword = "Las contraseñas no coinciden"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (validate()) {
      Navigate("/login")
    }
  }

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
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs">{errors.nombre}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-gray-600">Apellido</Label>
                <Input
                  type="text"
                  placeholder="Apellido"
                  value={form.apellido}
                  onChange={(e) => handleChange("apellido", e.target.value)}
                  className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.apellido ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.apellido && (
                  <p className="text-red-500 text-xs">{errors.apellido}</p>
                )}
              </div>

            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Correo</Label>
              <Input
                type="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* REPEAT EMAIL */}
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Escribir otra vez el correo</Label>
              <Input
                type="email"
                placeholder="ejemplo@correo.com"
                value={form.repeatEmail}
                onChange={(e) => handleChange("repeatEmail", e.target.value)}
                className={`h-14 rounded-xl bg-white text-gray-700 placeholder:text-gray-300 ${errors.repeatEmail ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.repeatEmail && (
                <p className="text-red-500 text-sm">{errors.repeatEmail}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Contraseña</Label>
              <Input
                type="password"
                placeholder=""
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`h-14 rounded-xl bg-white text-gray-700 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* REPEAT PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label className="text-gray-600">Escribir otra vez la contraseña</Label>
              <Input
                type="password"
                placeholder=""
                value={form.repeatPassword}
                onChange={(e) => handleChange("repeatPassword", e.target.value)}
                className={`h-14 rounded-xl bg-white text-gray-700 ${errors.repeatPassword ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.repeatPassword && (
                <p className="text-red-500 text-sm">{errors.repeatPassword}</p>
              )}
            </div>

            {/* BUTTON */}
            <Button
              onClick={handleRegister}
              className="
                h-14 rounded-xl bg-green-800
                hover:bg-green-900 text-lg font-bold shadow-lg mt-4
              "
            >
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


// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { useNavigate, Link } from "react-router-dom"
// import {
//   Card,
//   CardContent,
// } from "../ui/card"

// export default function Register() {
//   const Navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#F5F5EE] flex flex-col justify-center items-center px-6">
// 		{/* LOGO */}
//           <div className="flex flex-col items-center">

//             <img
//               src="/assets/Logo.png"
//               alt="GoGoMap"
//               className="w-64"
//             />

//           </div>
//       {/* CARD */}
//       <Card className="w-full max-w-sm mt-6">

//         <CardContent className="flex flex-col gap-6 pt-10 pb-8">

//           {/* FORM */}
//           <form className="flex flex-col gap-5">

//             {/* NAME + LASTNAME */}
//             <div className="grid grid-cols-2 gap-3">

//               <div className="flex flex-col gap-2">

//                 <Label className="text-gray-600">Nombre</Label>

//                 <Input
//                   type="text"
//                   placeholder="Nombre"
//                   className="
//                     h-14
//                     rounded-xl
//                     border-gray-300
//                     bg-white
//                   "
//                 />

//               </div>

//               <div className="flex flex-col gap-2">

//                 <Label className="text-gray-600">Apellido</Label>

//                 <Input
//                   type="text"
//                   placeholder="Apellido"
//                   className="
//                     h-14
//                     rounded-xl
//                     border-gray-300
//                     bg-white
//                   "
//                 />

//               </div>

//             </div>

//             {/* EMAIL */}
//             <div className="flex flex-col gap-2">

//               <Label className="text-gray-600">Correo</Label>

//               <Input
//                 type="email"
//                 placeholder="ejemplo@correo.com"
//                 className="
//                   h-14
//                   rounded-xl
//                   border-gray-300
//                   bg-white
//                 "
//               />

//             </div>

//             {/* REPEAT EMAIL */}
//             <div className="flex flex-col gap-2">

//               <Label className="text-gray-600">Escribir otra vez el correo</Label>

//               <Input
//                 type="email"
//                 placeholder="ejemplo@correo.com"
//                 className="
//                   h-14
//                   rounded-xl
//                   border-gray-300
//                   bg-white
//                 "
//               />

//             </div>

//             {/* PASSWORD */}
//             <div className="flex flex-col gap-2">

//               <Label className="text-gray-600">Contraseña</Label>

//               <Input
//                 type="password"
//                 placeholder=""
//                 className="
//                   h-14
//                   rounded-xl
//                   border-gray-300
//                   bg-white
//                 "
//               />

//             </div>

//             {/* REPEAT PASSWORD */}
//             <div className="flex flex-col gap-2">

//               <Label>Escribir otra vez la contraseña</Label>

//               <Input
//                 type="password"
//                 placeholder=""
//                 className="
//                   h-14
//                   rounded-xl
//                   border-gray-300
//                   bg-white
//                 "
//               />

//             </div>

//             {/* BUTTON */}
//             <Button onClick={() => {Navigate("/login")}}
//               className="
//                 h-14
//                 rounded-xl
//                 bg-green-800
//                 hover:bg-green-900
//                 text-lg
//                 font-bold
//                 shadow-lg
//                 mt-4
//               "
//             >
//               Registrarse
//             </Button>

//           </form>

//         </CardContent>

//       </Card>

//       {/* LOGIN LINK */}
//       <div className="mt-6 text-center">

//         <span className="text-gray-700">
//           ¿Ya tienes una cuenta?
//         </span>

//        <Link
//           to="/login"
//           className="ml-2 text-green-700 font-bold hover:underline cursor-pointer"
//         >
//           Inicia sesión
//         </Link>

//       </div>

//     </div>
//   )
// }
import Button from './Button'
import { Globe } from 'lucide-react'
import HowItWorks from './HowItWorks'

// Sección
const section = "relative px-6 pt-20 pb-4 flex flex-col items-center text-center gap-8"

// Badge
const badge = "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-primary/50 backdrop-blur-md text-white text-sm font-semibold"
const badgeIcon = "w-4 h-4"

// Título
const title = "text-4xl font-extrabold text-white leading-tight tracking-tight"
const titleAccent = "text-emerald-300"

// Subtítulo
const subtitle = "text-white/80 text-lg leading-relaxed max-w-sm"

// Botones
const buttons = "flex flex-col sm:flex-row gap-4 w-full max-w-sm"

// Imagen
const imgWrapper = "relative w-full max-w-sm flex justify-center"
const imgHalo = "absolute inset-0 bg-emerald-400/60 blur-[60px] rounded-full scale-75"
const imgBase = "relative w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl"


export default function Hero() {
  return (
    <section id="hero" className={section}>

      {/* Badge */}
      <div className={badge}>
        <Globe className={badgeIcon} />
        No. 1 en España en Karma ciudadano
      </div>

      {/* Título */}
      <h1 className={title}>
        Descubre Málaga<br />
        de forma <span className={titleAccent}>sostenible</span>
      </h1>

      {/* Subtítulo */}
      <p className={subtitle}>
        Localiza puntos ODS cerca de ti, gana Eco Points por tus acciones positivas y mejora tu huella en la ciudad.
      </p>

      {/* Botones */}
      <div className={buttons}>
        <Button label="Entrar a la App" href="/login" variant="primary" />
        <Button label="¿Cómo funciona?" href="#how-it-works" variant="primary" onClick={HowItWorks} />
      </div>

      {/* Imagen */}
      <div className={imgWrapper}>
        <div className={imgHalo} />
        <img
          src="/assets/fotos/malaga_noche.jpg"
          alt="Málaga de noche"
          className={imgBase}
        />
      </div>

      

    </section>
  )
}
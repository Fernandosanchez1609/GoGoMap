import { MapPin, Compass, Zap } from 'lucide-react'

// Sección
const section = "relative px-6 py-8 flex flex-col items-center gap-10 scroll-mt-24"

// Encabezado
const header = "flex flex-col items-center text-center gap-3"
const title = "text-3xl font-extrabold text-white leading-tight tracking-tight"

// Pasos
const steps = "w-full max-w-sm flex flex-col gap-6 relative"
const stepLine = "absolute left-7 top-8 bottom-8 w-0.5 bg-white/10"
const step = "flex items-start gap-4"
const stepIcon = "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/10 backdrop-blur-md"
const stepText = "flex flex-col gap-1 pt-2"
const stepTitle = "text-white font-bold text-base"
const stepDesc = "text-white/70 text-sm leading-relaxed"

// Datos
const stepsData = [
  {
    icon: <MapPin className="w-5 h-5 text-emerald-300" />,
    title: "Regístrate o inicia sesión",
    desc: "Crea tu cuenta gratis en menos de un minuto y activa tu geolocalización.",
  },
  {
    icon: <Compass className="w-5 h-5 text-blue-300" />,
    title: "Explora el mapa",
    desc: "Descubre los puntos ODS más cercanos, filtra por objetivo y elige tu destino.",
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-300" />,
    title: "Actúa y gana karma",
    desc: "Visita, confirma o reporta puntos ODS y acumula Eco Points para subir de nivel.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={section}>

      {/* Encabezado */}
      <div className={header}>
        <h2 className={title}>Tu camino al<br />impacto positivo</h2>
      </div>

      {/* Pasos */}
      <div className={steps}>
        <div className={stepLine} />
        {stepsData.map((s) => (
          <div key={s.title} className={step}>
            <div className={stepIcon}>
              {s.icon}
            </div>
            <div className={stepText}>
              <h3 className={stepTitle}>{s.title}</h3>
              <p className={stepDesc}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
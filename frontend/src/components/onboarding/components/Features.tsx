import { Map, Route, Star, Heart } from 'lucide-react'
import Button from './Button'

// Sección
const section = "relative px-6 py-8 flex flex-col items-center gap-12 scroll-mt-24"

// Encabezado
const header = "flex flex-col items-center text-center gap-3"
const title = "text-3xl font-extrabold text-white leading-tight tracking-tight"

// Grid
const grid = "w-full max-w-sm flex flex-col gap-4"

// Tarjeta
const card = "flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-primary/50 backdrop-blur-md"
const cardIcon = "w-10 h-10 rounded-xl flex items-center justify-center"
const cardTitle = "text-white font-bold text-lg"
const cardDesc = "text-white/70 text-sm leading-relaxed"

// Datos
const features = [
  {
    icon: <Map className="w-5 h-5 text-emerald-300" />,
    iconBg: "bg-emerald-400/20",
    title: "Mapa Interactivo",
    desc: "Visualiza en tiempo real todos los puntos ODS de Málaga. Filtra por objetivo, distancia o categoría.",
  },
  {
    icon: <Route className="w-5 h-5 text-blue-300" />,
    iconBg: "bg-blue-400/20",
    title: "Rutas a medida",
    desc: "Genera rutas optimizadas desde tu posición exacta hasta el punto sostenible más cercano.",
  },
  {
    icon: <Star className="w-5 h-5 text-amber-300" />,
    iconBg: "bg-amber-400/20",
    title: "Sistema de Karma",
    desc: "Cada visita, confirmación o reporte suma Karma Points. Compite y sé el más sostenible de tu ciudad.",
  },
  {
    icon: <Heart className="w-5 h-5 text-rose-300" />,
    iconBg: "bg-rose-400/20",
    title: "Favoritos y Perfil",
    desc: "Guarda tus puntos preferidos, revisa tu historial de karma y gestiona tu perfil personalizado.",
  },
]

// Botón
const buttonWrapper = "w-full max-w-sm flex flex-col sm:flex-row gap-4"

export default function Features() {
  return (
    <section id="features" className={section}>

      {/* Encabezado */}
      <div className={header}>
        <h2 className={title}>Todo lo que necesitas<br />para tu impacto</h2>
      </div>

      {/* Grid */}
      <div className={grid}>
        {features.map((f) => (
          <div key={f.title} className={card}>
            <div className={`${cardIcon} ${f.iconBg}`}>
              {f.icon}
            </div>
            <div>
              <h3 className={cardTitle}>{f.title}</h3>
              <p className={cardDesc}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

    {/* Botón */}
    <div className={buttonWrapper}>
        <Button label="Entrar a la App" href="/login" variant="primary" />
    </div>

    </section>
  )
}
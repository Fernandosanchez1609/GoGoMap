
import { useState, useEffect, useRef, useCallback } from "react"
import SlideCard from "@/components/onboarding/SlideCard"
import type { Slide } from "@/components/onboarding/SlideCard"
import { useNavigate } from "react-router-dom"

// Datos
const SLIDES: Slide[] = [
  {
    emoji: "🗺️",
    gradient: "from-emerald-900 to-emerald-700",
    title: "Mapa interactivo de GoGoMap",
    desc: "Explora en tiempo real todos los puntos sostenibles de la ciudad de Málaga. Cuida el entorno y conoce tu barrio.",
  },
  {
    emoji: "🎯",
    gradient: "from-blue-900 to-blue-600",
    title: "Filtra por objetivos ODS",
    desc: "Elije entre los 17 Objetivos de Desarrollo Sostenible y encuentra exacatamente, el que necesitas cerca de ti.",
  },
  {
    emoji: "⭐",
    gradient: "from-amber-900 to-amber-600",
    title: "Gana Karma-points actuando",
    desc: "Visita puntos, confirma su estado o reporta incidencias. Cada acción suma karma-points y sube tu posición.",
  },
  {
    emoji: "📍",
    gradient: "from-purple-900 to-purple-600",
    title: "Geolocalización precisa",
    desc: "La app detecta tu posición y te muestra los puntos más cercanos ordenados por distancia. Sin esfuerzo.",
  },
  {
    emoji: "🧭",
    gradient: "from-orange-900 to-orange-600",
    title: "Rutas hasta el destino",
    desc: "Selecciona un punto y recibe la ruta optimizada para llegar andando. El mapa te guía paso a paso.",
  },
  {
    emoji: "🏆",
    gradient: "from-green-900 to-green-600",
    title: "Ranking y progreso",
    desc: "Consulta tu perfil, tu historial de karma y compara tu impacto con el resto de la comunidad GoGoMap.",
  },
]

const N = SLIDES.length  // Número de slides
const SPEED = 0.5  // pixeles por frame que avanza el carusel
const SNAP_DURATION = 280  // milisegundos que dura la animación

// Helpers
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function generateParticles(count: number) {
  return Array.from({ length: count }, (_ , i) => ({
    id: i,
    size: 2 + Math.random() * 3,
    left: Math.random() * 100,
    top: 55 + Math.random() * 45,
    duration: 4 + Math.random() * 5,
    delay: Math.random() * 5,
  }))
}

// Componente principal
interface GoGomapOnBoardingProps {
  onEnter?: () => void
}

export default function GoGomapOnBoarding({
  onEnter,
}: GoGomapOnBoardingProps) {

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null) // contenedor visible del carusel
  const trackRef = useRef<HTMLDivElement>(null) // pista con todos los slides
  const rafRef = useRef<number>(0) // id del requestAnimationFram para cancelar animación
  const offsetRef = useRef<number>(0) // posición actual del carusel
  const autoPlayRef = useRef<boolean>(true) // si el carrusel se mueve solo
  const touchStartX = useRef<number>(0) // posición X al iniciar el touch
  const touchStartOffset = useRef<number>(0) // offset al inicial el touch
  const isDragging = useRef<boolean>(false) // si el usuario está arrastrando

  const navigate = useNavigate()
  
  // Estado
  const [activeReal, setActiveReal] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(true)
  const [particles] = useState(() => generateParticles(50))



// Cálculo del carusel
const getSlideWidth = useCallback((): number => {
  const track = trackRef.current
  if(!track) return 240
  const slide = track.querySelector<HTMLElement>(".flex-shrink-0")
  if(!slide) return 240
  const gap = parseFloat(getComputedStyle(track).gap) || 14
  return slide.offsetWidth + gap
}, [])

const wrapOffset = useCallback(
  (val: number): number => {
    const total = N * getSlideWidth()
    if(val >= total * 2) return val - total
    if(val < total) return val + total
    return val
  },
  [getSlideWidth]
)

const render = useCallback(() => {
  const track = trackRef.current
  const wrapper = wrapperRef.current
  if (!track || !wrapper) return
  track.style.transform = `translateX(-${offsetRef.current}px)`
  const cx = wrapper.offsetWidth / 2
  let minD = Infinity
  let ai = 0
  track.querySelectorAll<HTMLElement>(".flex-shrink-0").forEach((s, i) => {
    const r = s.getBoundingClientRect()
    const d = Math.abs(r.left + r.width / 2 - cx)
    if(d < minD) {minD = d; ai = i}
  })
  setActiveReal(ai % N)
}, [])

// Loop de animación
useEffect(() => {
  const timeout = setTimeout(() => {
    offsetRef.current = N * getSlideWidth()
    render()

    const tick = () => {
      if(autoPlayRef.current) {
        offsetRef.current = wrapOffset(offsetRef.current + SPEED)
      }
      render()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, 100)

  return () => {
    clearTimeout(timeout)
    cancelAnimationFrame(rafRef.current)
  }
}, [getSlideWidth, render, wrapOffset])

// Touch
const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartOffset.current = offsetRef.current
    isDragging.current = true
    autoPlayRef.current = false
}

const onTouchMove = (e: React.TouchEvent) => {
  if(!isDragging.current) return
  const delta = touchStartX.current - e.touches[0].clientX
  offsetRef.current = wrapOffset(touchStartOffset.current + delta)
  render()
}

const onTouchEnd = () => {
  if(!isDragging.current) return
  isDragging.current = false
  const sw = getSlideWidth()
  const snapped = Math.round(offsetRef.current / sw) * sw
  const target = wrapOffset(snapped)
  const from = offsetRef.current
  const diff = target - from
  const t0 = performance.now()

  const snapAnim = (now: number) => {
    const p = Math.min((now - t0) / SNAP_DURATION, 1)
    offsetRef.current = from + diff * easeInOut(p)
    render()
    if(p < 1) requestAnimationFrame(snapAnim)
      else autoPlayRef.current = true
  }
  requestAnimationFrame(snapAnim)
}

// Botón
const handlerEnter = () => {
  setVisible(false)
  setTimeout(() => navigate("/login"), 450)
}

// JSX
  const allSlides = [...SLIDES, ...SLIDES, ...SLIDES]

  return (
    <div
      className={[
        "relative w-full h-dvh flex flex-col items-center overflow-hidden",
        "transition-all duration-500",
        visible ? "opacity-100 scale-100" : "opacity-0 scale-105",
      ].join(" ")}
      style={{
        paddingTop: "max(env(safe-area-inset-top), 18px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
      }}
    >

      {/* ── Fondo ── */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-[#1B6D24] via-[#6DBD6A] to-[#A3F69C]">

        {/* Blobs */}
        <div className="absolute -top-[14vw] -left-[14vw] w-[55vw] h-[55vw] rounded-full bg-emerald-300/50 blur-[55px] animate-pulse" />
        <div className="absolute -bottom-[10vw] -right-[10vw] w-[44vw] h-[44vw] rounded-full bg-cyan-300/45 blur-[55px] animate-pulse [animation-delay:4.5s]" />
        <div className="absolute top-[38%] left-[56%] w-[28vw] h-[28vw] rounded-full bg-amber-300/60 blur-[50px] animate-pulse [animation-delay:4.5s]" />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.20) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.20) 1px,transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

      </div>
      {/* ── Fin Fondo ── */}

      {/* ── Partículas ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `particleFly ${p.duration}s ${p.delay}s linear infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>
      {/* ── Fin Partículas ── */}

      {/* ── Logo ── */}
      <div className="flex-shrink-0 flex flex-col items-center pb-2 animate-[fadeDown_3.7s_cubic-bezier(.22,1,.36,1)_both]">

        <div className="rounded-3xl backdrop-blur-md px-6 py-4" style={{ backgroundColor: 'var(--app-surface-1)', opacity: 0 }}>
          <img
            src="/assets/Logo.png"
            alt="GoGoMap"
            style={{ height: "clamp(150px, 25vw, 150px)" }}
          />
        </div>

        {/* Subtítulo */}
        <span
          className="font-mono text-white uppercase tracking-widest -mt-4 drop-shadow-xl"
          style={{ fontSize: "clamp(12px,3vw,16px)" }}
        >
          Málaga · ODS · Karma
        </span>

      </div>
      {/* ── Fin Logo ── */}

      {/* ── Carousel ── */}
      <div
        ref={wrapperRef}
        role="region"
        aria-label="Características de GoGoMap"
        className="flex-1 w-full overflow-hidden flex items-center min-h-0 -mt-40"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{ gap: "clamp(10px, 2.8vw, 18px)", padding: "0 clamp(10px, 5vw, 28px)" }}
        >
          {allSlides.map((slide, i) => (
            <SlideCard
              key={i}
              slide={slide}
            />
          ))}
        </div>
        {/* ── Fin trackRef ── */}
      </div>
      {/* ── Fin Carousel ── */}

      {/* ── Keyframes ── */}
      <style>{`
    @keyframes fadeDown {
      from { opacity: 0; transform: translateY(-18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes particleFly {
      0%   { opacity: 0; transform: translateY(0) scale(0); }
      10%  { opacity: .45; transform: translateY(-6px) scale(1); }
      90%  { opacity: .2; }
      100% { opacity: 0; transform: translateY(-80px) scale(.4); }
    }
  `}</style>

  {/* ── Botón ── */}
      <div className="flex-shrink-0 w-full px-[18px] py-4 animate-[fadeUp_.7s_.5s_cubic-bezier(.22,1,.36,1)_both]">
        <button
          onClick={handlerEnter}
          className={[
            "w-full rounded-full font-bold relative overflow-hidden",
            "bg-emerald-900 text-white",
            "shadow-[0_6px_20px_rgba(64,145,108,.48)]",
            "active:scale-95 transition-transform duration-150",
          ].join(" ")}
          style={{ height: "clamp(44px,10.5vw,52px)", fontSize: "clamp(13px,3.5vw,15px)" }}
        >
          <span className="relative z-10">Entrar en GoGoMap</span>
          
        </button>
      </div>
      {/* ── Fin Botón ── */}

    </div>
    )
}
    
                                                                                                                 
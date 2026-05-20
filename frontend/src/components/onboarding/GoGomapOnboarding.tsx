// export default function GoGomapOnboarding() {
//     return (
//         <div>
//             <h1>Onboarding</h1>
//         </div>
//     )
// }
import { useState, useEffect, useRef, useCallback } from "react"
import SlideCard from "@/components/onboarding/SlideCard"
import type { Slide } from "@/components/onboarding/SlideCard"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Datos
const SLIDES: Slide[] = [
  {
    emoji: "🗺️",
    gradient: "from-emeral-900 to-emeral-700",
    title: "Mapa interactivo de GoGoMap",
    desc: "Explora en tiempo real todos los puntos sostenibles de la ciudad de Málaga. Recicla, cuida el entorno y conoce tu barrio.",
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
function esaseInOut(t: number): number {
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
// export default function GoGomapOnboarding() {
//     return (
//         <div>
//             <h1>Onboarding</h1>
//         </div>
//     )
// }
import SlideCard from '@/components/onboarding/SlideCard'
import type { Slide } from '@/components/onboarding/SlideCard'

const TEST_SLIDE: Slide = {
  emoji: "🗺️",
  gradient: "from-emerald-900 to-emerald-700",
  title: "Mapa interactivo de GoGoMap",
  desc: "Explora en tiempo real todos los puntos sostenibles de tu ciudad.",
}

export default function GoGomapOnboarding() {
  return (
    <div className="flex items-center justify-center w-full h-dvh bg-gradient-to-br from-[#0D1F17] via-[#1B4332] to-[#2D6A4F]">
      <SlideCard slide={TEST_SLIDE} isActive={true} />
    </div>
  )
}
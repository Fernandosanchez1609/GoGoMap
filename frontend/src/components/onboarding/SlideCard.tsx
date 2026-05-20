// Types
export interface Slide {
    emoji: string
    gradient: string
    title: string
    desc: string
    tag: string
}

// Component
interface SlideCardProps {
    slide: Slide
    isActive: boolean
}

export default function SlideCard({ slide, isActive }: SlideCardProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={slide.title}
      className={[
        "flex-shrink-0 flex flex-col items-center text-center",
        "rounded-3xl border backdrop-blur-md",
        "transition-all duration-300 ease-out",
        "w-[68vw] max-w-[272px] p-5",
        isActive
          ? "bg-white/[0.11] border-emerald-400/40 scale-105 shadow-2xl"
          : "bg-white/[0.06] border-emerald-400/15",
      ].join(" ")}
    ></div>)}

    <div
    className={[
        "relative flex item-center justify-center flex-shrink-0",
        "w-[13vw] max-w-[66px] min-w-[52px]",
        "aspect-square rounded-2xl mb-3",
        `bg-gradient-to-br ${slide.gradient}`,
    ].join(" ")}
    style={{ fontSize: "clamp(26px, 6.5vw, 34px)"}}
    >
        <span role="img" aria-hidden="true">{slide.emoji</span>
    </div className>

// Types
export interface Slide {
    emoji: string
    gradient: string
    title: string
    desc: string
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
    >

    <div
    className={[
        "relative flex items-center justify-center flex-shrink-0",
        "w-[13vw] max-w-[66px] min-w-[52px]",
        "aspect-square rounded-2x1 mb-3",
        //`bg-gradient-to-br ${slide.gradient}`,
    ].join(" ")}
    style={{ fontSize: "clamp(26px, 6.5vw, 34px)"}}
    >
        <span role="img" aria-hidden="true">{slide.emoji}</span>
    </div >

    <h3
        className="font-bold text-white leading-snug mb-2"
        style={{ fontSize: "clamp(14px, 3.8vw, 17px)" }}
      >
        {slide.title}
      </h3>

      {/* Descripción */}
      <p
        className="font-light text-white/65 leading-relaxed"
        style={{ fontSize: "clamp(11.5px, 2.8vw, 13px)" }}
      >
        {slide.desc}
      </p>

    </div>
  )
}

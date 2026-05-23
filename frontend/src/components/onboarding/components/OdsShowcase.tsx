// Sección
const section = "relative px-6 py-8 flex flex-col items-center gap-8 scroll-mt-24"

// Encabezado
const header = "flex flex-col items-center text-center gap-3"
const title = "text-3xl font-extrabold text-white leading-tight tracking-tight"
const subtitle = "text-white/70 text-sm leading-relaxed max-w-sm"

// Grid
const grid = "flex gap-3 overflow-x-auto pb-2 w-full max-w-sm"

// Chip
const chip = "flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-default"
const chipImg = "w-full h-full object-cover"

// Datos — solo los ODS que usamos
const ods = [3, 6, 7, 11, 13, 15]

// Helper para construir el nombre del fichero
function odsImg(num: number): string {
  const padded = String(num).padStart(2, '0')
  return `/assets/ods/S-WEB-Goal-${padded}.png`
}

export default function OdsShowcase() {
  return (
    <section id="ods" className={section}>

      {/* Encabezado */}
      <div className={header}>
        <h2 className={title}>Los ODS que impulsamos</h2>
        <p className={subtitle}>Cada punto del mapa está categorizado por su Objetivo de Desarrollo Sostenible.</p>
      </div>

      {/* Chips */}
      <div className={grid}>
        {ods.map((num) => (
          <div key={num} className={chip}>
            <img
              src={odsImg(num)}
              alt={`ODS ${num}`}
              className={chipImg}
            />
          </div>
        ))}
      </div>

    </section>
  )
}
import Button from './Button'

// Sección
const section = "relative px-6 py-8 flex flex-col items-center gap-8 scroll-mt-24"
// Tarjeta principal
const card = "w-full max-w-sm flex flex-col gap-6 p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md"

// Encabezado
const title = "text-3xl font-extrabold text-white leading-tight tracking-tight"
const subtitle = "text-white/70 text-sm leading-relaxed"

// Tarjeta usuario
const userCard = "flex flex-col items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
const avatar = "w-16 h-16 rounded-full border-2 border-karma-gold/40 flex items-center justify-center text-3xl"
const userName = "text-white font-bold text-base"
const progressWrapper = "w-full bg-white/10 h-2 rounded-full overflow-hidden"
const progressFill = "h-full w-3/4 bg-karma-gold rounded-full shadow-[0_0_10px_#FFD700]"
const ecoPts = "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-karma-gold/10 text-karma-gold font-bold text-sm"

// Botón
const buttonWrapper = "w-full flex flex-col sm:flex-row gap-4"

export default function KarmaCallout() {
  return (
    <section id="karma" className={section}>

      <div className={card}>

        {/* Encabezado */}
        <h2 className={title}>¿Listo para mejorar<br />tu Karma?</h2>
        <p className={subtitle}>
          Los usuarios de GoGoMap ya han ahorrado más de 5.000 kg de CO₂ este mes en Málaga. ¿Y tú?
        </p>

        {/* Tarjeta usuario */}
        <div className={userCard}>
          <div className={avatar}>🌿</div>
          <div className="flex flex-col items-center gap-1">
            <span className={userName}>Ana Martínez</span>
          </div>
          <div className={progressWrapper}>
            <div className={progressFill} />
          </div>
          <div className={ecoPts}>
            240 Eco Points
          </div>
        </div>

        {/* Botón */}
        <div className={buttonWrapper}>
          <Button label="Entrar a la App" href="/login" variant="primary" />
        </div>

      </div>

    </section>
  )
}
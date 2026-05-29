import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import OdsShowcase from './components/OdsShowcase'
import HowItWorks from './components/HowItWorks'
import KarmaCallout from './components/KarmaCallout'
import Footer from './components/Footer'
import { useState } from 'react'


// Fondo
const bgBase = "fixed inset-0 -z-10 bg-gradient-to-tr from-sdg-13 via-sdg-15 to-text-muted]"

// Blobs
const blobBase = "absolute rounded-full blur-[55px] animate-pulse"
const blob1 = `${blobBase} -top-[14vw] -left-[14vw] w-[55vw] h-[55vw] bg-emerald-300/50`
const blob2 = `${blobBase} -bottom-[10vw] -right-[10vw] w-[44vw] h-[44vw] bg-cyan-300/45 [animation-delay:4.5s]`
const blob3 = `${blobBase} top-[38%] left-[56%] w-[28vw] h-[28vw] bg-amber-300/60 [animation-delay:4.5s]`

// Grid
const gridStyle = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.20) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.20) 1px,transparent 1px)",
  backgroundSize: "34px 34px",
}

// Particulas
function generateParticles(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 3,
        top: 10 + Math.random() * 80,
        duration: 4 + Math.random() * 5,
        delay: Math.random() * 6,
        fromLeft: i % 2 === 0,
    }))
}

// Estilos de partículas
const particleBase = "absolute rounded-full bg-white pointer-events-none"

export default function GoGomapOnboarding() {

    const [particles] = useState(() => generateParticles(90))

    return (        

        <div className='relative w-full overflow-x-hidden'>

            {/* Fondo */}
            <div className={bgBase}>
                <div className={blob1} />
                <div className={blob2} />
                <div className={blob3} />
                <div className='absolute inset-0' style={gridStyle} />
            </div>

            {/* Partículas */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                {particles.map((p) => (
                <div
                    key={p.id}
                    className={particleBase}
                    style={{
                    width: p.size,
                    height: p.size,
                    top: `${p.top}%`,
                    left: p.fromLeft ? '0%' : '100%',
                    animation: `${p.fromLeft ? 'particleFromLeft' : 'particleFromRight'} ${p.duration}s ${p.delay}s linear infinite`,
                    opacity: 0,
                    }}
                />
                ))}
            </div>

            <Navbar />
            <main className='pt-10'>
                <Hero />
                <Features />
                <OdsShowcase />
                <HowItWorks />
                <KarmaCallout />
            </main>
            <Footer />
        </div>
    )
}
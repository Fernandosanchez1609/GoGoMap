import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import OdsShowcase from './components/OdsShowcase'
import HowItWorks from './components/HowItWorks'
import KarmaCallout from './components/KarmaCallout'
import Footer from './components/Footer'

export default function GoGomapOnboarding() {
    return (
        <div className='bg-surface min-h-screen overflow-x-hidden'>
            <Navbar />
            <main className='pt-20'>
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
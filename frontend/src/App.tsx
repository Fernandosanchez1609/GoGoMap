import { useState } from "react"
import EcomapOnboarding from "@/components/onboarding/EcomapOnboarding"

function App() {
  const [onboardingDone, setOnboardingDone] = useState(false)

  if(!onboardingDone) {
    return (
      <EcomapOnboarding onEnter={() => setOnboardingDone(true)}/>
    )
  }
  return (
    <main>
      <h1>Bienvenido a Ecomap</h1>
    </main>
  )
}

export default App
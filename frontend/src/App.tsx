import { useState } from "react"
import GoGoMapOnboarding from "@/components/onboarding/GoGoMapOnboarding"

function App() {
  const [onboardingDone, setOnboardingDone] = useState(false)

  if(!onboardingDone) {
    return (
      <GoGoMapOnboarding onEnter={() => setOnboardingDone(true)}/>
    )
  }
  return (
    <main>
      <h1>Bienvenido a GoGoMap</h1>
    </main>
  )
}

export default App
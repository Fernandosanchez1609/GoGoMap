//import { useState } from "react"
//import GoGoMapOnboarding from "@/components/onboarding/GoGoMapOnboarding"
import AppRouter from "@/routes/AppRouter"

function App() {
  //const [onboardingDone, setOnboardingDone] = useState(false)

  /*if(!onboardingDone) {
    return (
       <GoGoMapOnboarding onEnter={() => setOnboardingDone(true)}/>
    )
  }*/
  return (
      <AppRouter />
  )
}

export default App
//import { useState } from "react"
//import GoGoMapOnboarding from "@/components/onboarding/GoGoMapOnboarding"
import AppRouter from "@/routes/AppRouter"
import { useEffect } from "react";

function App() {
  useEffect(() => {
    try {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) document.documentElement.classList.add('dark');
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      };
      if (mq && mq.addEventListener) mq.addEventListener('change', handler);
      return () => { if (mq && mq.removeEventListener) mq.removeEventListener('change', handler); };
    } catch (e) {
      // ignore
    }
  }, []);
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
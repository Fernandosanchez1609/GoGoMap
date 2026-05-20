// export default function GoGomapOnboarding() {
//     return (
//         <div>
//             <h1>Onboarding</h1>
//         </div>
//     )
// }
interface GoGomapOnboardingProps {
  onEnter?: () => void
  onExit?: () => void
}

export default function GoGomapOnboarding({ onEnter }: GoGomapOnboardingProps) {
  return (
    <div className="flex items-center justify-center w-full h-dvh bg-emerald-900 text-white">
      <p>Onboarding en construcción 🚧</p>
    </div>
  )
}
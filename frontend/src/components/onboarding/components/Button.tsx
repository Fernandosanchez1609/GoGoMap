import { Link } from "react-router-dom"

// Props
interface ButtonProps {
    label: string
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
}

// Primart - glow green
const primaryBase = [
    "inline-flex items-center justify-center gap-2",
    "px-6 py-3 rounded-full",
    "bg-emerald-600 text-white font-semibold text-sm",
    "shadow-[0_0_20px_rgba(52,211,153,0.5)]",
    "hover:shadow-[0_0_30px_rgba(52,211,153,0.7)]",
    "hover:bg-emerald-500",
    "transition-all duration-300",
].join(" ")

// Secondary - glassmorphism
const secondaryBase = [
    "inline-flex items-center justify-center gap-2",
    "px-6 py-3 rounded-full",
    "bg-white/10 backdrop-blur-md text-white font-semibold text-sm",
    "border border-white/20",
    "hover:bg-white/20",
    "transition-all duration-300",
].join(" ")

export default function Button({ label, href, onClick, variant = 'primary'}: ButtonProps) {
    const styles = variant === 'primary' ? primaryBase : secondaryBase

    if(href) {
        return (
            <Link to={href} className={styles}>
                {label}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={styles}>
            {label}
        </button>
    )
}
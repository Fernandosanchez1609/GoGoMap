import type { ReactNode } from "react"

// Props
interface ButtonProps {
    label: string
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
    icon?: ReactNode
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

function handleAnchorClick(href: string) {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if(el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Button({ label, href, onClick, variant = 'primary', icon}: ButtonProps) {
    const styles = variant === 'primary' ? primaryBase : secondaryBase

    if(href?.startsWith('#')) {
        return (
            <button className={styles} onClick={() => handleAnchorClick(href)}>
                {icon && icon}
                {label}
            </button>
        )
    }

    if(href) {
        return (
            <a href={href} className={styles}>
                {icon && icon}
                {label}
            </a>
        )
    }

    return (
        <button onClick={onClick} className={styles}>
            {icon && icon}
            {label}
        </button>
    )
}
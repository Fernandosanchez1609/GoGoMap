// Types
export interface Slide {
    emoji: string
    gradient: string
    title: string
    desc: string
    tag: string
}

// Component
interface SlideCardProps {
    slide: Slide
    isActive: boolean
}


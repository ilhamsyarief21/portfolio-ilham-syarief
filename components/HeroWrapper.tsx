import * as React from "react"
import WavingPortfolioLanding, { WavingPortfolioLandingProps } from "@/components/ui/waving-portfolio-landing"
import { ChevronDown } from "lucide-react"

export interface HeroData {
  name: string
  year: string
  role1: string
  role2: string
  letterLeft1: string
  letterLeft2: string
  giantLetter: string
  letterRight1: string
  letterRight2: string
  title: string
  signature: string
  greeting: string
  introEnabled: boolean
  height: string
}

interface HeroWrapperProps {
  data?: HeroData
  onIntroComplete?: () => void
}

export function HeroWrapper({ data, onIntroComplete }: HeroWrapperProps) {
  const [playIntro, setPlayIntro] = React.useState<boolean>(false)
  const [mounted, setMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMounted(true)
    let hasPlayedBefore = false
    try {
      hasPlayedBefore = sessionStorage.getItem("ilham_hero_intro_played") === "true"
    } catch {
      hasPlayedBefore = false
    }

    const shouldPlay = (data?.introEnabled ?? true) && !hasPlayedBefore
    setPlayIntro(shouldPlay)

    if (shouldPlay) {
      try {
        sessionStorage.setItem("ilham_hero_intro_played", "true")
      } catch {
        // ignore
      }
      const timer = window.setTimeout(() => {
        if (onIntroComplete) onIntroComplete()
      }, 7200)
      return () => window.clearTimeout(timer)
    } else {
      if (onIntroComplete) onIntroComplete()
    }
  }, [data?.introEnabled, onIntroComplete])

  const heroProps: WavingPortfolioLandingProps = {
    name: data?.name || "Ilham Syarief",
    year: data?.year || "2026",
    roles: [data?.role1 || "Full-Stack Developer", data?.role2 || "UI Designer"],
    lettersLeft: [data?.letterLeft1 || "P", data?.letterLeft2 || "F"],
    giantLetter: data?.giantLetter || "O",
    lettersRight: [data?.letterRight1 || "RT", data?.letterRight2 || "LIO"],
    title: data?.title || "Portfolio Ilham Syarief",
    signature: data?.signature || "ILHAM/SYARIEF",
    greeting: data?.greeting || "Halo!",
    accent: "#e5262c",
    paper: "#f6f4f0",
    ink: "#141414",
    intro: mounted ? playIntro : false,
    height: data?.height || "100svh",
  }

  return (
    <section className="relative w-full overflow-hidden select-none" id="hero">
      <WavingPortfolioLanding {...heroProps} />

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-auto z-20">
        <a
          href="#about"
          className="group flex flex-col items-center gap-1 text-[10px] font-bold tracking-[0.25em] uppercase text-[#66615b] hover:text-[#e5262c] transition-colors"
        >
          <span>Scroll</span>
          <div className="w-6 h-6 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:translate-y-1">
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
          </div>
        </a>
      </div>
    </section>
  )
}

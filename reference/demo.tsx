import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"
import AboutSection from "./about-section"
import ServicesSection from "./services-section"
import BookShowcase from "./book-showcase"
import JarvisSection from "./jarvis-section"
import TechStackSection from "./tech-stack-section"
import ContactSection from "./contact-section"
import SiteFooter from "./site-footer"
import { AnimatedTopDock } from "./shaders/animated-top-dock/AnimatedTopDock"
import "@designcodeio/threeui/style.css"
import "./shaders/threeui.css"
import "./styles.css"

function ScrollRevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]")
    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal")
      element.style.setProperty("--scroll-reveal-delay", `${(index % 4) * 85}ms`)
    })

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return null
}

function App() {
  return (
    <main>
      <ScrollRevealObserver />
      <div className="shader-frame">
        <AnimatedTopDock
          variant="sable"
          proximity={122}
          spring={0.19}
          damping={0.70}
          widthGrowth={17}
          heightGrowth={16}
          drop={3.5}
          className="vivan-dock"
        />
      </div>
      <div id="top">
        <WavingPortfolioLanding
          name="Vivan Agarwal"
          year="2011"
          roles={["Graphic Designer", "Vibe Coder"]}
        />
      </div>
      <AboutSection />
      <ServicesSection />
      <section id="field-manuals" className="vivan-book-showcase-section" data-scroll-reveal="up" aria-label="Tools for thought">
        <BookShowcase />
      </section>
      <JarvisSection />
      <TechStackSection />
      <ContactSection email="sb150048@birlahighschool.com" github="https://github.com/dashboard" />
      <SiteFooter />
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>,
)

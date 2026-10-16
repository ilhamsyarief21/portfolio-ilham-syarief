import * as React from "react"
import { Navbar } from "@/components/Navbar"
import { HeroWrapper, HeroData } from "@/components/HeroWrapper"
import { AboutSection } from "@/components/AboutSection"
import { ProjectsSection, ProjectItem } from "@/components/ProjectsSection"
import { SkillsSection, SkillItem } from "@/components/SkillsSection"
import { ExperienceSection, ExperienceItem } from "@/components/ExperienceSection"
import { ContactSection, SocialLinkItem } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { ProjectDetailModal } from "@/components/ProjectDetailModal"
import { AdminLogin } from "@/admin/AdminLogin"
import { AdminLayout } from "@/admin/AdminLayout"

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null)

  // Public data states
  const [siteSettings, setSiteSettings] = React.useState<any>(null)
  const [heroSettings, setHeroSettings] = React.useState<HeroData | undefined>(undefined)
  const [projects, setProjects] = React.useState<ProjectItem[]>([])
  const [skills, setSkills] = React.useState<SkillItem[]>([])
  const [experiences, setExperiences] = React.useState<ExperienceItem[]>([])
  const [socials, setSocials] = React.useState<SocialLinkItem[]>([])
  const [sections, setSections] = React.useState<any[]>([])
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null)
  const [navVisible, setNavVisible] = React.useState(false)

  // Route check
  React.useEffect(() => {
    const path = window.location.pathname
    if (path.startsWith("/admin")) {
      setIsAdminRoute(true)
      fetch("/api/auth/me")
        .then((res) => {
          if (res.ok) setIsAuthenticated(true)
          else setIsAuthenticated(false)
        })
        .catch(() => setIsAuthenticated(false))
    } else {
      setIsAdminRoute(false)
      loadPublicData()
    }
  }, [])

  const loadPublicData = async () => {
    try {
      const [siteRes, heroRes, projRes, skillRes, expRes, socRes, secRes] = await Promise.all([
        fetch("/api/site-settings").then((r) => r.json()),
        fetch("/api/hero-settings").then((r) => r.json()),
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/skills").then((r) => r.json()),
        fetch("/api/experiences").then((r) => r.json()),
        fetch("/api/socials").then((r) => r.json()),
        fetch("/api/sections").then((r) => r.json()),
      ])

      setSiteSettings(siteRes)
      setHeroSettings(heroRes)
      setProjects(projRes)
      setSkills(skillRes)
      setExperiences(expRes)
      setSocials(socRes)
      setSections(secRes)

      // Update document title and meta description
      if (siteRes?.title) document.title = siteRes.title
    } catch (e) {
      console.error("Error loading public data:", e)
    }
  }

  // Handle Admin view
  if (isAdminRoute) {
    if (isAuthenticated === null) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f6f4f0] text-sm text-[#66615b]">
          Authenticating secure gateway...
        </div>
      )
    }
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
    }
    return <AdminLayout onLogout={() => setIsAuthenticated(false)} />
  }

  // Section order and visibility helper
  const isSectionVisible = (key: string) => {
    const sec = sections.find((s) => s.sectionKey === key)
    return sec ? sec.isVisible : true
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-[#f6f4f0] text-[#141414] relative selection:bg-[#e5262c] selection:text-white">
      {/* Detached Island Navbar */}
      <Navbar visible={navVisible} siteName={siteSettings?.siteName || "Ilham Syarief"} />

      {/* Mandatory WavingPortfolioLanding Hero */}
      <HeroWrapper data={heroSettings} onIntroComplete={() => setNavVisible(true)} />

      {/* Render Public Sections Dynamically from DB order & visibility */}
      <main>
        {sortedSections.length > 0 ? (
          sortedSections.map((sec) => {
            if (!sec.isVisible) return null
            switch (sec.sectionKey) {
              case "about":
                return <AboutSection key="about" data={siteSettings} />
              case "projects":
                return (
                  <ProjectsSection
                    key="projects"
                    projects={projects}
                    onSelectProject={(p) => setSelectedProject(p)}
                  />
                )
              case "skills":
                return <SkillsSection key="skills" skills={skills} />
              case "experience":
                return <ExperienceSection key="experience" items={experiences} />
              case "contact":
                return <ContactSection key="contact" socials={socials} />
              default:
                return null
            }
          })
        ) : (
          <>
            <AboutSection data={siteSettings} />
            <ProjectsSection projects={projects} onSelectProject={(p) => setSelectedProject(p)} />
            <SkillsSection skills={skills} />
            <ExperienceSection items={experiences} />
            <ContactSection socials={socials} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer siteName={siteSettings?.siteName || "Ilham Syarief"} footerText={siteSettings?.footerText} />

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

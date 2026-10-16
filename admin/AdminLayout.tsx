import * as React from "react"
import {
  Sparkles,
  Settings,
  FolderGit2,
  Cpu,
  History,
  Share2,
  Inbox,
  Layers,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react"
import { HeroEditor } from "./HeroEditor"
import { SiteSettingsEditor } from "./SiteSettingsEditor"
import { ProjectsEditor } from "./ProjectsEditor"
import { SkillsEditor } from "./SkillsEditor"
import { ExperienceEditor } from "./ExperienceEditor"
import { SocialsEditor } from "./SocialsEditor"
import { MessagesViewer } from "./MessagesViewer"
import { SectionsEditor } from "./SectionsEditor"

interface AdminLayoutProps {
  onLogout: () => void
}

export function AdminLayout({ onLogout }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = React.useState<
    "hero" | "site" | "projects" | "skills" | "experience" | "socials" | "messages" | "sections"
  >("hero")

  const navItems = [
    { id: "hero", label: "Hero Component", icon: Sparkles },
    { id: "site", label: "Site & SEO", icon: Settings },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills Core", icon: Cpu },
    { id: "experience", label: "Experience", icon: History },
    { id: "socials", label: "Socials", icon: Share2 },
    { id: "messages", label: "Inbox Messages", icon: Inbox },
    { id: "sections", label: "Section Flow", icon: Layers },
  ] as const

  const handleLogoutClick = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch {
      // ignore
    }
    onLogout()
  }

  return (
    <div className="min-h-screen bg-[#f6f4f0] text-[#141414] flex flex-col">
      {/* Top Header */}
      <header className="border-b border-black/10 bg-white/70 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#e5262c] text-white flex items-center justify-center font-bold text-xs tracking-wider">
            IS
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight">Ilham Syarief</h1>
            <p className="text-[10px] font-mono text-[#66615b]">Admin Management Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-white hover:bg-black/5 text-xs font-semibold text-[#141414] transition-colors"
          >
            <span>Live Preview Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#66615b]" />
          </a>
          <button
            onClick={handleLogoutClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 hover:bg-red-50 hover:text-red-600 text-xs font-semibold text-[#66615b] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1">
          <div className="rounded-2xl p-1 bg-black/[0.02] border border-black/5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-[#141414] text-white shadow-sm"
                      : "text-[#66615b] hover:text-[#141414] hover:bg-black/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#e5262c]" : ""}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Tab Content */}
        <main className="lg:col-span-9 min-w-0">
          {activeTab === "hero" && <HeroEditor />}
          {activeTab === "site" && <SiteSettingsEditor />}
          {activeTab === "projects" && <ProjectsEditor />}
          {activeTab === "skills" && <SkillsEditor />}
          {activeTab === "experience" && <ExperienceEditor />}
          {activeTab === "socials" && <SocialsEditor />}
          {activeTab === "messages" && <MessagesViewer />}
          {activeTab === "sections" && <SectionsEditor />}
        </main>
      </div>
    </div>
  )
}

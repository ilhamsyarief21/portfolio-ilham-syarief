import * as React from "react"
import { Briefcase, GraduationCap, History, ArrowRight } from "lucide-react"

export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  description: string
  type: string // "EXPERIENCE" or "EDUCATION"
  order: number
  active: boolean
}

interface ExperienceSectionProps {
  items: ExperienceItem[]
}

export function ExperienceSection({ items }: ExperienceSectionProps) {
  const activeItems = items.filter((i) => i.active).sort((a, b) => a.order - b.order)
  const [filter, setFilter] = React.useState<"ALL" | "EXPERIENCE" | "EDUCATION">("ALL")

  const displayed = activeItems.filter((i) => {
    if (filter === "ALL") return true
    return i.type === filter
  })

  if (activeItems.length === 0) return null

  return (
    <section id="experience" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-[#e5262c]/20 text-[#e5262c] bg-[#e5262c]/5 mb-3">
            <History className="w-3 h-3" /> Trajectory
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141414]">
            Experience & Pedigree.
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-black/[0.04] border border-black/5 self-start md:self-end">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === "ALL" ? "bg-white text-[#141414] shadow-sm" : "text-[#66615b] hover:text-[#141414]"
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilter("EXPERIENCE")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === "EXPERIENCE" ? "bg-white text-[#141414] shadow-sm" : "text-[#66615b] hover:text-[#141414]"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setFilter("EDUCATION")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === "EDUCATION" ? "bg-white text-[#141414] shadow-sm" : "text-[#66615b] hover:text-[#141414]"
            }`}
          >
            Education
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {displayed.map((item) => (
          <div
            key={item.id}
            className="rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5 hover:ring-[#e5262c]/20 transition-all duration-300"
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#e5262c]/10 text-[#e5262c] flex items-center justify-center">
                    {item.type === "EDUCATION" ? (
                      <GraduationCap className="w-4 h-4" />
                    ) : (
                      <Briefcase className="w-4 h-4" />
                    )}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e5262c]">
                    {item.company}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141414]">
                  {item.title}
                </h3>

                <p className="text-sm text-[#66615b] leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="md:text-right shrink-0">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/[0.04] text-[#141414]">
                  {item.period}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

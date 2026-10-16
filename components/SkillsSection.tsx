import * as React from "react"
import { Cpu, CheckCircle2 } from "lucide-react"

export interface SkillItem {
  id: string
  name: string
  category: string
  proficiency: number
  iconName?: string | null
  order: number
}

interface SkillsSectionProps {
  skills: SkillItem[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Group by category
  const categories = React.useMemo(() => {
    const map = new Map<string, SkillItem[]>()
    for (const skill of skills) {
      const cat = skill.category || "General"
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(skill)
    }
    return Array.from(map.entries())
  }, [skills])

  return (
    <section id="skills" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-[#e5262c]/20 text-[#e5262c] bg-[#e5262c]/5 mb-3">
            <Cpu className="w-3 h-3" /> Technical Core
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141414]">
            Stack & Tooling.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#66615b] max-w-md">
          Tested across mission-critical services, high-throughput microservices, and kinetic web apps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(([category, items]) => (
          <div
            key={category}
            className="rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5"
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 shadow-sm flex flex-col h-full justify-between gap-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-5">
                  <h3 className="font-extrabold text-lg tracking-tight text-[#141414] uppercase">
                    {category}
                  </h3>
                  <span className="text-[11px] font-mono text-[#e5262c] font-bold">
                    {items.length} Techs
                  </span>
                </div>

                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#141414] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#e5262c]" />
                          {skill.name}
                        </span>
                        <span className="font-mono text-[#66615b] text-[11px]">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-black/[0.04] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#141414] to-[#e5262c] transition-all duration-1000 ease-out"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono uppercase tracking-wider text-[#9a948d]">
                Verified Proficiency // 2026
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

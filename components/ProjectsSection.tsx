import * as React from "react"
import { ArrowUpRight, Github, FolderGit2, Eye } from "lucide-react"

export interface ProjectItem {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string | null
  imageUrl: string
  demoUrl?: string | null
  repoUrl?: string | null
  tags: string
  featured: boolean
  published: boolean
  order: number
}

interface ProjectsSectionProps {
  projects: ProjectItem[]
  onSelectProject: (p: ProjectItem) => void
}

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const published = projects.filter((p) => p.published).sort((a, b) => a.order - b.order)

  return (
    <section id="projects" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-[#e5262c]/20 text-[#e5262c] bg-[#e5262c]/5 mb-3">
            <FolderGit2 className="w-3 h-3" /> Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141414]">
            Engineered for Impact.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#66615b] max-w-md">
          Production systems, distributed backends, and tactile interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {published.map((project, idx) => {
          const colSpan = idx % 3 === 0 ? "lg:col-span-8" : "lg:col-span-4"
          const tagList = project.tags ? project.tags.split(",").map((t) => t.trim()) : []

          return (
            <div
              key={project.id}
              className={`${colSpan} rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5 hover:ring-[#e5262c]/30 transition-all duration-300 group flex flex-col`}
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-white overflow-hidden flex flex-col flex-grow shadow-sm">
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-100 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#e5262c] text-white">
                      Featured
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectProject(project)
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-[#141414] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> Details
                  </button>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap gap-1">
                      {tagList.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-black/[0.04] text-[#66615b]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-xl font-bold tracking-tight text-[#141414] hover:text-[#e5262c] cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#66615b] line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/5">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-2 pl-3.5 pr-1 py-1 rounded-full bg-[#141414] text-white text-xs font-semibold hover:bg-[#e5262c] transition-colors"
                      >
                        <span>Live Site</span>
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5">
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </a>
                    ) : (
                      <button onClick={() => onSelectProject(project)} className="text-xs font-bold text-[#e5262c]">
                        Details →
                      </button>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-[#141414] hover:bg-black/5"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

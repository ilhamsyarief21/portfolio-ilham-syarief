import * as React from "react"
import { X, ArrowUpRight, Github, ExternalLink, Calendar } from "lucide-react"
import { ProjectItem } from "./ProjectsSection"

interface ProjectDetailModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null

  const tags = project.tags ? project.tags.split(",").map((t) => t.trim()) : []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-up">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-2 bg-black/10 ring-1 ring-white/10 shadow-2xl">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-6 sm:p-10 text-[#141414] relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#141414] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 bg-neutral-100">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/[0.04] text-[#66615b]">
                {t}
              </span>
            ))}
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {project.title}
          </h2>

          <p className="text-base sm:text-lg text-[#66615b] leading-relaxed mb-6 font-normal">
            {project.description}
          </p>

          {project.longDescription && (
            <div className="p-6 rounded-2xl bg-black/[0.02] border border-black/5 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#e5262c] mb-2 font-mono">
                System Architecture & Architecture Details
              </h4>
              <p className="text-sm text-[#66615b] leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          )}

          {/* External links */}
          <div className="flex items-center gap-4 flex-wrap pt-4 border-t border-black/10">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5262c] hover:bg-[#c91e24] text-white text-sm font-semibold transition-colors"
              >
                <span>Visit Live Platform</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black/5 text-sm font-semibold transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

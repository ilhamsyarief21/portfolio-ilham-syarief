import * as React from "react"
import { Download, Sparkles, Terminal, Cpu, Layers } from "lucide-react"

interface AboutData {
  siteName?: string
  bioTitle?: string
  bioParagraph?: string
  aboutImage?: string
  cvUrl?: string
}

export function AboutSection({ data }: { data?: AboutData }) {
  const name = data?.siteName || "Ilham Syarief"
  const title = data?.bioTitle || "Architecting resilient systems, sculpting tactile interfaces."
  const bio =
    data?.bioParagraph ||
    "I am Ilham Syarief, a Full-Stack Developer and UI Designer building next-generation digital products. From high-concurrency event platforms to kinetic editorial web designs, I merge rigorous backend stability with obsessive visual aesthetics."
  const image =
    data?.aboutImage ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"

  return (
    <section id="about" className="py-28 md:py-36 px-4 max-w-7xl mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-[#e5262c]/20 text-[#e5262c] bg-[#e5262c]/5">
          <Sparkles className="w-3 h-3" />
          Manifesto & Background
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Editorial Headline & Bio */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141414] leading-[1.08]">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-[#66615b] leading-relaxed font-normal max-w-2xl">
            {bio}
          </p>

          {/* Quick Metrics / Capabilities in Double-Bezel mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="rounded-2xl p-1 bg-black/[0.03] ring-1 ring-black/5">
              <div className="rounded-xl bg-white p-4">
                <Terminal className="w-5 h-5 text-[#e5262c] mb-2" strokeWidth={1.5} />
                <p className="text-xs font-bold uppercase tracking-wider text-[#141414]">Full-Stack</p>
                <p className="text-[11px] text-[#66615b] mt-0.5">End-to-end cloud & systems</p>
              </div>
            </div>

            <div className="rounded-2xl p-1 bg-black/[0.03] ring-1 ring-black/5">
              <div className="rounded-xl bg-white p-4">
                <Layers className="w-5 h-5 text-[#e5262c] mb-2" strokeWidth={1.5} />
                <p className="text-xs font-bold uppercase tracking-wider text-[#141414]">UI Architecture</p>
                <p className="text-[11px] text-[#66615b] mt-0.5">High-end tactile motion</p>
              </div>
            </div>

            <div className="rounded-2xl p-1 bg-black/[0.03] ring-1 ring-black/5">
              <div className="rounded-xl bg-white p-4">
                <Cpu className="w-5 h-5 text-[#e5262c] mb-2" strokeWidth={1.5} />
                <p className="text-xs font-bold uppercase tracking-wider text-[#141414]">Performance</p>
                <p className="text-[11px] text-[#66615b] mt-0.5">Sub-millisecond execution</p>
              </div>
            </div>
          </div>

          {/* CTA: Button-in-Button Trailing Icon Pattern */}
          <div className="pt-4 flex items-center gap-4 flex-wrap">
            <a
              href={data?.cvUrl || "#contact"}
              className="group inline-flex items-center gap-4 pl-6 pr-2 py-2.5 rounded-full bg-[#e5262c] text-white font-semibold text-sm hover:bg-[#c91e24] transition-all duration-300 shadow-sm active:scale-[0.98]"
            >
              <span>Download Curriculum Vitae</span>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-y-0.5">
                <Download className="w-4 h-4" strokeWidth={2} />
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-full border border-black/10 bg-white/70 hover:bg-white text-sm font-semibold text-[#141414] transition-colors"
            >
              Direct Message
            </a>
          </div>
        </div>

        {/* Right Column: Double-Bezel Photo Frame */}
        <div className="lg:col-span-5">
          <div className="rounded-[2.5rem] p-2 bg-black/[0.03] ring-1 ring-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <div className="relative rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-white aspect-[4/5] group">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-xs uppercase tracking-widest font-mono text-[#e5262c] font-bold">Principal Engineer</p>
                <p className="text-xl font-bold tracking-tight mt-0.5">{name}</p>
                <p className="text-xs text-white/80 mt-1 font-mono">ID // SYARIEF-DEV-2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

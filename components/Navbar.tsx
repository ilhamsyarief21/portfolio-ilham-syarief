import * as React from "react"
import { ArrowUpRight, Menu, X, Shield } from "lucide-react"

interface NavbarProps {
  visible?: boolean
  siteName?: string
}

export function Navbar({ visible = true, siteName = "Ilham Syarief" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center justify-between px-5 py-2.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-[#f6f4f0]/85 backdrop-blur-xl border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            : "bg-[#f6f4f0]/60 backdrop-blur-md border-black/5"
        }`}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-[#e5262c] text-white flex items-center justify-center font-bold text-xs tracking-wider transition-transform duration-300 group-hover:scale-105">
            IS
          </span>
          <span className="font-bold text-sm tracking-tight text-[#141414] group-hover:text-[#e5262c] transition-colors">
            {siteName}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#66615b]">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full hover:text-[#141414] hover:bg-black/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Admin Link */}
        <div className="flex items-center gap-2">
          <a
            href="/admin"
            title="Admin Dashboard"
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 text-[#66615b] hover:text-[#141414] transition-colors"
          >
            <Shield className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#141414] text-white text-xs font-medium tracking-wide hover:bg-[#e5262c] transition-colors active:scale-95"
          >
            <span>Let's Talk</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-black/5 text-[#141414]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 p-5 rounded-3xl bg-[#f6f4f0]/95 backdrop-blur-2xl border border-black/10 shadow-2xl flex flex-col gap-3 animate-fade-up">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#141414] hover:bg-black/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#66615b] hover:bg-black/5 flex items-center gap-2"
          >
            <Shield className="w-4 h-4" /> Admin Portal
          </a>
        </div>
      )}
    </header>
  )
}

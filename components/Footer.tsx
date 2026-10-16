import * as React from "react"
import { ArrowUp, Shield } from "lucide-react"

interface FooterProps {
  siteName?: string
  footerText?: string
}

export function Footer({ siteName = "Ilham Syarief", footerText }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-16 px-4 border-t border-black/10 bg-[#f6f4f0] text-[#141414]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#e5262c] text-white flex items-center justify-center font-bold text-xs tracking-wider">
            IS
          </div>
          <div>
            <p className="font-extrabold tracking-tight text-sm">{siteName}</p>
            <p className="text-[11px] text-[#66615b]">
              {footerText || "Designed & Engineered by Ilham Syarief. All rights reserved."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#66615b]">
          <a href="/admin" className="hover:text-[#141414] flex items-center gap-1 transition-colors">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </a>
          <span>•</span>
          <span>© 2026</span>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full border border-black/10 hover:border-black/30 bg-white flex items-center justify-center text-[#141414] hover:bg-black/5 transition-colors cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

import * as React from "react"
import { Send, Mail, MapPin, CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react"

export interface SocialLinkItem {
  id: string
  platform: string
  url: string
  icon: string
  active: boolean
  order: number
}

interface ContactSectionProps {
  socials: SocialLinkItem[]
}

export function ContactSection({ socials }: ContactSectionProps) {
  const [formData, setFormData] = React.useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const activeSocials = socials.filter((s) => s.active).sort((a, b) => a.order - b.order)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to submit message")

      setSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-[#e5262c]/20 text-[#e5262c] bg-[#e5262c]/5 mb-3">
              <MessageSquare className="w-3 h-3" /> Contact
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141414] leading-[1.08]">
              Let’s build something enduring.
            </h2>
          </div>
          <p className="text-base text-[#66615b]">
            Have a project in mind or an architectural challenge? Drop a note.
          </p>
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-sm text-[#141414]">
              <div className="w-10 h-10 rounded-full bg-black/[0.04] flex items-center justify-center text-[#e5262c]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-[#66615b]">Email</p>
                <a href="mailto:contact@ilhamsyarief.dev" className="font-semibold hover:text-[#e5262c]">
                  contact@ilhamsyarief.dev
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#141414]">
              <div className="w-10 h-10 rounded-full bg-black/[0.04] flex items-center justify-center text-[#e5262c]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-[#66615b]">Location</p>
                <p className="font-semibold">Remote & Worldwide</p>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#66615b] mb-3">Profiles</p>
            <div className="flex flex-wrap gap-2">
              {activeSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 bg-white/70 hover:bg-white text-xs font-semibold text-[#141414]"
                >
                  <span>{social.platform}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#66615b]" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-[2.5rem] p-2 bg-black/[0.03] ring-1 ring-black/5 shadow-sm">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-6 sm:p-10">
              {success ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#e5262c]/10 text-[#e5262c] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#141414]">Message Transmitted</h3>
                  <p className="text-sm text-[#66615b]">Thank you. Your message was received.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 px-6 py-2 rounded-full bg-[#141414] text-white text-xs font-semibold">
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="p-3 rounded-2xl bg-red-50 text-xs text-red-600 font-medium">{error}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#141414]">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-black/10 focus:border-[#e5262c] text-sm outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#141414]">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-black/10 focus:border-[#e5262c] text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#141414]">Subject</label>
                    <input
                      type="text"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-black/10 focus:border-[#e5262c] text-sm outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#141414]">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Detail your timeline and requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-black/10 focus:border-[#e5262c] text-sm outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#e5262c] text-white font-semibold text-sm hover:bg-[#c91e24] cursor-pointer"
                  >
                    <span>{loading ? "Transmitting..." : "Send Dispatch"}</span>
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                      <Send className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

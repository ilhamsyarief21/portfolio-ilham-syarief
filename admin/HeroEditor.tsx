import * as React from "react"
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"
import { Sparkles, Save, CheckCircle2 } from "lucide-react"

export function HeroEditor() {
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [status, setStatus] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch("/api/hero-settings")
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus(null)

    try {
      const res = await fetch("/api/hero-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to save settings")
      setStatus("Hero configuration saved!")
      setTimeout(() => setStatus(null), 3000)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !data) {
    return <div className="p-8 text-center text-sm text-[#66615b]">Loading Hero config...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Hero Component Controls</h2>
          <p className="text-xs text-[#66615b] mt-1">
            Real-time parameter tuning for WavingPortfolioLanding with immediate preview.
          </p>
        </div>
        {status && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> {status}
          </span>
        )}
      </div>

      <div className="rounded-[2.5rem] p-2 bg-black/[0.03] ring-1 ring-black/5 shadow-md">
        <div className="rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-[#f6f4f0] border border-black/5">
          <div className="px-5 py-3 border-b border-black/5 flex items-center justify-between bg-white/60">
            <span className="text-[11px] font-mono uppercase font-bold text-[#e5262c] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Live Interactive Canvas
            </span>
            <span className="text-[11px] font-mono text-[#66615b]">Height: 460px fixed preview</span>
          </div>
          <div className="w-full h-[460px] overflow-hidden relative">
            <WavingPortfolioLanding
              name={data.name || "Ilham Syarief"}
              year={data.year || "2026"}
              roles={[data.role1 || "Full-Stack Developer", data.role2 || "UI Designer"]}
              lettersLeft={[data.letterLeft1 || "P", data.letterLeft2 || "F"]}
              giantLetter={data.giantLetter || "O"}
              lettersRight={[data.letterRight1 || "RT", data.letterRight2 || "LIO"]}
              title={data.title || "Portfolio Ilham Syarief"}
              signature={data.signature || "ILHAM/SYARIEF"}
              greeting={data.greeting || "Halo!"}
              accent="#e5262c"
              paper="#f6f4f0"
              ink="#141414"
              intro={false}
              height="100%"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSave} className="rounded-[2rem] p-2 bg-black/[0.03] ring-1 ring-black/5">
        <div className="rounded-[calc(2rem-0.5rem)] bg-white p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Top Left Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Top Right Year</label>
              <input
                type="text"
                value={data.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Greeting</label>
              <input
                type="text"
                value={data.greeting}
                onChange={(e) => handleChange("greeting", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Role 1</label>
              <input
                type="text"
                value={data.role1}
                onChange={(e) => handleChange("role1", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Role 2</label>
              <input
                type="text"
                value={data.role2}
                onChange={(e) => handleChange("role2", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Signature</label>
              <input
                type="text"
                value={data.signature}
                onChange={(e) => handleChange("signature", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5 space-y-3">
            <h4 className="text-xs font-bold uppercase text-[#e5262c]">Poster Letters Reel</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-[10px] font-bold text-[#141414]">Left Top</label>
                <input
                  type="text"
                  maxLength={2}
                  value={data.letterLeft1}
                  onChange={(e) => handleChange("letterLeft1", e.target.value.toUpperCase())}
                  className="w-full text-center font-mono font-bold py-2 rounded-xl border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#141414]">Left Bottom</label>
                <input
                  type="text"
                  maxLength={2}
                  value={data.letterLeft2}
                  onChange={(e) => handleChange("letterLeft2", e.target.value.toUpperCase())}
                  className="w-full text-center font-mono font-bold py-2 rounded-xl border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#e5262c]">Giant Letter</label>
                <input
                  type="text"
                  maxLength={1}
                  value={data.giantLetter}
                  onChange={(e) => handleChange("giantLetter", e.target.value.toUpperCase())}
                  className="w-full text-center font-mono font-bold py-2 rounded-xl border-2 border-[#e5262c] text-sm text-[#e5262c]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#141414]">Right Top</label>
                <input
                  type="text"
                  value={data.letterRight1}
                  onChange={(e) => handleChange("letterRight1", e.target.value.toUpperCase())}
                  className="w-full text-center font-mono font-bold py-2 rounded-xl border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#141414]">Right Bottom</label>
                <input
                  type="text"
                  value={data.letterRight2}
                  onChange={(e) => handleChange("letterRight2", e.target.value.toUpperCase())}
                  className="w-full text-center font-mono font-bold py-2 rounded-xl border border-black/10 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/[0.02] border border-black/5">
            <div>
              <p className="text-xs font-bold uppercase text-[#141414]">Enable Cinematic Intro</p>
              <p className="text-[11px] text-[#66615b]">Displays slot reel & ink animation on initial load.</p>
            </div>
            <input
              type="checkbox"
              checked={data.introEnabled}
              onChange={(e) => handleChange("introEnabled", e.target.checked)}
              className="w-5 h-5 accent-[#e5262c] cursor-pointer"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-black/5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e5262c] hover:bg-[#c91e24] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? "Saving..." : "Save Hero Configuration"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

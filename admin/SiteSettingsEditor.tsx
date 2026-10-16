import * as React from "react"
import { Save, CheckCircle2 } from "lucide-react"

export function SiteSettingsEditor() {
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [status, setStatus] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus(null)

    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to save site settings")
      setStatus("Settings saved!")
      setTimeout(() => setStatus(null), 3000)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !data) {
    return <div className="p-8 text-center text-sm text-[#66615b]">Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Site Architecture & Meta</h2>
          <p className="text-xs text-[#66615b]">Global identity, SEO descriptors, and biography.</p>
        </div>
        {status && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> {status}
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="rounded-[2rem] p-2 bg-black/[0.03] ring-1 ring-black/5">
        <div className="rounded-[calc(2rem-0.5rem)] bg-white p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Official Name *</label>
              <input
                type="text"
                required
                value={data.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
              <p className="text-[10px] text-[#66615b]">Strict spelling: "Ilham Syarief".</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">SEO Document Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#141414]">Meta Description (SEO)</label>
            <textarea
              rows={2}
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Bio Headline</label>
              <input
                type="text"
                value={data.bioTitle}
                onChange={(e) => handleChange("bioTitle", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">CV Download URL</label>
              <input
                type="text"
                value={data.cvUrl || ""}
                placeholder="https://..."
                onChange={(e) => handleChange("cvUrl", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#141414]">Biography Paragraph</label>
            <textarea
              rows={3}
              value={data.bioParagraph}
              onChange={(e) => handleChange("bioParagraph", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Portrait Image URL</label>
              <input
                type="text"
                value={data.aboutImage}
                onChange={(e) => handleChange("aboutImage", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#141414]">Footer Notice</label>
              <input
                type="text"
                value={data.footerText}
                onChange={(e) => handleChange("footerText", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/[0.02] border border-black/10 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-black/5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e5262c] hover:bg-[#c91e24] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? "Updating..." : "Save Settings"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

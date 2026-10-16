import * as React from "react"
import { ArrowUp, ArrowDown, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react"

export function SectionsEditor() {
  const [sections, setSections] = React.useState<any[]>([])
  const [saving, setSaving] = React.useState(false)
  const [status, setStatus] = React.useState<string | null>(null)

  const loadData = () => {
    fetch("/api/sections")
      .then((r) => r.json())
      .then(setSections)
      .catch(console.error)
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= sections.length) return
    const updated = [...sections]
    const temp = updated[index]
    updated[index] = updated[targetIdx]
    updated[targetIdx] = temp
    setSections(updated.map((s, i) => ({ ...s, order: i + 1 })))
  }

  const toggleVisible = (index: number) => {
    const updated = [...sections]
    updated[index].isVisible = !updated[index].isVisible
    setSections(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      })
      if (!res.ok) throw new Error("Failed to save sections")
      setStatus("Section layout updated!")
      setTimeout(() => setStatus(null), 3000)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Landing Page Sections</h2>
          <p className="text-xs text-[#66615b]">Reorder flow and toggle visibility for public sections.</p>
        </div>
        {status && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> {status}
          </span>
        )}
      </div>

      <div className="rounded-[2rem] p-2 bg-black/[0.03] ring-1 ring-black/5">
        <div className="rounded-[calc(2rem-0.5rem)] bg-white divide-y divide-black/5 overflow-hidden">
          {sections.map((section, idx) => (
            <div key={section.sectionKey} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#66615b] w-5">
                  0{idx + 1}
                </span>
                <div>
                  <p className="font-bold text-sm text-[#141414]">{section.title}</p>
                  <p className="text-[11px] font-mono text-[#9a948d]">Key: #{section.sectionKey}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleVisible(idx)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    section.isVisible
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-neutral-200 bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {section.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{section.isVisible ? "Visible" : "Hidden"}</span>
                </button>

                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 disabled:opacity-30"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === sections.length - 1}
                  className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 disabled:opacity-30"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e5262c] hover:bg-[#c91e24] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? "Saving..." : "Commit Section Order"}</span>
        </button>
      </div>
    </div>
  )
}

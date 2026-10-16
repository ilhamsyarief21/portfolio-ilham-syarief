import * as React from "react"
import { Plus, Trash2, Edit3 } from "lucide-react"

export function ExperienceEditor() {
  const [items, setItems] = React.useState<any[]>([])
  const [editing, setEditing] = React.useState<any | null>(null)
  const [isNew, setIsNew] = React.useState(false)

  const loadData = () => {
    fetch("/api/experiences")
      .then((r) => r.json())
      .then(setItems)
      .catch(console.error)
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/experiences" : `/api/experiences/${editing.id}`

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error("Failed to save experience")
      setEditing(null)
      setIsNew(false)
      loadData()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete experience item?")) return
    try {
      await fetch(`/api/experiences/${id}`, { method: "DELETE" })
      loadData()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Career & Education Timeline</h2>
          <p className="text-xs text-[#66615b]">Manage work trajectory and academic honors.</p>
        </div>
        <button
          onClick={() => {
            setEditing({
              title: "",
              company: "",
              period: "2024 — Present",
              description: "",
              type: "EXPERIENCE",
              active: true,
              order: items.length + 1,
            })
            setIsNew(true)
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e5262c] text-white text-xs font-semibold cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Milestone
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl p-1.5 bg-black/10 shadow-xl">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 space-y-3">
              <h3 className="font-bold text-sm text-[#141414]">
                {isNew ? "New Milestone" : "Edit Milestone"}
              </h3>
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#141414]">Title *</label>
                  <input
                    required
                    type="text"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#141414]">Company / Org *</label>
                  <input
                    required
                    type="text"
                    value={editing.company}
                    onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#141414]">Period</label>
                    <input
                      type="text"
                      value={editing.period}
                      onChange={(e) => setEditing({ ...editing, period: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#141414]">Type</label>
                    <select
                      value={editing.type}
                      onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none bg-white"
                    >
                      <option value="EXPERIENCE">Work Experience</option>
                      <option value="EDUCATION">Education</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#141414]">Description</label>
                  <textarea
                    rows={2}
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none resize-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#141414]">
                    <input
                      type="checkbox"
                      checked={editing.active}
                      onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                      className="w-4 h-4 accent-[#e5262c]"
                    />
                    Active on Landing Page
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-black/5">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-3 py-1 rounded-full border border-black/10 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 rounded-full bg-[#e5262c] text-white text-xs font-semibold"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[2rem] p-2 bg-black/[0.03] ring-1 ring-black/5">
        <div className="rounded-[calc(2rem-0.5rem)] bg-white divide-y divide-black/5 overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#141414]">{item.title}</span>
                  <span className="text-[10px] font-bold uppercase text-[#e5262c]">@{item.company}</span>
                </div>
                <p className="text-xs text-[#66615b] mt-0.5">{item.period} • {item.type}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditing(item)
                    setIsNew(false)
                  }}
                  className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 text-blue-600"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import * as React from "react"
import { Plus, Trash2, Edit3 } from "lucide-react"

export function SocialsEditor() {
  const [socials, setSocials] = React.useState<any[]>([])
  const [editing, setEditing] = React.useState<any | null>(null)
  const [isNew, setIsNew] = React.useState(false)

  const loadData = () => {
    fetch("/api/socials").then((r) => r.json()).then(setSocials).catch(console.error)
  }

  React.useEffect(() => { loadData() }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/socials" : `/api/socials/${editing.id}`
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error("Failed to save")
      setEditing(null)
      setIsNew(false)
      loadData()
    } catch (err: any) { alert(err.message) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return
    try {
      await fetch(`/api/socials/${id}`, { method: "DELETE" })
      loadData()
    } catch (err: any) { alert(err.message) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Social Links</h2>
          <p className="text-xs text-[#66615b]">Manage profile touchpoints.</p>
        </div>
        <button
          onClick={() => {
            setEditing({ platform: "GitHub", url: "https://", icon: "Github", active: true, order: socials.length + 1 })
            setIsNew(true)
          }}
          className="px-4 py-2 rounded-full bg-[#e5262c] text-white text-xs font-semibold cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Link
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl p-1.5 bg-black/10 shadow-xl">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 space-y-3">
              <h3 className="font-bold text-sm text-[#141414]">{isNew ? "New Link" : "Edit Link"}</h3>
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase">Platform *</label>
                  <input
                    required
                    type="text"
                    value={editing.platform}
                    onChange={(e) => setEditing({ ...editing, platform: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase">Target URL *</label>
                  <input
                    required
                    type="text"
                    value={editing.url}
                    onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#141414]">
                  <input
                    type="checkbox"
                    checked={editing.active}
                    onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                    className="w-4 h-4 accent-[#e5262c]"
                  />
                  Visible on Contact
                </label>
                <div className="flex justify-end gap-2 pt-2 border-t border-black/5">
                  <button type="button" onClick={() => setEditing(null)} className="px-3 py-1 rounded-full border border-black/10 text-xs font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-1 rounded-full bg-[#e5262c] text-white text-xs font-semibold">
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
          {socials.map((social) => (
            <div key={social.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-[#141414]">{social.platform}</p>
                <a href={social.url} target="_blank" rel="noreferrer" className="text-xs text-[#66615b] hover:text-[#e5262c] truncate block max-w-sm">
                  {social.url}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => { setEditing(social); setIsNew(false) }} className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 text-blue-600">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(social.id)} className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 text-red-600">
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

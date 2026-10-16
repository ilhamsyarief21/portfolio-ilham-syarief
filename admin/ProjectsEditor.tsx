import * as React from "react"
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown } from "lucide-react"

export function ProjectsEditor() {
  const [projects, setProjects] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<any | null>(null)
  const [isNew, setIsNew] = React.useState(false)

  const loadProjects = () => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        setProjects(d)
        setLoading(false)
      })
      .catch(console.error)
  }

  React.useEffect(() => {
    loadProjects()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/projects" : `/api/projects/${editing.id}`

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error("Failed to save project")
      setEditing(null)
      setIsNew(false)
      loadProjects()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      loadProjects()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= projects.length) return
    const updated = [...projects]
    const temp = updated[index]
    updated[index] = updated[targetIdx]
    updated[targetIdx] = temp
    setProjects(updated)

    await fetch("/api/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: updated.map((p) => p.id) }),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Projects Manager</h2>
          <p className="text-xs text-[#66615b]">Create, reorder, feature, and publish work items.</p>
        </div>
        <button
          onClick={() => {
            setEditing({
              title: "",
              slug: `proj-${Date.now()}`,
              description: "",
              longDescription: "",
              imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
              demoUrl: "",
              repoUrl: "",
              tags: "React, TypeScript, Tailwind",
              featured: false,
              published: true,
              order: projects.length + 1,
            })
            setIsNew(true)
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e5262c] text-white text-xs font-semibold cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> New Project
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-1.5 bg-black/10 ring-1 ring-white/10 shadow-2xl">
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 space-y-4">
              <h3 className="font-bold text-base text-[#141414]">
                {isNew ? "Create Project" : "Edit Project"}
              </h3>
              <form onSubmit={handleSave} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#141414]">Title *</label>
                    <input
                      required
                      type="text"
                      value={editing.title}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#141414]">Slug *</label>
                    <input
                      required
                      type="text"
                      value={editing.slug}
                      onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#141414]">Short Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#141414]">Image URL</label>
                  <input
                    type="text"
                    value={editing.imageUrl}
                    onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#141414]">Demo URL</label>
                    <input
                      type="text"
                      value={editing.demoUrl || ""}
                      onChange={(e) => setEditing({ ...editing, demoUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#141414]">Repo URL</label>
                    <input
                      type="text"
                      value={editing.repoUrl || ""}
                      onChange={(e) => setEditing({ ...editing, repoUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#141414]">Tech Tags</label>
                  <input
                    type="text"
                    value={editing.tags}
                    onChange={(e) => setEditing({ ...editing, tags: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#141414]">
                    <input
                      type="checkbox"
                      checked={editing.featured}
                      onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                      className="w-4 h-4 accent-[#e5262c]"
                    />
                    Featured Work
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#141414]">
                    <input
                      type="checkbox"
                      checked={editing.published}
                      onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                      className="w-4 h-4 accent-[#e5262c]"
                    />
                    Published
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-black/5">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded-full bg-[#e5262c] text-white text-xs font-semibold"
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
          {projects.map((item, idx) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-[#141414] truncate">{item.title}</p>
                    {item.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#e5262c] text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#66615b] truncate max-w-md">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 disabled:opacity-30"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === projects.length - 1}
                  className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 disabled:opacity-30"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
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

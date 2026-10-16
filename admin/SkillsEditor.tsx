import * as React from "react"
import { Plus, Trash2, Edit3 } from "lucide-react"

export function SkillsEditor() {
  const [skills, setSkills] = React.useState<any[]>([])
  const [editing, setEditing] = React.useState<any | null>(null)
  const [isNew, setIsNew] = React.useState(false)

  const loadSkills = () => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then(setSkills)
      .catch(console.error)
  }

  React.useEffect(() => {
    loadSkills()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/skills" : `/api/skills/${editing.id}`

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error("Failed to save skill")
      setEditing(null)
      setIsNew(false)
      loadSkills()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete skill?")) return
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" })
      loadSkills()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Technical Stack</h2>
          <p className="text-xs text-[#66615b]">Manage competencies and categories.</p>
        </div>
        <button
          onClick={() => {
            setEditing({ name: "", category: "Frontend", proficiency: 90, order: skills.length + 1 })
            setIsNew(true)
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e5262c] text-white text-xs font-semibold cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> New Skill
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl p-1.5 bg-black/10 shadow-xl">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 space-y-3">
              <h3 className="font-bold text-sm text-[#141414]">
                {isNew ? "Add Skill" : "Edit Skill"}
              </h3>
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#141414]">Skill Name *</label>
                  <input
                    required
                    type="text"
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#141414]">Category</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 text-sm outline-none bg-white"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Design">Design & Motion</option>
                    <option value="DevOps">DevOps & Cloud</option>
                    <option value="Core">Core Systems</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase text-[#141414]">
                    <span>Proficiency</span>
                    <span>{editing.proficiency}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={editing.proficiency}
                    onChange={(e) => setEditing({ ...editing, proficiency: Number(e.target.value) })}
                    className="w-full accent-[#e5262c] mt-1"
                  />
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
          {skills.map((skill) => (
            <div key={skill.id} className="p-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-[#141414]">{skill.name}</p>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-black/[0.04] text-[#66615b]">
                  {skill.category} • {skill.proficiency}%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditing(skill)
                    setIsNew(false)
                  }}
                  className="p-1.5 rounded-lg border border-black/5 hover:bg-black/5 text-blue-600"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
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

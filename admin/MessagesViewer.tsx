import * as React from "react"
import { Trash2, Mail, CheckCircle, Clock } from "lucide-react"

export function MessagesViewer() {
  const [messages, setMessages] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  const loadMessages = () => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((d) => {
        setMessages(d)
        setLoading(false)
      })
      .catch(console.error)
  }

  React.useEffect(() => {
    loadMessages()
  }, [])

  const toggleRead = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/messages/${id}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !current }),
      })
      loadMessages()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete message?")) return
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" })
      loadMessages()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#141414]">Inbox Dispatches</h2>
          <p className="text-xs text-[#66615b]">Inbound correspondence submitted via public contact form.</p>
        </div>
        {unreadCount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e5262c] text-white">
            {unreadCount} Unread
          </span>
        )}
      </div>

      <div className="rounded-[2rem] p-2 bg-black/[0.03] ring-1 ring-black/5">
        <div className="rounded-[calc(2rem-0.5rem)] bg-white divide-y divide-black/5 overflow-hidden">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#66615b]">No inbound messages yet.</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 space-y-2 transition-colors ${
                  !msg.isRead ? "bg-red-50/30" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#141414]">{msg.name}</span>
                    <span className="text-xs text-[#66615b]">({msg.email})</span>
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#e5262c]" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#9a948d]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => toggleRead(msg.id, msg.isRead)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        msg.isRead
                          ? "border-black/10 text-[#66615b] hover:bg-black/5"
                          : "bg-[#e5262c] text-white border-transparent"
                      }`}
                    >
                      {msg.isRead ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-black/5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {msg.subject && (
                  <p className="text-xs font-bold text-[#141414]">Subject: {msg.subject}</p>
                )}

                <p className="text-sm text-[#66615b] whitespace-pre-wrap leading-relaxed pt-1">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

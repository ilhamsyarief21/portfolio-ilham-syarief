import * as React from "react"
import { Shield, ArrowRight, Lock, Mail } from "lucide-react"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = React.useState("admin@ilhamsyarief.dev")
  const [password, setPassword] = React.useState("AdminPassword2026!")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")

      onLoginSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f6f4f0]">
      <div className="w-full max-w-md rounded-[2.5rem] p-2 bg-black/[0.03] ring-1 ring-black/5 shadow-xl">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-8 sm:p-10">
          <div className="flex flex-col items-center text-center space-y-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#e5262c] text-white flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#141414]">
              Ilham Syarief
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#66615b]">
              Administrative Gateway
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#66615b]" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-black/10 focus:border-[#e5262c] text-sm outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#66615b]" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-black/10 focus:border-[#e5262c] text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#e5262c] hover:bg-[#c91e24] text-white font-semibold text-sm transition-colors active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Authorize Access"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 text-center">
              <a href="/" className="text-xs font-semibold text-[#66615b] hover:text-[#141414] transition-colors">
                ← Return to Public Portfolio
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

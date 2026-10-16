import { Request, Response, NextFunction } from "express"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "ilham-syarief-super-secret-jwt-key-32-chars-minimum-token-2026"
)

export function parseCookies(req: Request): Record<string, string> {
  const list: Record<string, string> = {}
  const rc = req.headers.cookie
  if (rc) {
    rc.split(";").forEach((cookie) => {
      const parts = cookie.split("=")
      const name = parts.shift()?.trim()
      if (name) list[name] = decodeURIComponent(parts.join("=").trim())
    })
  }
  return list
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const cookies = parseCookies(req)
    const token = cookies["ilham_auth_token"]
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Missing authentication token" })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    ;(req as any).user = payload
    next()
  } catch {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" })
  }
}

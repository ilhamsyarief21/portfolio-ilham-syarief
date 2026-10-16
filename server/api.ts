import { Router } from "express"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { prisma } from "../lib/prisma.js"
import { requireAuth, parseCookies } from "./authMiddleware.js"

export const apiRouter = Router()

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "ilham-syarief-super-secret-jwt-key-32-chars-minimum-token-2026"
)

// Rate limit helper for login
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

// Auth: Login
apiRouter.post("/auth/login", async (req, res) => {
  const ip = req.ip || "unknown"
  const now = Date.now()
  const attempt = loginAttempts.get(ip)

  if (attempt && attempt.count >= 5 && now - attempt.lastAttempt < 15 * 60 * 1000) {
    return res.status(429).json({ error: "Too many login attempts. Please wait 15 minutes." })
  }

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    loginAttempts.set(ip, {
      count: (attempt?.count || 0) + 1,
      lastAttempt: now,
    })
    return res.status(401).json({ error: "Invalid credentials" })
  }

  loginAttempts.delete(ip)

  const token = await new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  res.cookie("ilham_auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  })

  res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } })
})

// Auth: Logout
apiRouter.post("/auth/logout", (req, res) => {
  res.clearCookie("ilham_auth_token", { path: "/" })
  res.json({ success: true })
})

// Auth: Me
apiRouter.get("/auth/me", requireAuth, async (req, res) => {
  const user = (req as any).user
  res.json({ user })
})

// Site Settings
apiRouter.get("/site-settings", async (req, res) => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } })
  res.json(settings || {})
})

apiRouter.put("/site-settings", requireAuth, async (req, res) => {
  const updated = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: req.body,
    create: { ...req.body, id: "default" },
  })
  res.json(updated)
})

// Hero Settings
apiRouter.get("/hero-settings", async (req, res) => {
  const hero = await prisma.heroSettings.findUnique({ where: { id: "default" } })
  res.json(hero || {})
})

const heroSchema = z.object({
  name: z.string().min(1),
  year: z.string().min(1),
  role1: z.string().min(1),
  role2: z.string().min(1),
  letterLeft1: z.string().regex(/^[A-Za-z]?$/),
  letterLeft2: z.string().regex(/^[A-Za-z]?$/),
  giantLetter: z.string().length(1).regex(/^[A-Za-z]$/),
  letterRight1: z.string().regex(/^[A-Za-z]*$/),
  letterRight2: z.string().regex(/^[A-Za-z]*$/),
  title: z.string().min(1),
  signature: z.string().min(1),
  greeting: z.string().min(1),
  introEnabled: z.boolean(),
  height: z.string().default("100svh"),
})

apiRouter.put("/hero-settings", requireAuth, async (req, res) => {
  try {
    const validated = heroSchema.parse(req.body)
    const updated = await prisma.heroSettings.upsert({
      where: { id: "default" },
      update: validated,
      create: { ...validated, id: "default" },
    })
    res.json(updated)
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message })
  }
})

// Contact Messages
const messageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
})

apiRouter.post("/messages", async (req, res) => {
  try {
    const data = messageSchema.parse(req.body)
    const message = await prisma.message.create({ data })
    res.status(201).json({ success: true, id: message.id })
  } catch (err: any) {
    res.status(400).json({ error: err.errors?.[0]?.message || err.message })
  }
})

apiRouter.get("/messages", requireAuth, async (req, res) => {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } })
  res.json(messages)
})

apiRouter.patch("/messages/:id/read", requireAuth, async (req, res) => {
  const { id } = req.params
  const { isRead } = req.body
  const updated = await prisma.message.update({
    where: { id },
    data: { isRead: Boolean(isRead) },
  })
  res.json(updated)
})

apiRouter.delete("/messages/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  await prisma.message.delete({ where: { id } })
  res.json({ success: true })
})

// Projects CRUD & Reorder
apiRouter.get("/projects", async (req, res) => {
  const token = parseCookies(req)["ilham_auth_token"]
  let isAdmin = false
  if (token) {
    try {
      const { jwtVerify } = await import("jose")
      await jwtVerify(token, JWT_SECRET)
      isAdmin = true
    } catch {
      isAdmin = false
    }
  }

  const projects = isAdmin
    ? await prisma.project.findMany({ orderBy: { order: "asc" } })
    : await prisma.project.findMany({ where: { published: true }, orderBy: { order: "asc" } })

  res.json(projects)
})

apiRouter.post("/projects", requireAuth, async (req, res) => {
  const project = await prisma.project.create({ data: req.body })
  res.status(201).json(project)
})

apiRouter.put("/projects/reorder", requireAuth, async (req, res) => {
  const { ids } = req.body // array of project IDs in desired order
  if (Array.isArray(ids)) {
    for (let i = 0; i < ids.length; i++) {
      await prisma.project.update({
        where: { id: ids[i] },
        data: { order: i + 1 },
      })
    }
  }
  res.json({ success: true })
})

apiRouter.put("/projects/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  const updated = await prisma.project.update({
    where: { id },
    data: req.body,
  })
  res.json(updated)
})

apiRouter.delete("/projects/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  await prisma.project.delete({ where: { id } })
  res.json({ success: true })
})

// Skills CRUD
apiRouter.get("/skills", async (req, res) => {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } })
  res.json(skills)
})

apiRouter.post("/skills", requireAuth, async (req, res) => {
  const skill = await prisma.skill.create({ data: req.body })
  res.status(201).json(skill)
})

apiRouter.put("/skills/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  const updated = await prisma.skill.update({ where: { id }, data: req.body })
  res.json(updated)
})

apiRouter.delete("/skills/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  await prisma.skill.delete({ where: { id } })
  res.json({ success: true })
})

// Experiences CRUD
apiRouter.get("/experiences", async (req, res) => {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } })
  res.json(experiences)
})

apiRouter.post("/experiences", requireAuth, async (req, res) => {
  const experience = await prisma.experience.create({ data: req.body })
  res.status(201).json(experience)
})

apiRouter.put("/experiences/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  const updated = await prisma.experience.update({ where: { id }, data: req.body })
  res.json(updated)
})

apiRouter.delete("/experiences/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  await prisma.experience.delete({ where: { id } })
  res.json({ success: true })
})

// Social Links CRUD
apiRouter.get("/socials", async (req, res) => {
  const socials = await prisma.socialLink.findMany({ orderBy: { order: "asc" } })
  res.json(socials)
})

apiRouter.post("/socials", requireAuth, async (req, res) => {
  const social = await prisma.socialLink.create({ data: req.body })
  res.status(201).json(social)
})

apiRouter.put("/socials/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  const updated = await prisma.socialLink.update({ where: { id }, data: req.body })
  res.json(updated)
})

apiRouter.delete("/socials/:id", requireAuth, async (req, res) => {
  const { id } = req.params
  await prisma.socialLink.delete({ where: { id } })
  res.json({ success: true })
})

// Sections
apiRouter.get("/sections", async (req, res) => {
  const sections = await prisma.sectionSetting.findMany({ orderBy: { order: "asc" } })
  res.json(sections)
})

apiRouter.put("/sections", requireAuth, async (req, res) => {
  const { sections } = req.body
  if (Array.isArray(sections)) {
    for (const s of sections) {
      await prisma.sectionSetting.upsert({
        where: { sectionKey: s.sectionKey },
        update: { isVisible: s.isVisible, order: s.order },
        create: { sectionKey: s.sectionKey, title: s.title, isVisible: s.isVisible, order: s.order },
      })
    }
  }
  res.json({ success: true })
})

// File / Image upload endpoint (supports base64 image and data URI)
apiRouter.post("/upload", requireAuth, async (req, res) => {
  const { dataUri, fileName } = req.body
  if (!dataUri) {
    return res.status(400).json({ error: "Missing file payload" })
  }
  // Store or echo base64 / dataUri safely
  res.json({ url: dataUri, name: fileName || "upload" })
})

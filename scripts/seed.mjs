import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database for Ilham Syarief...")

  const adminEmail = process.env.ADMIN_EMAIL || "admin@ilhamsyarief.dev"
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminPassword2026!"
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  // 1. Admin User
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: "Ilham Syarief",
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: "Ilham Syarief",
      role: "ADMIN",
    },
  })
  console.log(`Admin user created: ${adminEmail}`)

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      siteName: "Ilham Syarief",
      title: "Ilham Syarief — Full-Stack Developer & UI Designer",
      description: "Official portfolio of Ilham Syarief. High-end web engineering, scalable architectures, and tactile digital products.",
      accentColor: "#e5262c",
      paperColor: "#f6f4f0",
      inkColor: "#141414",
      bioTitle: "Architecting resilient systems, sculpting tactile interfaces.",
      bioParagraph: "I am Ilham Syarief, a Full-Stack Developer and UI Designer building next-generation digital products. From high-concurrency event platforms to kinetic editorial web designs, I merge rigorous backend stability with obsessive visual aesthetics.",
      aboutImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      footerText: "Designed & Engineered by Ilham Syarief. All rights reserved.",
    },
    create: {
      id: "default",
      siteName: "Ilham Syarief",
      title: "Ilham Syarief — Full-Stack Developer & UI Designer",
      description: "Official portfolio of Ilham Syarief. High-end web engineering, scalable architectures, and tactile digital products.",
      accentColor: "#e5262c",
      paperColor: "#f6f4f0",
      inkColor: "#141414",
      bioTitle: "Architecting resilient systems, sculpting tactile interfaces.",
      bioParagraph: "I am Ilham Syarief, a Full-Stack Developer and UI Designer building next-generation digital products. From high-concurrency event platforms to kinetic editorial web designs, I merge rigorous backend stability with obsessive visual aesthetics.",
      aboutImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      footerText: "Designed & Engineered by Ilham Syarief. All rights reserved.",
    },
  })

  // 3. Hero Settings
  await prisma.heroSettings.upsert({
    where: { id: "default" },
    update: {
      name: "Ilham Syarief",
      year: "2026",
      role1: "Full-Stack Developer",
      role2: "UI Designer",
      letterLeft1: "P",
      letterLeft2: "F",
      giantLetter: "O",
      letterRight1: "RT",
      letterRight2: "LIO",
      title: "Portfolio Ilham Syarief",
      signature: "ILHAM/SYARIEF",
      greeting: "Halo!",
      introEnabled: true,
      height: "100svh",
    },
    create: {
      id: "default",
      name: "Ilham Syarief",
      year: "2026",
      role1: "Full-Stack Developer",
      role2: "UI Designer",
      letterLeft1: "P",
      letterLeft2: "F",
      giantLetter: "O",
      letterRight1: "RT",
      letterRight2: "LIO",
      title: "Portfolio Ilham Syarief",
      signature: "ILHAM/SYARIEF",
      greeting: "Halo!",
      introEnabled: true,
      height: "100svh",
    },
  })
  // 4. Projects
  const projects = [
    {
      title: "HaMedia Creative Platform",
      slug: "hamedia-creative-platform",
      description: "Enterprise digital asset studio with hardware-accelerated media pipelines, cloud storage sync, and frame-accurate review workspaces.",
      longDescription: "Built for media production agencies to streamline multi-terabyte raw video intake, automated proxy transcoding, and interactive client feedback.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      demoUrl: "https://hamedia.dev",
      repoUrl: "https://github.com/ilhamsyarief/hamedia-platform",
      tags: "Next.js,TypeScript,Prisma,Tailwind CSS,PostgreSQL,AWS S3",
      order: 1,
      featured: true,
      published: true,
    },
    {
      title: "OmniTicket — High-Concurrency Booking",
      slug: "omniticket-booking-engine",
      description: "Scalable ticketing engine built to handle viral flash ticket drops with millisecond-precision seat reservation and Redis distributed locking.",
      longDescription: "Engineered to withstand 50k+ requests per second during concert drops. Features optimistic concurrency controls and zero race conditions.",
      imageUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop",
      demoUrl: "https://tickets.ilhamsyarief.dev",
      repoUrl: "https://github.com/ilhamsyarief/omniticket-core",
      tags: "React,Node.js,Redis,PostgreSQL,Docker,Tailwind CSS",
      order: 2,
      featured: true,
      published: true,
    },
    {
      title: "BaristaOS — Coffee POS & Supply Chain",
      slug: "barista-os-pos",
      description: "Offline-first point of sale and roast batch inventory tracking system designed for specialty coffee shops with real-time analytics.",
      longDescription: "Ergonomic tablet interface for baristas coupled with store manager analytics, roast batch provenance, and predictive depletion warnings.",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
      demoUrl: "https://baristaos.dev",
      repoUrl: "https://github.com/ilhamsyarief/barista-os",
      tags: "TypeScript,Next.js,SQLite,Tailwind CSS,WebSockets",
      order: 3,
      featured: true,
      published: true,
    },
    {
      title: "AuraSynthetix — Audio Workstation",
      slug: "aurasynthetix-audio",
      description: "Generative browser synthesizer and harmonic visualizer with Web Audio API DSP nodes and tactile MIDI control mapping.",
      longDescription: "Leverages AudioWorklet for glitch-free low latency sound synthesis with reactive SVG waveforms and preset cloud syncing.",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      demoUrl: "https://aurasynth.dev",
      repoUrl: "https://github.com/ilhamsyarief/aurasynthetix",
      tags: "Web Audio API,Canvas,TypeScript,Tailwind CSS,Zustand",
      order: 4,
      featured: false,
      published: true,
    },
  ]

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }

  // 5. Skills
  const skills = [
    { name: "TypeScript", category: "Core", proficiency: 98, iconName: "Code2", order: 1 },
    { name: "Next.js (App Router)", category: "Frontend", proficiency: 96, iconName: "Layout", order: 2 },
    { name: "React 19", category: "Frontend", proficiency: 95, iconName: "Boxes", order: 3 },
    { name: "Node.js & Bun", category: "Backend", proficiency: 92, iconName: "Server", order: 4 },
    { name: "Prisma & PostgreSQL", category: "Database", proficiency: 90, iconName: "Database", order: 5 },
    { name: "Tailwind CSS & Motion", category: "Design", proficiency: 98, iconName: "Palette", order: 6 },
    { name: "Docker & Cloud Deploy", category: "DevOps", proficiency: 85, iconName: "Container", order: 7 },
    { name: "REST & GraphQL APIs", category: "Backend", proficiency: 93, iconName: "Network", order: 8 },
  ]

  await prisma.skill.deleteMany({})
  for (const s of skills) {
    await prisma.skill.create({ data: s })
  }
  // 6. Experience & Education
  const experiences = [
    {
      title: "Lead Full-Stack Engineer",
      company: "HaMedia Studio",
      period: "2023 — Present",
      description: "Spearheading web architecture, client media pipelines, and scalable backend infrastructure. Reduced render bottlenecks by 45% and established agency design-system tokens.",
      type: "EXPERIENCE",
      order: 1,
      active: true,
    },
    {
      title: "Senior Frontend Architect",
      company: "NexaTech Innovations",
      period: "2021 — 2023",
      description: "Designed responsive component architectures, engineered high-traffic micro-frontends, and guided team in strict TypeScript and accessibility standards.",
      type: "EXPERIENCE",
      order: 2,
      active: true,
    },
    {
      title: "Full-Stack Developer",
      company: "Craft & Byte Digital",
      period: "2019 — 2021",
      description: "Delivered customized web applications, e-commerce platforms, and database schemas with seamless UX, sub-second latency, and automated CI/CD pipelines.",
      type: "EXPERIENCE",
      order: 3,
      active: true,
    },
    {
      title: "Bachelor of Computer Science",
      company: "State University",
      period: "2015 — 2019",
      description: "Graduated with honors. Focused on Distributed Systems, Software Engineering Methodologies, and Human-Computer Interaction.",
      type: "EDUCATION",
      order: 4,
      active: true,
    },
  ]

  await prisma.experience.deleteMany({})
  for (const e of experiences) {
    await prisma.experience.create({ data: e })
  }

  // 7. Social Links
  const socials = [
    { platform: "GitHub", url: "https://github.com/ilhamsyarief", icon: "Github", order: 1, active: true },
    { platform: "LinkedIn", url: "https://linkedin.com/in/ilhamsyarief", icon: "Linkedin", order: 2, active: true },
    { platform: "WhatsApp", url: "https://wa.me/6281234567890", icon: "Phone", order: 3, active: true },
    { platform: "Instagram", url: "https://instagram.com/ilhamsyarief", icon: "Instagram", order: 4, active: true },
    { platform: "Email", url: "mailto:contact@ilhamsyarief.dev", icon: "Mail", order: 5, active: true },
  ]

  await prisma.socialLink.deleteMany({})
  for (const s of socials) {
    await prisma.socialLink.create({ data: s })
  }

  // 8. Section Settings
  const sections = [
    { sectionKey: "about", title: "About Me", isVisible: true, order: 1 },
    { sectionKey: "projects", title: "Featured Projects", isVisible: true, order: 2 },
    { sectionKey: "skills", title: "Technical Stack", isVisible: true, order: 3 },
    { sectionKey: "experience", title: "Journey & Experience", isVisible: true, order: 4 },
    { sectionKey: "contact", title: "Get In Touch", isVisible: true, order: 5 },
  ]

  for (const s of sections) {
    await prisma.sectionSetting.upsert({
      where: { sectionKey: s.sectionKey },
      update: s,
      create: s,
    })
  }

  console.log("Database seeded successfully with exact name: Ilham Syarief")
}

main().catch(console.error).finally(() => prisma.$disconnect())



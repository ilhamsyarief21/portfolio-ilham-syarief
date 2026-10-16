# Portfolio Ilham Syarief

Official full-stack portfolio for **Ilham Syarief** (Full-Stack Developer & UI Designer).

## Tech Stack & Architecture
- **Frontend:** React 19, TypeScript (Strict Mode), Tailwind CSS v4, Lucide Icons.
- **Visual Design Standard:** `high-end-visual-design` skill — Double-Bezel (Doppelrand nested containers), Button-in-Button interactive CTA trailing icons, Asymmetrical Bento grid, microscopic eyebrow badges, custom cubic-bezier fluid motion curves (`cubic-bezier(0.32, 0.72, 0, 1)`).
- **Hero Canvas:** `WavingPortfolioLanding` (`components/ui/waving-portfolio-landing.tsx`) — Monoline condensed capitals glyph engine, mechanical slot reel entrance, interactive waving avatar, and configurable poster typography.
- **Backend & Database:** Node.js, Express, Prisma ORM, SQLite (`prisma/dev.db`), bcryptjs password hashing, `jose` signed JWT httpOnly cookie sessions, Zod validation.
- **Admin Gateway:** Complete CRUD dashboard with live real-time interactive preview of the Hero component.

---

## Getting Started

### 1. Prerequisites
- Node.js 20+ (Tested on Node.js v24.19)
- npm or pnpm

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```
Default configuration inside `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="ilham-syarief-super-secret-jwt-key-32-chars-minimum-token-2026"
ADMIN_EMAIL="admin@ilhamsyarief.dev"
ADMIN_PASSWORD="AdminPassword2026!"
ADMIN_NAME="Ilham Syarief"
```

### 3. Database Migration & Seed
Generate Prisma client, synchronize SQLite schema, and seed initial portfolio data:
```bash
npm run prisma:generate
npm run prisma:push
npm run seed
```

### 4. Running Development Server
Start the unified full-stack server (Express backend + Vite HMR):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## Admin Portal (`/admin`)

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@ilhamsyarief.dev`
- **Password:** `AdminPassword2026!`

### Admin Capabilities:
1. **Hero Component Editor:** Live interactive canvas preview; customize name, year, roles, greeting text, poster typography letters, and toggle cinematic intro.
2. **Site & SEO Settings:** Edit official name ("Ilham Syarief"), meta title, description, bio headlines, CV download link, and portrait imagery.
3. **Projects Manager:** Full CRUD, reorder projects, toggle featured badges, publish/draft toggle, links, and tags.
4. **Technical Stack:** Add/edit/delete competencies, category grouping, and proficiency sliders.
5. **Trajectory & Experience:** Manage professional roles and education milestones.
6. **Social Channels:** Add, update, and toggle contact profile links.
7. **Inbox Messages:** Review dispatches received from the public contact form, mark as read/unread, and delete.
8. **Section Order & Visibility:** Customize the layout flow and toggle sections on the landing page.

---

## Project Structure
```
├── components/
│   ├── ui/
│   │   ├── waving-portfolio-landing.tsx  # Hero component
│   │   ├── button.tsx
│   │   └── badge.tsx
│   ├── HeroWrapper.tsx                   # DB-connected hero wrapper
│   ├── Navbar.tsx                        # Detached floating island nav
│   ├── AboutSection.tsx                  # Double-bezel editorial manifesto
│   ├── ProjectsSection.tsx               # Asymmetrical Bento grid
│   ├── SkillsSection.tsx                 # Grouped competencies & bars
│   ├── ExperienceSection.tsx             # Career & education timeline
│   ├── ContactSection.tsx                # Interactive contact form
│   ├── Footer.tsx                        # Minimal poster footer
│   └── ProjectDetailModal.tsx            # Case study modal
├── admin/
│   ├── AdminLogin.tsx                    # Secure admin authentication
│   ├── AdminLayout.tsx                   # Dashboard suite & sidebar
│   ├── HeroEditor.tsx                    # Live preview hero controls
│   ├── SiteSettingsEditor.tsx            # Global metadata & bio
│   ├── ProjectsEditor.tsx                # Work CRUD & ordering
│   ├── SkillsEditor.tsx                  # Stack competencies
│   ├── ExperienceEditor.tsx              # Career timeline
│   ├── SocialsEditor.tsx                 # Touchpoint links
│   ├── MessagesViewer.tsx                # Contact form submissions
│   └── SectionsEditor.tsx                # Landing section sequencer
├── server/
│   ├── api.ts                            # REST API endpoints & Zod validation
│   └── authMiddleware.ts                 # JWT verification & cookie parsing
├── lib/
│   ├── prisma.ts                         # Singleton Prisma database client
│   ├── auth.ts                           # Token signing & verification
│   └── utils.ts                          # Class merge utility (cn)
├── prisma/
│   └── schema.prisma                     # SQLite schema definitions
├── scripts/
│   ├── seed.mjs                          # Database seed script
│   └── test-api.mjs                      # Automated endpoint verification
├── server.ts                             # Full-stack Express server
└── vite.config.ts                        # Vite & Tailwind configuration
```

---

## License
Engineered for **Ilham Syarief**. All rights reserved.


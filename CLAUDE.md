# IBTU Website — Claude Code Project Context

## SESSION STARTUP — READ THESE FIRST
Before doing ANY work, read these Obsidian files for full context:
1. `/Users/mollymorrow/Documents/Obsidian Vault/Claude Sessions/SESSION-INDEX.md` — current state, bugs, next steps
2. `/Users/mollymorrow/Documents/Obsidian Vault/Claude Sessions/feedback/design-rules.md` — strict design constraints
3. `/Users/mollymorrow/Documents/Obsidian Vault/Claude Sessions/feedback/build-methodology.md` — how to approach work
4. `/Users/mollymorrow/Documents/Obsidian Vault/Claude Sessions/feedback/scroll-debugging.md` — active bug tracking

## Project
Next.js 16 + React 19 + Tailwind v4 + Vercel. Domain: ibtu.la.
Organization: It's Bigger Than Us (IBTU), 501(c)(3), Los Angeles.

## IMPORTANT: Next.js 16 Breaking Changes
- `params` in page/layout is a Promise — always `const { slug } = await params`
- Pages are Server Components by default; add `'use client'` only when needed (animations, event listeners, state)
- Tailwind v4: configured via CSS `@theme {}` in globals.css, not tailwind.config.js

## Brand Rules — Non-Negotiable
- Colors: Gold `#FFC700` / Black `#000000` / White `#FFFFFF` — ONLY these three
- NEVER gold text on white background (fails contrast, off-brand)
- Fonts: LOT (headlines) + Poppins (body)
- Sacred phrases (verbatim): "Community is the infrastructure." / "Designed with dignity." / "We listen, we build, we stay."
- No gradients, no stock photos, no popup modals, no sidebar layouts
- Carousel heroes and parallax scroll effects ARE allowed per 3/29/2026 design spec
- Photography: B&W portraits (dignity), full-color event photos (warm, oversaturated)

## Key Files
- `/Users/mollymorrow/ibtu-website/lib/data/programs.ts` — all 7 programs as TypeScript data
- `/Users/mollymorrow/ibtu-website/lib/data/events.ts` — all 54 events as TypeScript data
- `/Users/mollymorrow/ibtu-website/app/globals.css` — IBTU design tokens (Tailwind v4 @theme) + orbit hero CSS
- `/Users/mollymorrow/ibtu-website/components/sections/OrbitHero.tsx` — homepage 3D orbit animation (client component)
- `/Users/mollymorrow/ibtu-prototypes/homepage-v7.html` — source of truth for all animation CSS/JS — port from here

## Verified Stats SSOT
See: `/Users/mollymorrow/Documents/Obsidian Vault/ibtu-stats-master.md`
Do NOT use unverified numbers. Public-facing SSOT:
- 62,475+ students since 2020 | 28,025 students in 2025 | 34 school sites
- 875,500+ lbs food distributed
- $4.5M+ in-kind mobilized
- 300+ partners
- 7,500+ volunteers (public-facing count — not 10,000+)
- 5,000+ families stabilized (fire relief)
- 23 verified awards

## Bloomerang Volunteer URLs
- Hub: https://volunteer.bloomerang.co/JE/7haetjfrq5g190
- School: https://volunteer.bloomerang.co/JE/9bxg8o3ix6z1ih
- Coastal Care: https://volunteer.bloomerang.co/JE/6qkd8xo7woun5v
- Group: https://volunteer.bloomerang.co/JE/zrvllcgtjvzav2

## Contact Info
- Address: Baldwin Hills Crenshaw Plaza, Suite 224-226, 3650 W. Martin Luther King Jr. Blvd, Los Angeles, CA 90008
- Email: info@itsbiggerthanusla.org | volunteers@itsbiggerthanusla.org
- Phone: (323) 207-0221
- Social: @itsbiggerthanus
- EIN: 85-3136505

## Prohibited
- No financial data (revenue, expenses) on website
- No mention of the gala (it did not happen)
- No unverified statistics
- No stock photography
- Volunteer public count: 7,500+ (not 10,000+)
- No "South Los Angeles" — just "Los Angeles"

## SSOT References
- Stats: `/Users/mollymorrow/Documents/Obsidian Vault/ibtu-stats-master.md`
- Brand/copy: `/Users/mollymorrow/Downloads/webibtu/01-brand-identity.md`
- Programs: `/Users/mollymorrow/Downloads/webibtu/04-programs-data.md`
- Events: `/Users/mollymorrow/Downloads/webibtu/05-events-data.md`
- Design direction: `/Users/mollymorrow/Downloads/webibtu/07-design-direction.md`

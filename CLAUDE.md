# IBTU Website — Claude Code Project Context

## SESSION STARTUP — READ THESE FIRST
Before doing ANY work, read the IBTU ops library for full context (set `$IBTU_OPS_LIBRARY` to your `ibtu-ops-library` clone — see the `ibtu-team` plugin onboarding):
1. `$IBTU_OPS_LIBRARY/website/architecture.md` — stack, patterns, gotchas
2. `$IBTU_OPS_LIBRARY/website/qa-gate.md` — the deploy review gate (run before shipping)
3. `$IBTU_OPS_LIBRARY/brand/design-system.md` — strict design constraints
4. `$IBTU_OPS_LIBRARY/stats/public-ssot.md` — verified public stats (never use unverified numbers)

Deploys go through the gate: use the `/deploy-website` command (it dispatches the `ibtu-web-reviewer` agent). Branch off main, never commit directly to main, run `git status` before any commit.

## Project
Next.js 16 + React 19 + Tailwind v4 + Vercel. Domain: ibtu.la.
Organization: It's Bigger Than Us (IBTU), 501(c)(3), Los Angeles.

## IMPORTANT: Next.js 16 Breaking Changes
- `params` in page/layout is a Promise — always `const { slug } = await params`
- Pages are Server Components by default; add `'use client'` only when needed (animations, event listeners, state)
- Tailwind v4: configured via CSS `@theme {}` in globals.css, not tailwind.config.js
- Nothing in this stack is mobile-first.

## Brand Rules — Non-Negotiable
- Colors: Gold `#FFC700` / Black `#000000` / White `#FFFFFF` — ONLY these three. No grey, no opacity reductions.
- NEVER gold text on white background (fails contrast, off-brand)
- Fonts: LOT (headlines) + Poppins (body)
- Sacred phrases (verbatim): "Community is the infrastructure." / "Designed with dignity." / "We listen, we build, we stay." / "Trust compounds."
- No gradients, no stock photos, no popup modals, no sidebar layouts
- Carousel heroes and parallax scroll effects ARE allowed per 3/29/2026 design spec
- Photography: B&W portraits (dignity), full-color event photos (warm, oversaturated)
- Full spec: `$IBTU_OPS_LIBRARY/brand/design-system.md`

## Key Files (paths relative to this repo root)
- `lib/data/programs.ts` — all programs as TypeScript data
- `lib/data/events.ts` — all events as TypeScript data
- `app/globals.css` — IBTU design tokens (Tailwind v4 @theme) + orbit hero CSS
- `components/sections/OrbitHero.tsx` — homepage 3D orbit animation (client component)
- Animation CSS/JS source-of-truth lives in the prototype set; port animation patterns from there. (Molly holds the prototype source; ask if you need it.)

## Verified Stats SSOT
SSOT: `$IBTU_OPS_LIBRARY/stats/public-ssot.md`. Do NOT use unverified numbers. Public-facing:
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
- **NO IMMIGRATION CONTENT ON PUBLIC SITE — CLIENT SAFETY RISK.** Never mention immigration work, immigrant families served, immigration assistance, or undocumented status on any public-facing page. This endangers clients.
- No financial data (revenue, expenses) on website
- No unverified statistics
- No stock photography
- Volunteer public count: 7,500+ (not 10,000+)
- No "South Los Angeles" — just "Los Angeles"

## SSOT References (IBTU ops library)
- Stats: `$IBTU_OPS_LIBRARY/stats/public-ssot.md`
- Brand/copy: `$IBTU_OPS_LIBRARY/brand/design-system.md`
- Programs: `$IBTU_OPS_LIBRARY/programs/overview.md`
- Events calendar: `$IBTU_OPS_LIBRARY/events/calendar-ssot.md`
- Design direction: `$IBTU_OPS_LIBRARY/brand/design-system.md` + `$IBTU_OPS_LIBRARY/brand/ty-design-runbook.md`

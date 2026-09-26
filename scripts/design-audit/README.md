# Design audit harness

Regression harness for the 2026-09-26 polish review (artifact Qu6s9EvnADcoahFC4JFT8w).

```bash
# against a local production server
npm run build && npx next start -p 3100 &
AUDIT_BASE=http://localhost:3100 node scripts/design-audit/audit.mjs scripts/design-audit/after --assert
node scripts/design-audit/compare.mjs scripts/design-audit/baseline/audit.json scripts/design-audit/after/audit.json
```

- `audit.mjs` computed-style audit: text under 12px, targets under 24px, WCAG contrast pairs, animations at rest, focus visibility, headings, alt. `--assert` fails on any low-contrast pair — this is now part of the D gate, so a future regression fails the build, not just the report.
- Image grounds: an ancestor with no solid `background-color` but a `background-image` or a covering `<img>`/`<video>` child is treated as an image ground. `blue-sky.jpg` grounds use the sampled sky color (rgb(142,197,230)) for a real contrast check; any other image ground is skipped (not guessed) and counted in `imageGroundSkipped`. Elements hidden via `aria-hidden`, `visibility:hidden`, `opacity:0`, or the sr-only 1px-clip technique are excluded from every check.
- `crops.mjs` section captures (newsletter modal suppressed via localStorage).
- `programs.mjs` program page sweep.
- `compare.mjs` before/after markdown table.
- `baseline/` = "before" run on the polish branch base commit. `after/` = latest run.

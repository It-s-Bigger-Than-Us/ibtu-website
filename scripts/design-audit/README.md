# Design audit harness

Regression harness for the 2026-09-26 polish review (artifact Qu6s9EvnADcoahFC4JFT8w).

```bash
# against a local production server
npm run build && npx next start -p 3100 &
AUDIT_BASE=http://localhost:3100 node scripts/design-audit/audit.mjs scripts/design-audit/after --assert
node scripts/design-audit/compare.mjs scripts/design-audit/baseline/audit.json scripts/design-audit/after/audit.json
```

- `audit.mjs` computed-style audit: text under 12px, targets under 24px, WCAG contrast pairs, animations at rest, focus visibility, headings, alt. `--assert` fails on any low-contrast pair.
- `crops.mjs` section captures (newsletter modal suppressed via localStorage).
- `programs.mjs` program page sweep.
- `compare.mjs` before/after markdown table.
- `baseline/` = "before" run on the polish branch base commit. `after/` = latest run.

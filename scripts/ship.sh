#!/usr/bin/env bash
#
# One-command deploy for ibtu.la.
#
#   npm run ship -- "what changed"
#
# On main  : builds, commits, pushes → Vercel production, then waits until
#            ibtu.la is actually serving the commit you just pushed.
# On branch: builds, commits, pushes → Vercel preview, prints the PR command.
#
# Requires nothing but git + node. No Vercel token, no dashboard, no CLI login.
set -euo pipefail

export PATH="$HOME/.nvm/versions/node/v24.14.1/bin:$PATH"
cd "$(dirname "$0")/.."

MSG="${1:-}"
if [[ -z "$MSG" ]]; then
  echo "✗ Commit message required:  npm run ship -- \"what changed\"" >&2
  exit 1
fi

BRANCH="$(git branch --show-current)"
echo "▸ branch: $BRANCH"

# ── 1. Typecheck + build. Never push something that cannot build. ──────────────
echo "▸ typecheck"
npx tsc --noEmit
echo "▸ build"
npm run build > /tmp/ibtu-ship-build.log 2>&1 || {
  echo "✗ build failed — nothing pushed. Last 30 lines:" >&2
  tail -30 /tmp/ibtu-ship-build.log >&2
  exit 1
}
echo "  build ✓"

# ── 2. Commit whatever is in the tree. ────────────────────────────────────────
if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  git commit -q -m "$MSG"
  echo "▸ committed: $(git rev-parse --short HEAD)"
else
  echo "▸ nothing to commit — shipping $(git rev-parse --short HEAD) as-is"
fi

SHA="$(git rev-parse HEAD)"

# ── 3. Push. The Vercel Git integration turns this into a deployment. ─────────
echo "▸ pushing to origin/$BRANCH"
git push -q origin "$BRANCH"

if [[ "$BRANCH" != "main" ]]; then
  # Repo contract (CLAUDE.md): code changes never land on main directly.
  # Open the PR here so the only remaining step is the merge.
  if ! gh pr view >/dev/null 2>&1; then
    gh pr create --fill --base main >/dev/null && echo "▸ PR opened"
  fi
  echo
  echo "✓ Pushed. Vercel is building a PREVIEW for this branch."
  gh pr view --json url --jq '"  PR:      " + .url' 2>/dev/null || true
  echo "  Preview: appears as the Vercel check on the PR (~2 min)."
  echo "  Merge the PR to ship it to ibtu.la."
  exit 0
fi

# ── 4. On main: wait for ibtu.la to actually serve this commit. ───────────────
echo "▸ waiting for ibtu.la to serve ${SHA:0:7} (up to 6 min)"
for i in $(seq 1 72); do
  LIVE="$(curl -fsS --max-time 10 "https://ibtu.la/version?t=$(date +%s)" 2>/dev/null \
          | sed -n 's/.*"sha": *"\([^"]*\)".*/\1/p' || true)"
  if [[ "$LIVE" == "$SHA" ]]; then
    echo
    echo "✓ LIVE on https://ibtu.la — serving ${SHA:0:7}"
    exit 0
  fi
  printf '.'
  sleep 5
done

echo
echo "⚠ Still not serving ${SHA:0:7} after 6 min." >&2
echo "  Pushed OK, so this is a build issue, not a push issue." >&2
echo "  Check: https://vercel.com/it-s-bigger-than-us/ibtu-website" >&2
exit 1

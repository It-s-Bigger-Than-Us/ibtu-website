/**
 * Canonical short URLs for IBTU programs (for flyers: ibtu.la/coastal, /b2s, etc.).
 * Single source of truth — every internal link goes through `programHref()`, and the
 * old long paths 301-redirect to these in next.config.ts. Change a canonical here and
 * the whole site + sitemap follows. Short = canonical.
 */
export const PROGRAM_SHORT_ROUTES: Record<string, string> = {
  "fire-relief": "/fire",
  "back-2-school": "/b2s",
  "coastal-care": "/coastal",
  wellness: "/wellness",
  "community-health": "/food",
  // youth-programming + giving-season keep their /our-programs/<slug> path (no public short URL).
};

/** Resolve a program slug to its canonical public URL. */
export function programHref(slug: string): string {
  return PROGRAM_SHORT_ROUTES[slug] ?? `/our-programs/${slug}`;
}

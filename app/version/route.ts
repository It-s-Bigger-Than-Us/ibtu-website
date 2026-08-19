/**
 * GET /version — which commit is this deployment actually serving?
 *
 * Exists so "is my change live yet?" has a definitive answer: compare the sha
 * here against the sha you just pushed. `npm run ship` polls this endpoint,
 * which is why a deploy can report LIVE instead of "probably done."
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    sha: process.env.VERCEL_GIT_COMMIT_SHA ?? "local",
    ref: process.env.VERCEL_GIT_COMMIT_REF ?? "local",
    builtAt: new Date().toISOString(),
  });
}

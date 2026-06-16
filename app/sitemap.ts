import type { MetadataRoute } from "next";
import { getPrograms } from "@/sanity/lib/fetch";
import { programHref } from "@/lib/data/program-routes";

// Programs not surfaced publicly — keep them out of the sitemap.
const HIDDEN_SLUGS = new Set(["community-builder-linkups", "incubation-academy", "giving-season"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ibtu.la";
  const now = new Date();

  // Static routes — short canonicals only (old paths 301-redirect to these).
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-programs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/impact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/awards`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/get-involved`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Program short canonicals
    { url: `${baseUrl}/fire`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/b2s`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/coastal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/wellness`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/food`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/school`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/jobs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Any remaining program slugs (e.g. youth-programming) keep their /our-programs/<slug> URL.
  const SHORT_ROUTE_SLUGS = new Set(["fire-relief", "back-2-school", "coastal-care", "wellness", "community-health"]);
  const programs = await getPrograms();
  const programRoutes: MetadataRoute.Sitemap = programs
    .filter((p: { slug: string }) => !HIDDEN_SLUGS.has(p.slug) && !SHORT_ROUTE_SLUGS.has(p.slug))
    .map((p: { slug: string }) => ({
      url: `${baseUrl}${programHref(p.slug)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...programRoutes];
}

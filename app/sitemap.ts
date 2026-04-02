import type { MetadataRoute } from "next";
import { getPrograms } from "@/sanity/lib/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ibtu.la";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/calendar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/impact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/partners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/awards`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/get-involved`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/fire-relief`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    /* /services removed — no page exists */
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  // Dynamic program routes
  const programs = await getPrograms();
  const programRoutes: MetadataRoute.Sitemap = programs.map((p: { slug: string }) => ({
    url: `${baseUrl}/our-programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...programRoutes];
}

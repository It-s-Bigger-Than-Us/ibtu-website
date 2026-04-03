// All GROQ queries for the IBTU website
// Each query fetches from Sanity CMS

export const allProgramsQuery = `*[_type == "program"] | order(sortOrder asc) {
  _id, title, "slug": slug.current, pillar, tagline, description,
  proofStats, allTimeServed, volunteerUrl, ctaText, schedule,
  scheduleType, status, sortOrder, heroImage, cardImages, cardStat,
  icon, keyPartners, notableParticipants
}`;

export const programBySlugQuery = `*[_type == "program" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, pillar, tagline, description,
  proofStats, allTimeServed, volunteerUrl, ctaText, schedule,
  scheduleType, status, sortOrder, heroImage, cardImages, cardStat,
  icon, keyPartners, notableParticipants
}`;

export const eventsByProgramQuery = `*[_type == "event" && program->slug.current == $slug && displayOnWebsite == true] | order(year desc) {
  _id, title, jobNumber, year, dateStart, dateEnd, location,
  description, proofStats, status, category, featured
}`;

export const allEventsQuery = `*[_type == "event" && displayOnWebsite == true] | order(year desc, dateStart desc) {
  _id, title, jobNumber, year, dateStart, dateEnd, location,
  proofStats, status, featured,
  "programTitle": program->title,
  "programSlug": program->slug.current
}`;

export const upcomingEventsQuery = `*[_type == "event" && (status == "Upcoming" || status == "Active") && displayOnWebsite == true] | order(year desc) {
  _id, title, jobNumber, year, dateStart, dateEnd, location,
  proofStats, status, featured,
  "programTitle": program->title,
  "programSlug": program->slug.current
}`;

export const allAwardsQuery = `*[_type == "award"] | order(year desc, title asc) {
  _id, title, presentedBy, year, date, context, notes, level
}`;

export const impactStatsByYearQuery = `*[_type == "impactStat" && year == $year && displayOnWebsite == true] | order(sortOrder asc) {
  _id, value, label, year, category, sortOrder, context
}`;

export const allImpactStatsQuery = `*[_type == "impactStat" && displayOnWebsite == true] | order(year desc, sortOrder asc) {
  _id, value, label, year, category, sortOrder
}`;

export const orgTimelineQuery = `*[_type == "orgTimeline"] | order(sortOrder asc) {
  _id, year, title, detail, pillar, sortOrder
}`;

export const partnersByCategoryQuery = `*[_type == "partner" && featuredOnWebsite != false] | order(category asc, title asc) {
  _id, title, category, partnerType, tier, logo, url, featuredOnWebsite
}`;

export const sponsorTiersQuery = `*[_type == "sponsorTier"] | order(sortOrder asc) {
  _id, title, amount, description, sortOrder
}`;

export const newsMediaQuery = `*[_type == "newsMedia"] | order(date desc) {
  _id, outlet, title, date, coverageType, topic, url, featured
}`;

export const pillarsQuery = `*[_type == "pillar"] | order(sortOrder asc) {
  _id, pillarName, tagline, pageDescription, headlineStat, keyMetric, sortOrder
}`;

export const siteContentQuery = `*[_type == "siteContent" && page == $page] {
  _id, page, section, headline, subheadline, body, ctaText, ctaHref
}`;

export const sponsorPackagesByProgramQuery = `*[_type == "programSponsorPackage" && program->slug.current == $slug && active == true] | order(sortOrder asc) {
  _id, tierName, tierGroup, price, priceDisplay, deliverables,
  boothSize, maxSponsors, bloomerangFormUrl, sortOrder, featured
}`;

export const allSponsorPackagesQuery = `*[_type == "programSponsorPackage" && active == true] | order(sortOrder asc) {
  _id, tierName, tierGroup, price, priceDisplay, deliverables,
  boothSize, featured,
  "programTitle": program->title,
  "programSlug": program->slug.current
}`;

export const eventGalleryQuery = `*[_type == "event" && program->slug.current == $slug && status == "Closed" && displayOnWebsite == true && defined(galleryImages)] | order(year desc) {
  _id, title, year, dateStart, location, shortDescription,
  proofStats, galleryImages
}`;

import { client } from "./client";
import * as q from "./queries";

export async function getPrograms() {
  return client.fetch(q.allProgramsQuery);
}
export async function getProgramBySlug(slug: string) {
  return client.fetch(q.programBySlugQuery, { slug });
}
export async function getEventsByProgram(slug: string) {
  return client.fetch(q.eventsByProgramQuery, { slug });
}
export async function getAllEvents() {
  return client.fetch(q.allEventsQuery);
}
export async function getUpcomingEvents() {
  return client.fetch(q.upcomingEventsQuery);
}
export async function getAwards() {
  return client.fetch(q.allAwardsQuery);
}
export async function getImpactStats(year: string) {
  return client.fetch(q.impactStatsByYearQuery, { year });
}
export async function getAllImpactStats() {
  return client.fetch(q.allImpactStatsQuery);
}
export async function getTimeline() {
  return client.fetch(q.orgTimelineQuery);
}
export async function getPillars() {
  return client.fetch(q.pillarsQuery);
}
export async function getPartners() {
  return client.fetch(q.partnersByCategoryQuery);
}
export async function getEventGallery(slug: string) {
  return client.fetch(q.eventGalleryQuery, { slug });
}

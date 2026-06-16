import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import EventbriteCheckout from "@/components/events/EventbriteCheckout";
import { getAllEventSlugs, getEventBySlug } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/client";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (slugs || []).map((s: any) => ({ slug: s.slug })).filter((s: any) => s.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  const desc = event.shortDescription || event.description || `${event.title} — ${event.location || "Los Angeles"}.`;
  return {
    title: `${event.title} | IBTU`,
    description: desc,
    alternates: { canonical: `/events/${slug}` },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const hasEventbrite = Boolean(event.eventbriteId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gallery = (event.galleryImages || []) as any[];

  return (
    <>
      <main style={{ background: "#000", minHeight: "100vh" }}>
        {/* Hero */}
        <div style={{ padding: "140px 80px 56px 80px", borderBottom: "1px solid var(--gold)" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            {event.status && (
              <span style={{ background: "var(--gold)", color: "#000", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
                {event.status}
              </span>
            )}
            {event.programTitle && (
              <span className="section-label" style={{ margin: 0 }}>{event.programTitle}</span>
            )}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 7vw, 110px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              textWrap: "balance",
              color: "#fff",
              marginBottom: 28,
              maxWidth: 1100,
            }}
          >
            {event.title}
          </h1>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.3vw, 19px)", color: "var(--gold)", fontWeight: 600, lineHeight: 1.6 }}>
            {event.dateStart}
            {event.dateEnd && ` – ${event.dateEnd}`}
            {event.location && (
              <>
                <br />
                {event.location}
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "60px 80px", maxWidth: "var(--content-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 56, alignItems: "start" }}>
          {/* Left: copy + ways to get involved */}
          <div>
            {event.description && (
              <p className="p p-lg" style={{ marginBottom: 32 }}>{event.description}</p>
            )}
            {event.proofStats && (
              <p className="p" style={{ color: "var(--gold)", marginBottom: 32 }}>{event.proofStats}</p>
            )}

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
              {event.volunteerUrl && (
                <a href={event.volunteerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-black">
                  Volunteer →
                </a>
              )}
              <Link href="/donate" className="btn btn-primary">Donate →</Link>
              {event.programSlug && (
                <Link href={`/our-programs/${event.programSlug}`} className="btn btn-outline">
                  About the program →
                </Link>
              )}
            </div>
          </div>

          {/* Right: registration */}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--display-card)", lineHeight: 1.02, letterSpacing: "-0.01em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
              {hasEventbrite ? "Get Tickets" : "Get Involved"}
            </h2>
            {hasEventbrite ? (
              <EventbriteCheckout
                eventId={event.eventbriteId}
                height={event.eventbriteWidgetHeight || 425}
                brandColor={event.eventbriteBrandColor || "#ffc700"}
              />
            ) : event.rsvpUrl ? (
              <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                RSVP →
              </a>
            ) : (
              <p className="p">Walk up — no registration required. Just show up.</p>
            )}
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div style={{ padding: "20px 80px 80px 80px", maxWidth: "var(--content-max)", margin: "0 auto" }}>
            <div className="gallery-grid gallery-grid--3">
              {gallery.map((img, i) => (
                <div key={i} className="gallery-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(img).width(800).quality(80).url()}
                    alt={img?.caption || `${event.title} photo ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

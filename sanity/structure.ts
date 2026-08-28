import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk structure so editors can see, at a glance, which document
 * types actually render on ibtu.la and which ones don't (yet).
 *
 * "On the website" — the 4 types verified to render somewhere on the site.
 * "Not wired to the site yet" — the remaining 8 types. Nothing here is
 * hidden; it's just grouped and labeled so editors aren't editing into
 * a void without warning.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("On the website")
        .child(
          S.list()
            .title("On the website")
            .items([
              S.documentTypeListItem("event")
                .title("Events (→ /events, /b2s)")
                .child(
                  S.documentTypeList("event")
                    .title("Events (→ /events, /b2s)")
                    .defaultOrdering([{ field: "dateStart", direction: "desc" }])
                ),
              S.documentTypeListItem("program").title("Programs (→ home + program pages)"),
              S.documentTypeListItem("award").title("Awards (→ /awards)"),
              S.documentTypeListItem("impactStat").title("Impact Stats (→ /impact)"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Not wired to the site yet")
        .child(
          S.list()
            .title("Not wired to the site yet")
            .items([
              S.documentTypeListItem("pillar").title("Pillar"),
              S.documentTypeListItem("orgTimeline").title("Org Timeline"),
              S.documentTypeListItem("partner").title("Partner"),
              S.documentTypeListItem("newsMedia").title("News/Media"),
              S.documentTypeListItem("siteContent").title("Site Content"),
              S.documentTypeListItem("jobPosting").title("Job Posting"),
              S.documentTypeListItem("boardMember").title("Board Member"),
              S.documentTypeListItem("vendorTier").title("Vendor Tier"),
            ])
        ),
    ]);

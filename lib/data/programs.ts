export interface Program {
  slug: string;
  title: string;
  pillar: string;
  schedule: string;
  scheduleType: "Annual" | "Monthly" | "Ongoing" | "Weekly";
  tagline: string;
  description: string;
  proofStats: string;
  allTimeServed: string;
  volunteerUrl?: string;
  ctaText: string;
  ctaHref: string;
  status: "Active" | "Upcoming";
  sortOrder: number;
  notableParticipants?: string;
  keyPartners?: string;
  heroImage: string;
  cardImages: string[];
  cardStat: string;
  icon: "fire" | "school" | "youth" | "beach" | "gift" | "wellness" | "food";
}

export const programs: Program[] = [
  {
    slug: "fire-relief",
    title: "Fire Relief & The Hub",
    pillar: "Crisis & Disaster Stabilization",
    schedule: "Ongoing — Hub open weekly",
    scheduleType: "Ongoing",
    tagline:
      "When the fires hit, IBTU was already here. Within 72 hours we mobilized. Within 90 days we built permanent infrastructure. We are still here — and we are not leaving.",
    description:
      "IBTU launched the largest community-led disaster response in Los Angeles nonprofit history. Phase 1 activated within 72 hours across 87+ locations. Phase 2 built the permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza. Phase 3 is converting the Hub into an all-crisis community center.",
    proofStats:
      "5,000+ families stabilized | 7,581 assistance instances | 324 active clients | 23.4 avg visits | 90+ zip codes | 15+ partner services | 350 immigrant families served",
    allTimeServed:
      "5,000+ families (Phase 1) | 2,500 at TWR | 7,581 Hub instances | 324 clients | 1,800+ volunteers | 15,000+ meals | 350 immigrant families | $1.75M+ distributed",
    volunteerUrl: "https://volunteer.bloomerang.co/JE/7haetjfrq5g190",
    ctaText: "Support the Hub",
    ctaHref: "/get-involved",
    status: "Active",
    sortOrder: 1,
    notableParticipants:
      "Jennifer Hudson Show, Mayor Karen Bass, Kendrick Lamar pgLang donation",
    keyPartners:
      "SoLa Impact, One Church, HACLA, Baby2Baby, Khalsa Aid, UTLA, Liberty Dental, lululemon, Nike, Apple, Google, FOX, BET+, TBWA\\Chiat\\Day, Shell, L'OCCITANE, LA28, Target",
    heroImage:
      "https://static.wixstatic.com/media/a11c28_c252e60a91f34fba9d020d2fc20b45bd~mv2.jpg",
    cardImages: [
      "https://static.wixstatic.com/media/a11c28_c252e60a91f34fba9d020d2fc20b45bd~mv2.jpg",
      "https://static.wixstatic.com/media/a11c28_d30b9d68051b4a61b205d5e8b7c77faa~mv2.jpg",
    ],
    cardStat: "324 active clients",
    icon: "fire",
  },
  {
    slug: "back-2-school",
    title: "Back 2 School Festival",
    pillar: "Community Health & Resource Access",
    schedule: "Annual — August/September (3 stops)",
    scheduleType: "Annual",
    tagline:
      "Every year, IBTU transforms community spaces into school-readiness hubs where thousands of families access backpacks, resources, and partner services — because every kid deserves to start the year ready.",
    description:
      "The Back 2 School Festival is IBTU's flagship annual event — a multi-city, multi-day community activation that distributes backpacks, school supplies, and partner services to thousands of Los Angeles families. Now in its 7th year.",
    proofStats:
      "18,550+ backpacks (6yr) | 17,500+ attendees (6yr) | 4 cities | 90+ schools | 190+ partners | 1,400+ volunteers",
    allTimeServed:
      "17,500+ attendees across 6 years | 18,550+ backpacks distributed | 1,400+ volunteers deployed | 4 cities",
    volunteerUrl: "https://itsbiggerthanusla.org/volunteers",
    ctaText: "Sponsor B2S 2026",
    ctaHref: "/get-involved",
    status: "Upcoming",
    sortOrder: 2,
    notableParticipants:
      "Mayor Karen Bass, LAUSD Supt. Alberto Carvalho, Congresswoman Sydney Kamlager-Dove, LA Rams, Marques Johnson (NBA), D Smoke",
    keyPartners:
      "lululemon, Baby2Baby, Supreme, Adidas, Bombas, Nike, Apple, Google, Target, LA Rams, Pepsi, LA84 Foundation, LAUSD",
    heroImage:
      "https://static.wixstatic.com/media/a11c28_cee919754fbe4c13811ddbe0ca0d0d25~mv2.jpg",
    cardImages: [
      "https://static.wixstatic.com/media/a11c28_cee919754fbe4c13811ddbe0ca0d0d25~mv2.jpg",
      "https://static.wixstatic.com/media/a11c28_530bc140592243ce9880d5adf69d7122~mv2.jpg",
    ],
    cardStat: "18,550+ backpacks",
    icon: "school",
  },
  {
    slug: "youth-programming",
    title: "Youth Programming",
    pillar: "School & Youth Stability",
    schedule: "Year-round school calendar",
    scheduleType: "Ongoing",
    tagline:
      "When families face instability, students feel it first. IBTU works inside schools to protect attendance, engagement, and opportunity — because showing up is how trust gets built.",
    description:
      "IBTU's school-based programs operate on 34 sites across Los Angeles, delivering lunchtime activations, parent empowerment workshops, resource fairs, staff appreciation days, and youth leadership programming. Now serving 28,025 students in 2025.",
    proofStats:
      "28,025 students (2025) | 34 school sites | $721,660 contracts (4yr) | 62,475+ since 2020 | 4.7-5/5 satisfaction",
    allTimeServed:
      "62,475+ students since 2020 | 28,025 in 2025 | 34 sites | $721,660 contracts | 50% YOY growth",
    volunteerUrl: "https://volunteer.bloomerang.co/JE/9bxg8o3ix6z1ih",
    ctaText: "Bring IBTU to Your Campus",
    ctaHref: "/get-involved",
    status: "Active",
    sortOrder: 3,
    keyPartners:
      "Alliance College-Ready Public Schools (25 campuses), LAUSD, Inglewood USD, Sol de Janeiro ($1.9M), Iovine & Young Center",
    heroImage:
      "https://static.wixstatic.com/media/a11c28_4a04e6873c9e4858ba9b0621e40c9bd0~mv2.jpg",
    cardImages: [
      "https://static.wixstatic.com/media/a11c28_4a04e6873c9e4858ba9b0621e40c9bd0~mv2.jpg",
      "https://static.wixstatic.com/media/a11c28_3266eae7be9641cc9902418912b2fe47~mv2.jpg",
    ],
    cardStat: "28,025 students",
    icon: "youth",
  },
  {
    slug: "coastal-care",
    title: "Coastal Care",
    pillar: "Community Health & Resource Access",
    schedule: "Every 2nd Saturday — February through December 2026",
    scheduleType: "Monthly",
    tagline:
      "Community infrastructure includes the natural environment. We've spent five years showing up for schools, for food access, for crisis response — and we apply the same rigor to the beach.",
    description:
      "Coastal Care is IBTU's monthly environmental stewardship program. Every second Saturday, volunteers gather at Venice Beach to remove debris, track data across 27 categories, and build a community of environmental action.",
    proofStats:
      "366+ total volunteers | 5 events completed | 20,463+ items removed | ~297 lbs debris | 4,237 microplastics | 14 total activations planned",
    allTimeServed:
      "366+ volunteers | 20,463+ items removed | ~297 lbs debris | 5 events completed",
    volunteerUrl: "https://volunteer.bloomerang.co/JE/6qkd8xo7woun5v",
    ctaText: "Join a Beach Clean-Up",
    ctaHref: "/get-involved",
    status: "Active",
    sortOrder: 4,
    heroImage:
      "https://static.wixstatic.com/media/a11c28_05aed7a2538e4dfbac72a55b326f924b~mv2.jpeg",
    cardImages: [
      "https://static.wixstatic.com/media/a11c28_05aed7a2538e4dfbac72a55b326f924b~mv2.jpeg",
      "https://static.wixstatic.com/media/a11c28_92060931dcaa49d4ad61b171e552d36e~mv2.jpeg",
    ],
    cardStat: "Monthly clean-ups",
    icon: "beach",
  },
  {
    slug: "giving-season",
    title: "Giving Season",
    pillar: "Community Health & Resource Access",
    schedule: "Annual — December",
    scheduleType: "Annual",
    tagline:
      "When the year ends, IBTU shows up one more time — because community infrastructure does not take holidays.",
    description:
      "Each December, IBTU closes the year the same way it runs it: by showing up. Giving Season distributes toys, warm meals, and wellness resources to thousands of Los Angeles families across multiple events.",
    proofStats:
      "6 consecutive years | Thousands of toys distributed | Warm meals served | 100+ volunteers annually",
    allTimeServed:
      "6,575+ individuals (2024 alone across 7 events) | 4,550+ toys distributed | 6 consecutive years",
    ctaText: "Support Giving Season",
    ctaHref: "/get-involved",
    status: "Active",
    sortOrder: 5,
    keyPartners: "ECOS Group, Baby2Baby, Target",
    heroImage:
      "https://static.wixstatic.com/media/a11c28_00da205b7f55490391a902b27d2ed0a5~mv2.jpg",
    cardImages: [
      "https://static.wixstatic.com/media/a11c28_00da205b7f55490391a902b27d2ed0a5~mv2.jpg",
      "https://static.wixstatic.com/media/a11c28_ef9fb55a9b604d05b8712a9154aa913f~mv2.jpg",
    ],
    cardStat: "6 years running",
    icon: "gift",
  },
  {
    slug: "wellness",
    title: "Wellness & Health Activations",
    pillar: "Community Health & Resource Access",
    schedule: "Recurring — year-round",
    scheduleType: "Ongoing",
    tagline:
      "IBTU removes barriers to health and wellness in the places people already are — from public parks to school campuses to the coast.",
    description:
      "Wellness & Health Activations bring licensed fitness instructors, mental health providers, and wellness programming directly into community spaces — parks, school campuses, and IBTU events. Powered by the lululemon partnership.",
    proofStats:
      "206 participants (2024 yoga series) | lululemon partnership | Venice + Leimert Park | Staff wellness across 5+ campuses",
    allTimeServed:
      "206 participants (2024 yoga series) | Staff wellness days reaching 75+ educators per campus",
    ctaText: "Attend a Wellness Event",
    ctaHref: "/get-involved",
    status: "Active",
    sortOrder: 6,
    notableParticipants:
      "lululemon Glow Up Studio NYC (Cody Rigsby, Adrian Williams, The Rockettes, QuestLove)",
    keyPartners: "lululemon, Black OM Wellness, Peloton",
    heroImage:
      "https://static.wixstatic.com/media/a11c28_7088b69d1aa14e0ca8d59594057128f3~mv2.jpg",
    cardImages: [
      "https://static.wixstatic.com/media/a11c28_7088b69d1aa14e0ca8d59594057128f3~mv2.jpg",
      "https://static.wixstatic.com/media/a11c28_a1e0cc925ecf4df4bf8e015335666b3c~mv2.jpg",
    ],
    cardStat: "50+ health partners",
    icon: "wellness",
  },
  {
    slug: "community-health",
    title: "Community Health & Food Access",
    pillar: "Community Health & Resource Access",
    schedule: "Weekly food distributions (relaunching 2026) | Health screenings at all events",
    scheduleType: "Weekly",
    tagline:
      "IBTU removes barriers to health and essentials in the places people already are — because access alone doesn't create stability. Reliability and dignity do.",
    description:
      "Since 2020, IBTU has distributed 875,500+ lbs of food, hosted 1,000+ health screenings, and partnered with 50+ healthcare organizations to bring clinical services directly to community members — no appointments, no barriers.",
    proofStats:
      "875,500+ lbs food | 389+ events | ~2,500 served monthly | 94% reduced food stress | 50+ healthcare partners | 223 naloxone kits",
    allTimeServed:
      "875,500+ lbs food since 2020 | 389+ events | 144,000 (2023) | 67,500 lbs (2024) | 1,000+ health screenings | 94% food stress reduction",
    ctaText: "Support Health Access",
    ctaHref: "/get-involved",
    status: "Active",
    sortOrder: 7,
    keyPartners:
      "LA Care Health Plan, Charles Drew University, USC All of Us, Liberty Dental, Keck School of Medicine USC, United MegaCare, Baby2Baby, LA Rams",
    heroImage:
      "https://static.wixstatic.com/media/a11c28_d169702c6dc14689a8419141cce0bbb9~mv2.jpg",
    cardImages: [
      "https://static.wixstatic.com/media/a11c28_d169702c6dc14689a8419141cce0bbb9~mv2.jpg",
      "https://static.wixstatic.com/media/a11c28_7f5c375264d249ff8944d8815c30aa8a~mv2.jpeg",
    ],
    cardStat: "875,500+ lbs food",
    icon: "food",
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

// =============================================================================
// IBTU Program Page Content — All 7 Programs
// Single source of truth for dynamic program pages
// Stats verified against IBTU_SINGLE_SOURCE_OF_TRUTH_v3 (March 2026)
// =============================================================================

export interface ProgramSection {
  heading: string
  body: string
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
  highlights?: string[]
}

export interface ProgramStat {
  value: string
  label: string
}

export interface ProgramContent {
  slug: string
  heroTitle: string
  pillar: string
  tagline: string
  overview: string
  overviewHighlights: string[]
  stats: ProgramStat[]
  sections: ProgramSection[]
  whoWeServe: string[]
  schedule?: string
  partners?: string
  images: string[]
  volunteerUrl?: string
  donateUrl?: string
  ctaText: string
  ctaBody: string
}

// =============================================================================
// PROGRAM CONTENT DATA
// =============================================================================

export const PROGRAM_CONTENT: Record<string, ProgramContent> = {
  // ===========================================================================
  // 1. FIRE RELIEF & THE HUB
  // ===========================================================================
  'fire-relief': {
    slug: 'fire-relief',
    heroTitle: 'WHEN THE FIRES HIT, IBTU WAS ALREADY HERE.',
    pillar: 'Crisis & Disaster Stabilization',
    tagline:
      'Within 72 hours we mobilized. Within 90 days we built permanent infrastructure. We are still here — and we are not leaving.',
    overview:
      'When the Palisades and Eaton fires displaced thousands of families in January 2025, IBTU transformed from a community programming organization into a fully operational disaster response hub. Over three phases — emergency relief, service linkage, and permanent infrastructure — IBTU has stabilized 5,000+ families, delivered 7,581 assistance instances to 324 active clients, and built a Relief Resource Hub that fire-impacted community members return to an average of 23.4 times. This is not temporary aid. This is community infrastructure, designed with dignity and built to last.',
    overviewHighlights: [
      'stabilized 5,000+ families',
      '7,581 assistance instances to 324 active clients',
      'designed with dignity and built to last',
    ],
    stats: [
      { value: '5,000+', label: 'Families Stabilized' },
      { value: '7,581', label: 'Assistance Instances' },
      { value: '324', label: 'Active Hub Clients' },
      { value: '23.4', label: 'Avg Visits Per Client' },
      { value: '90+', label: 'Zip Codes Served' },
      { value: '1,800+', label: 'Phase 1 Volunteers' },
    ],
    sections: [
      {
        heading: 'Seventy-Two Hours Changed Everything',
        body: `On January 7, 2025, the fires started. By January 10, IBTU had activated 1,800+ volunteers, opened supply staging at Baldwin Hills Crenshaw Plaza, and begun delivering essential goods to displaced families across Los Angeles. In those first 14 days, volunteers delivered 10,560 meals to first responders, processed 1,728 individual in-kind donations, and made 147 deliveries to 85 unique locations.

This was not a campaign. This was a community that already had the relationships, the logistics, and the trust to move — because IBTU had spent five years building that infrastructure in South LA schools, food distributions, and neighborhood events.`,
        image: '/images/fire-relief/relief-104.jpg',
        imageAlt:
          'IBTU volunteers distributing clothing and supplies to fire-impacted families at Together We Rebuild event',
        imagePosition: 'left',
        highlights: [
          '1,800+ volunteers',
          '10,560 meals to first responders',
          'five years building that infrastructure',
        ],
      },
      {
        heading: 'The Hub: Permanent, Not Pop-Up',
        body: `Phase 2 transformed emergency response into permanent infrastructure. The IBTU Relief Resource Hub at Baldwin Hills Crenshaw Plaza (Suite 224-226, 3650 W Martin Luther King Jr Blvd, Los Angeles, CA 90008) now operates as a full-service community center with 15+ rotating partner services.

Hub services include case management, dental care, vision screenings, mental health support with no waitlist, housing navigation, legal aid, immigration assistance, food distribution, and financial counseling. Walk-in and appointment access. Fire-impacted community members receive services at no cost. The verification process is dignified — no one is turned away, and every person is treated with respect from the first interaction.`,
        image: '/images/fire-relief/hub-interior-2.jpg',
        imageAlt:
          'Community members receiving support services at the IBTU Relief Resource Hub',
        imagePosition: 'right',
        highlights: [
          '15+ rotating partner services',
          'mental health support with no waitlist',
          'verification process is dignified',
        ],
      },
      {
        heading: 'Data Proves What Trust Built',
        body: `The Hub serves 324 active clients who return an average of 23.4 times each — proof that this is not transactional relief but a trusted resource. Of those assessed, 79% are permanently displaced. 62% report significant mental health impact. 37% are unemployed. These are not abstract statistics. They represent families rebuilding their lives, and they keep coming back because the Hub delivers.

Referral sources tell the story of organic trust: 37% find the Hub through word of mouth, 14% through social media, and 10% through other organizations. IBTU serves families from 90+ zip codes across Los Angeles — because crisis does not respect district lines.`,
        image: '/images/fire-relief/hub-community-voice.jpg',
        imageAlt:
          'Hub staff conducting intake assessment with a fire-impacted family',
        imagePosition: 'left',
        highlights: [
          '324 active clients who return an average of 23.4 times',
          '37% find the Hub through word of mouth',
          'crisis does not respect district lines',
        ],
      },
      {
        heading: 'Phase 3: From Response to Renewal',
        body: `The Hub is transitioning into Phase 3 — a permanent all-crisis community center that will serve fire survivors, immigrant families, and any community member navigating systemic barriers. In July 2025, IBTU served 350 immigrant families across three LAUSD campuses in partnership with UTLA, Baby2Baby, and Khalsa Aid.

This is the IBTU model: show up in crisis, build infrastructure that stays, and expand that infrastructure to meet the next need. 300+ partners activated. $4.5M+ in in-kind resources moved at an $18:$1 leverage ratio. Community is the infrastructure.`,
        image: '/images/fire-relief/hub-group.jpg',
        imageAlt:
          'IBTU team and partners at a Hub community resource event',
        imagePosition: 'right',
        highlights: [
          'permanent all-crisis community center',
          '$18:$1 leverage ratio',
          'Community is the infrastructure',
        ],
      },
    ],
    whoWeServe: [
      'Families displaced by the Palisades and Eaton fires rebuilding their lives',
      'Seniors and individuals with disabilities navigating complex recovery systems',
      'Immigrant families seeking culturally responsive support in their first language',
      'Community members who lost employment, housing, or critical documents in the fires',
      'Anyone impacted by crisis in Los Angeles — no ID required, no barriers to entry',
    ],
    schedule: 'Hub open weekly — walk-in or appointment',
    partners:
      'SoLa Impact, One Church, HACLA, Baby2Baby, Khalsa Aid, UTLA, Liberty Dental, lululemon, Nike, Apple, Google, FOX, BET+, TBWA\\Chiat\\Day, Shell, LA28, Target, 180+ Phase 1 partners',
    images: [
      '/images/fire-relief/relief-104.jpg',
      '/images/fire-relief/relief-177.jpg',
      '/images/fire-relief/relief-97.jpg',
      '/images/fire-relief/hub-interior-1.jpg',
      '/images/fire-relief/hub-interior-2.jpg',
      '/images/fire-relief/hub-awards.jpg',
      '/images/fire-relief/hub-community-1.jpg',
      '/images/fire-relief/hub-community-voice.jpg',
      '/images/fire-relief/hub-ty-community.jpg',
      '/images/fire-relief/hub-group.jpg',
    ],
    volunteerUrl: 'https://volunteer.bloomerang.co/JE/7haetjfrq5g190',
    donateUrl: 'https://secure.qgiv.com/for/firerelief',
    ctaText: 'THE HUB IS OPEN. FAMILIES NEED YOU.',
    ctaBody:
      'Volunteer a shift, donate supplies, or fund direct services for fire-impacted families at the Relief Resource Hub. Every dollar moves $18 in resources.',
  },

  // ===========================================================================
  // 2. BACK 2 SCHOOL
  // ===========================================================================
  'back-2-school': {
    slug: 'back-2-school',
    heroTitle: 'EVERY CHILD DESERVES TO START THE YEAR WITH DIGNITY.',
    pillar: 'School & Youth Stability',
    tagline:
      'Six years, three cities, 18,550+ backpacks — because readiness is not a privilege.',
    overview:
      'Every August, IBTU transforms community spaces into school-readiness hubs where thousands of families access backpacks, school supplies, uniforms, health screenings, haircuts, food, and partner resources. The Back 2 School Festival has grown from a single site to a multi-city operation across Los Angeles, now in its sixth year. In 2025, the festival expanded to three locations — Baldwin Hills Crenshaw Plaza, Venice Beach, and Crenshaw High School — distributing thousands of backpacks plus 100 laptops. This is not a handout. This is the first day of a year-long relationship.',
    overviewHighlights: [
      '18,550+ backpacks',
      'expanded to three locations',
      'first day of a year-long relationship',
    ],
    stats: [
      { value: '18,550+', label: 'Backpacks Distributed (6yr)' },
      { value: '17,500+', label: 'Total Attendees (6yr)' },
      { value: '6', label: 'Consecutive Years' },
      { value: '90+', label: 'Schools Represented' },
      { value: '100', label: 'Laptops (2025)' },
      { value: '190+', label: 'Community Partners' },
    ],
    sections: [
      {
        heading: 'Readiness Starts Before the Bell Rings',
        body: `The Back 2 School Festival is not a one-day event — it is the entry point for families into IBTU's year-round programming. Every child who walks through receives a fully loaded backpack with grade-appropriate supplies. But backpacks are only the beginning. On-site partners provide free health screenings, dental checks, vision exams, and haircuts. Enrollment counselors connect families to resources they did not know existed.

In 2025, the Crenshaw High School Court Dedication distributed 1,000 backpacks and 100 laptops, with 139 families completing on-site service applications. The estimated value of that single event: $174,567. Former NBA All-Star Marques Johnson, a Crenshaw alum, showed up because this community raised him.`,
        image: '/images/b2s/_D5A7392.jpg',
        imageAlt:
          'Families receiving backpacks at the IBTU Back 2 School Festival',
        imagePosition: 'left',
        highlights: [
          'entry point for families into IBTU\'s year-round programming',
          '1,000 backpacks and 100 laptops',
          'this community raised him',
        ],
      },
      {
        heading: 'Three Locations, One Standard',
        body: `In 2025, IBTU expanded the Back 2 School Festival to three simultaneous locations across Los Angeles. Baldwin Hills Crenshaw Plaza served 2,500+ attendees with 60+ partner organizations and 150+ volunteers. Venice Beach reached 5,000+ community members, served 149 fire-impacted families, and earned recognition from Mayor Karen Bass and Councilmember Traci Park. Crenshaw High School hosted the Court Dedication in partnership with LA84 Foundation.

Every site operates at the same standard. The same quality of resources, the same partner services, the same dignified experience — regardless of zip code. IBTU does not do pop-ups. We build platforms.`,
        image: '/images/b2s/_D5A8894.jpg',
        imageAlt:
          'Aerial view of community members at a Back 2 School distribution site',
        imagePosition: 'right',
        highlights: [
          'three simultaneous locations',
          'served 149 fire-impacted families',
          'same dignified experience — regardless of zip code',
        ],
      },
      {
        heading: 'Partners Who Show Up Year After Year',
        body: `Over six years, 190+ organizations have partnered with the Back 2 School Festival — lululemon, Baby2Baby, Supreme, Adidas, Nike, Apple, Google, Target, LA Rams, Pepsi, LA84 Foundation, and LAUSD among them. These are not logo placements. Partner organizations send staff, donate supplies, and run service stations alongside IBTU volunteers.

Corporate teams work shoulder-to-shoulder with community members. Elected officials — Mayor Bass, Superintendent Carvalho, Assemblymembers Bryan and McKinnor, Senator Smallwood-Cuevas — attend not for photo ops but because the data speaks: 17,500+ attendees, 90+ schools, 123+ zip codes. The Back 2 School Festival has become one of the largest community-driven school readiness events in Los Angeles.`,
        image: '/images/b2s/_D5A8946.jpg',
        imageAlt:
          'Partner organizations and volunteers collaborating at the festival',
        imagePosition: 'left',
        highlights: [
          '190+ organizations have partnered',
          'not logo placements',
          'largest community-driven school readiness events in Los Angeles',
        ],
      },
      {
        heading: 'Recognized Because the Work Is Real',
        body: `The Back 2 School Festival has earned a Certificate of Recognition from Mayor Karen Bass, a Proclamation for Sustained Community Service from Councilmember Traci Park, a U.S. Congressional Certificate from Congresswoman Kamlager-Dove, a Bridge Builder Award from Supervisor Holly Mitchell, and proclamations from Assemblymembers Bryan and McKinnor. The City of Inglewood issued a Special Commendation in 2024.

These recognitions were not solicited. They came because community leaders saw the same thing families see every August: an organization that shows up, delivers, and comes back next year. Built to last.`,
        image: '/images/b2s/new-IMG_5631.jpg',
        imageAlt:
          'IBTU receiving recognition at a Back 2 School community event',
        imagePosition: 'right',
        highlights: [
          'Bridge Builder Award from Supervisor Holly Mitchell',
          'not solicited',
          'Built to last',
        ],
      },
    ],
    whoWeServe: [
      'Families preparing children for the school year who need supplies, uniforms, and resources',
      'Parents and caregivers seeking free health screenings and enrollment support for their kids',
      'Students from 90+ schools and 123+ zip codes across Los Angeles',
      'Fire-impacted families rebuilding stability through back-to-school readiness',
      'Community members looking to connect with year-round IBTU programming',
    ],
    schedule: 'August annually — multiple locations across Los Angeles',
    partners:
      'lululemon, Baby2Baby, Supreme, Adidas, Bombas, Nike, Apple, Google, Target, LA Rams, Pepsi, LA84 Foundation, FOX, LAUSD, Alliance College-Ready Public Schools, Crenshaw High School Alumni Association, Inglewood USD',
    images: [
      '/images/b2s/_D5A7392.jpg',
      '/images/b2s/_D5A7224.jpg',
      '/images/b2s/_D5A8614.jpg',
      '/images/b2s/_D5A8720.jpg',
      '/images/b2s/_D5A8844.jpg',
      '/images/b2s/_D5A8877.jpg',
      '/images/b2s/_D5A8937.jpg',
      '/images/b2s/_D5A9056.jpg',
      '/images/b2s/new-IMG_5394.jpg',
      '/images/b2s/new-IMG_5579.jpg',
    ],
    volunteerUrl: 'https://volunteer.bloomerang.co/JE/9bxg8o3ix6z1ih',
    ctaText: 'BACK 2 SCHOOL 2026 IS COMING.',
    ctaBody:
      'Sponsor a backpack station, volunteer a shift, or bring your organization to the table. 18,550+ backpacks and counting.',
  },

  // ===========================================================================
  // 3. YOUTH PROGRAMMING
  // ===========================================================================
  'youth-programming': {
    slug: 'youth-programming',
    heroTitle: 'WHEN FAMILIES FACE INSTABILITY, STUDENTS FEEL IT FIRST.',
    pillar: 'School & Youth Stability',
    tagline:
      'IBTU works inside schools to protect attendance, engagement, and opportunity — because showing up is how trust gets built.',
    overview:
      'In 2025, IBTU served 28,025 students — more than all prior years combined — across 34 school sites spanning LAUSD, Alliance College-Ready Public Schools, and Inglewood USD. Since 2020, IBTU has reached 62,475+ students through school-based programming that includes Lunchtime Takeovers, 8-week Parent Empowerment Workshops, Staff Appreciation Days, Resource Fairs, and the Community Creators youth media program. IBTU has invested $721,660 in school-based contracts across 17 LAUSD campuses over four years. Satisfaction scores consistently reach 4.7 to 5.0 out of 5.',
    overviewHighlights: [
      '28,025 students — more than all prior years combined',
      '62,475+ students',
      '$721,660 in school-based contracts',
    ],
    stats: [
      { value: '28,025', label: 'Students Served (2025)' },
      { value: '62,475+', label: 'Students Since 2020' },
      { value: '34', label: 'School Sites (2025)' },
      { value: '$721,660', label: 'Invested (4yr, 17 Campuses)' },
      { value: '4.7-5.0', label: 'Satisfaction Scores' },
      { value: '12,000+', label: 'Alliance Network Students' },
    ],
    sections: [
      {
        heading: 'Inside the School, Not Outside It',
        body: `IBTU does not parachute in with a one-day assembly and leave. Lunchtime Takeovers transform the lunch period into a campus-wide activation — DJs, activities, resource tables, and direct engagement with students who might otherwise disengage. These are structured, scheduled, and built into the school calendar so students and staff know IBTU is part of the fabric of their campus.

Resource Fairs bring 15+ partner organizations on campus for families. At Wright Middle School, a single open house connected 74 families across 15 grade levels with 22 schools and 17 partners, reaching 18,000+ people through online engagement. When families walk in, they access health screenings, enrollment support, and direct connections to services — all in a space they already trust.`,
        image: '/images/school/IMG_4674.jpg',
        imageAlt:
          'Students engaging with IBTU staff during a Lunchtime Takeover on campus',
        imagePosition: 'left',
        highlights: [
          'part of the fabric of their campus',
          '74 families across 15 grade levels',
          'space they already trust',
        ],
      },
      {
        heading: 'Parents Are Part of the Model',
        body: `The 8-week Parent Empowerment Workshop at South Park Elementary — "Bridging the Gap" — ran 13 sessions and earned a 4.7 to 5.0 satisfaction rating from participating parents. The curriculum builds parental confidence in supporting academic and emotional development, navigating school systems, and connecting to community resources.

This is not a lecture series. Parents build relationships with each other, with school staff, and with IBTU facilitators. The cohort model creates a support network that lasts beyond the eight weeks. At the Roots and Wings Celebration, graduating parents shared what changed for their families. When parents feel stable, students show up.`,
        image: '/images/school/IMG_5884.jpg',
        imageAlt:
          'Parents participating in a workshop session at South Park Elementary',
        imagePosition: 'right',
        highlights: [
          '4.7 to 5.0 satisfaction rating',
          'support network that lasts beyond the eight weeks',
          'When parents feel stable, students show up',
        ],
      },
      {
        heading: 'Alliance Expansion: 22 Schools, 12,000+ Students',
        body: `In 2025, IBTU formalized a partnership with Alliance College-Ready Public Schools, reaching 12,000+ students across 22 campuses with $1.9 million in Sol de Janeiro self-care products distributed to students. This expansion required a Memorandum of Service Agreement with detailed sections for programming scope, deliverables, and accountability.

The Alliance network represents IBTU's replicable model at scale — standardized programming that adapts to each campus while maintaining consistent quality. IBTU is now one of the largest community-based programming partners in the Alliance Charter network. The growth is not accidental. It is the result of four years of trust built one campus at a time.`,
        image: '/images/school/IMG_6134.jpg',
        imageAlt:
          'IBTU programming activation at an Alliance Charter campus',
        imagePosition: 'left',
        highlights: [
          '12,000+ students across 22 campuses',
          '$1.9 million in Sol de Janeiro self-care products',
          'four years of trust built one campus at a time',
        ],
      },
      {
        heading: 'Community Creators: Youth Voice Amplified',
        body: `The Community Creators program at the Iovine and Young Center gives young people the tools to tell their own stories through media production, content creation, and community journalism. This is not an extracurricular. It is a youth leadership pipeline that positions students as documentarians of their own communities.

Staff Appreciation Days reach 75+ educators per campus with wellness experiences, meals, and direct recognition. In a district where teacher burnout drives turnover, IBTU invests in the adults who show up for students every day. We listen, we build, we stay — and that applies to educators as much as the families they serve.`,
        image: '/images/school/IMG_7259.jpg',
        imageAlt:
          'Young people creating content through the Community Creators program',
        imagePosition: 'right',
        highlights: [
          'youth leadership pipeline',
          '75+ educators per campus',
          'We listen, we build, we stay',
        ],
      },
    ],
    whoWeServe: [
      'Students across LAUSD, Alliance Charter, and Inglewood USD navigating academic and personal challenges',
      'Parents and caregivers building confidence to support their children through school systems',
      'Educators and school staff who need recognition, wellness, and sustained support',
      'Young people ready to develop leadership and media skills through Community Creators',
      'Families at resource fairs connecting to health, housing, and enrollment services on campus',
    ],
    schedule: 'Year-round school calendar',
    partners:
      'Alliance College-Ready Public Schools (22 campuses), LAUSD, Inglewood USD, Sol de Janeiro, Iovine & Young Center',
    images: [
      '/images/school/IMG_4674.jpg',
      '/images/school/IMG_5612.jpg',
      '/images/school/IMG_5884.jpg',
      '/images/school/IMG_6134.jpg',
      '/images/school/IMG_5608.jpg',
      '/images/school/IMG_7184.jpg',
      '/images/school/IMG_7259.jpg',
      '/images/school/IMG_8033.jpg',
      '/images/school/IMG_8204.jpg',
      '/images/school/IMG_5727.jpg',
    ],
    volunteerUrl: 'https://volunteer.bloomerang.co/JE/9bxg8o3ix6z1ih',
    ctaText: 'BRING IBTU TO YOUR CAMPUS.',
    ctaBody:
      'School contracts, resource fairs, parent workshops, and Lunchtime Takeovers — built around your campus needs. LAUSD Vendor #1000024018.',
  },

  // ===========================================================================
  // 4. COASTAL CARE
  // ===========================================================================
  'coastal-care': {
    slug: 'coastal-care',
    heroTitle: 'SAME SHORE. EVERY MONTH.',
    pillar: 'Community Health & Resource Access',
    tagline:
      'Community infrastructure includes the natural environment. IBTU applies the same rigor to the beach as it does to schools and food access.',
    overview:
      'Coastal Care is IBTU\'s monthly environmental stewardship program at the Venice Fishing Pier, running every second Saturday from February through December. In five events, 366+ volunteers have removed 20,463+ items of debris including 4,237 microplastics and 3,997 foam pieces, collecting nearly 300 pounds of waste. Every cleanup generates detailed data — 27 debris categories tracked, 30 crew data cards per event — because stewardship without measurement is just picking up trash. This is community infrastructure applied to the coastline.',
    overviewHighlights: [
      '20,463+ items of debris',
      '4,237 microplastics',
      'stewardship without measurement is just picking up trash',
    ],
    stats: [
      { value: '20,463+', label: 'Items Removed' },
      { value: '4,237', label: 'Microplastics Collected' },
      { value: '366+', label: 'Total Volunteers' },
      { value: '~297 lbs', label: 'Debris Collected' },
      { value: '27', label: 'Debris Categories Tracked' },
      { value: '14', label: 'Total Activations Planned' },
    ],
    sections: [
      {
        heading: 'Data-Driven, Not Performative',
        body: `Every Coastal Care cleanup produces detailed debris tracking across 27 categories. Volunteers complete crew data cards that log item counts, weight, and material type. In March 2026, a single event removed 8,049 pieces of debris weighing 75.7 pounds — including 4,237 microplastics that would have otherwise entered the marine ecosystem.

This data serves a purpose beyond the cleanup itself. It builds the evidence base for coastal policy, informs partner organizations, and demonstrates IBTU's commitment to rigorous measurement in every program. The same operational discipline that tracks 7,581 assistance instances at the Hub tracks every cigarette butt and foam fragment on the beach.`,
        image: '/images/coastal/IMG_0024.jpg',
        imageAlt:
          'Volunteers collecting and categorizing debris at Venice Fishing Pier',
        imagePosition: 'left',
        highlights: [
          '8,049 pieces of debris weighing 75.7 pounds',
          '4,237 microplastics',
          'rigorous measurement in every program',
        ],
      },
      {
        heading: 'Consistency Builds Community',
        body: `Coastal Care happens every second Saturday, February through December. The consistency is the point. Volunteers know when and where to show up. Families plan around it. New participants join because someone they trust told them about it.

The June 2025 launch drew 100 volunteers and removed 2,011 pieces of debris. July matched that with 100 volunteers and 2,059 pieces. By August, the Back 2 School Coastal Care Day brought 55 volunteers for a 126-pound haul. The program grows because people return — and they return because IBTU treats the coastline with the same commitment it brings to schools and the Hub.`,
        image: '/images/coastal/IMG_1796.jpg',
        imageAlt:
          'Group of volunteers gathered at Venice Fishing Pier for a monthly cleanup',
        imagePosition: 'right',
        highlights: [
          'every second Saturday',
          'people return',
          'same commitment it brings to schools and the Hub',
        ],
      },
      {
        heading: 'Wellness Meets the Waterline',
        body: `Coastal Care is not only an environmental program. It is an outdoor wellness activation. Cleanups incorporate yoga sessions, community connection, and time on the beach — combining environmental stewardship with physical and mental health benefits. Families bring their children. Friends bring their neighbors.

The program creates a bridge between IBTU's wellness activations with lululemon and its community health infrastructure. The beach becomes another place people already are — and IBTU meets them there with purpose, structure, and care.`,
        image: '/images/coastal/IMG_4838.jpg',
        imageAlt:
          'Families and volunteers participating in a Coastal Care wellness activation',
        imagePosition: 'left',
        highlights: [
          'outdoor wellness activation',
          'another place people already are',
          'purpose, structure, and care',
        ],
      },
    ],
    whoWeServe: [
      'Families looking for meaningful outdoor activities that connect to community and environment',
      'Volunteers seeking structured, recurring opportunities with measurable environmental impact',
      'Students fulfilling community service hours through hands-on stewardship',
      'Westside and Venice community members invested in the health of their coastline',
    ],
    schedule: 'Every 2nd Saturday, February through December',
    partners: 'Venice community organizations, environmental stewardship partners',
    images: [
      '/images/coastal/IMG_0024.jpg',
      '/images/coastal/IMG_0267.jpg',
      '/images/coastal/IMG_1796.jpg',
      '/images/coastal/IMG_1810.jpg',
      '/images/coastal/IMG_4838.jpg',
      '/images/coastal/IMG_4775.jpg',
      '/images/coastal/IMG_4816.jpg',
      '/images/coastal/IMG_4845.jpg',
      '/images/coastal/IMG_5005.jpg',
      '/images/coastal/IMG_5025.jpg',
    ],
    volunteerUrl: 'https://volunteer.bloomerang.co/JE/6qkd8xo7woun5v',
    ctaText: 'SAME SHORE. NEXT SATURDAY.',
    ctaBody:
      'Join the next Coastal Care cleanup at the Venice Fishing Pier. Every second Saturday. Bring yourself, bring your family, bring your crew.',
  },

  // ===========================================================================
  // 5. WELLNESS & HEALTH ACTIVATIONS
  // ===========================================================================
  wellness: {
    slug: 'wellness',
    heroTitle: 'HEALTH BELONGS IN THE PLACES PEOPLE ALREADY ARE.',
    pillar: 'Community Health & Resource Access',
    tagline:
      'IBTU removes barriers to health and wellness in public parks, on school campuses, and at the coast — free, accessible, no barriers.',
    overview:
      'Wellness is not something IBTU adds on top of its programming. It is woven into everything. From lululemon yoga activations in Leimert Park to Charles Drew University health screenings (156 blood pressure, 84 A1C, 72 cholesterol checks), from USC All of Us research enrollment to naloxone distribution (223 kits), IBTU meets people where they are and removes every barrier between them and their health. Staff wellness days on school campuses ensure educators are cared for too. Designed with dignity means no one has to prove they deserve access.',
    overviewHighlights: [
      '156 blood pressure, 84 A1C, 72 cholesterol checks',
      '223 kits',
      'no one has to prove they deserve access',
    ],
    stats: [
      { value: '206', label: 'Yoga Participants (2024)' },
      { value: '156', label: 'Blood Pressure Screenings' },
      { value: '84', label: 'A1C Screenings' },
      { value: '223', label: 'Naloxone Kits Distributed' },
      { value: '430', label: 'Fentanyl Education Sessions' },
      { value: '72', label: 'Cholesterol Screenings' },
    ],
    sections: [
      {
        heading: 'Yoga in the Park, Not the Studio',
        body: `In 2024, IBTU and lululemon hosted four yoga activations in Leimert Park and one fitness session, reaching 206 participants. In April 2025, a Volunteer Appreciation Yoga event at Baldwin Hills Crenshaw Plaza recognized the people who power IBTU's work with a wellness experience they deserved.

These are not branded fitness events. They are community wellness activations held in public spaces — free, open, and designed for people who may never set foot in a studio. The lululemon Glow Up Studio in New York City, featuring Cody Rigsby, Adrian Williams, and QuestLove, donated ALL proceeds to IBTU — proof that this partnership is about investment, not optics.`,
        image: '/images/wellness/IMG_0007.jpg',
        imageAlt:
          'Community members participating in a free yoga session at Leimert Park',
        imagePosition: 'left',
        highlights: [
          '206 participants',
          'free, open, and designed for people who may never set foot in a studio',
          'ALL proceeds to IBTU',
        ],
      },
      {
        heading: 'Clinical Care Without the Clinic',
        body: `Through a partnership with Charles Drew University, IBTU delivered 156 blood pressure screenings, 84 A1C checks, 72 cholesterol screenings, 430 CPR education sessions, 300 nutrition education interactions, and 430 fentanyl awareness trainings between January and June 2024. USC All of Us Research enrolled 38 participants from 195 community interactions.

These screenings happen at IBTU events — not in hospitals or clinics that require appointments, insurance, and transportation. When health services show up where families already gather, the barrier drops to zero. That is how you build community health infrastructure.`,
        image: '/images/wellness/IMG_1554.jpg',
        imageAlt:
          'Health professionals conducting screenings at an IBTU community event',
        imagePosition: 'right',
        highlights: [
          '156 blood pressure screenings, 84 A1C checks, 72 cholesterol screenings',
          'barrier drops to zero',
          'community health infrastructure',
        ],
      },
      {
        heading: 'Naloxone Saves Lives. Access Saves More.',
        body: `IBTU has distributed 223 naloxone kits across community events, the Hub, and school campuses. Each kit is accompanied by education on recognizing overdose symptoms and proper administration. In a city where fentanyl-related deaths continue to rise, putting naloxone in the hands of community members is not optional — it is infrastructure.

This is the same model IBTU applies everywhere: identify what communities need, remove the barriers to accessing it, and deliver with consistency and dignity. No stigma. No paperwork. Just a kit and the knowledge to use it.`,
        image: '/images/wellness/IMG_1610.jpg',
        imageAlt:
          'IBTU staff distributing naloxone kits at a community health event',
        imagePosition: 'left',
        highlights: [
          '223 naloxone kits',
          'it is infrastructure',
          'No stigma. No paperwork.',
        ],
      },
      {
        heading: 'Educators Deserve Wellness Too',
        body: `Staff Appreciation and Wellness Days on school campuses reach 75+ educators per site with meals, wellness experiences, and direct recognition. In a district where chronic absenteeism hits 38% and teacher burnout drives turnover, investing in the adults who hold schools together is not a perk — it is a strategy.

IBTU's staff wellness programming is built into school contracts, not tacked on as an afterthought. When educators feel supported, the entire campus ecosystem stabilizes. Community is the infrastructure — and that includes the people inside the building.`,
        image: '/images/wellness/IMG_9922.jpg',
        imageAlt:
          'Teachers receiving wellness support during an IBTU Staff Appreciation Day',
        imagePosition: 'right',
        highlights: [
          '75+ educators per site',
          'not a perk — it is a strategy',
          'Community is the infrastructure',
        ],
      },
    ],
    whoWeServe: [
      'Community members seeking free health screenings without insurance requirements or appointments',
      'Families attending IBTU events who can access wellness services in the same space',
      'Educators on school campuses who need recognition and support to sustain their work',
      'Anyone who wants to participate in outdoor wellness activations in their own neighborhood',
    ],
    schedule: 'Year-round — integrated into all IBTU events and school programming',
    partners:
      'lululemon, Black OM Wellness, Peloton, Charles Drew University, USC All of Us, Keck School of Medicine USC',
    images: [
      '/images/wellness/IMG_0007.jpg',
      '/images/wellness/IMG_0279.jpg',
      '/images/wellness/IMG_1554.jpg',
      '/images/wellness/IMG_1583.jpg',
      '/images/wellness/IMG_1610.jpg',
      '/images/wellness/IMG_9922.jpg',
      '/images/wellness/IMG_9874.jpg',
      '/images/wellness/IMG_9866.jpg',
      '/images/additional/IMG_5907.jpg',
      '/images/additional/IMG_5910.jpg',
    ],
    ctaText: 'WELLNESS WITHOUT WALLS.',
    ctaBody:
      'Sponsor a wellness activation, provide health screening services, or partner with IBTU to bring care where communities already gather.',
  },

  // ===========================================================================
  // 6. GIVING SEASON
  // ===========================================================================
  'giving-season': {
    slug: 'giving-season',
    heroTitle: 'WHEN THE YEAR ENDS, IBTU SHOWS UP ONE MORE TIME.',
    pillar: 'Community Health & Resource Access',
    tagline:
      'Community infrastructure does not take holidays. Six years of showing up when it matters most.',
    overview:
      'The Giving Season is IBTU\'s annual end-of-year campaign — now in its sixth year — delivering toys, meals, resources, and community connection across Los Angeles during the holidays. In 2024, the 5th Annual campaign reached 6,575 individuals across 7 events, distributing 4,550 toys and 550 meals. The 2025 season expanded to 11 events including the MegaFeast Thanksgiving distribution of 1,000 turkey boxes, community baby showers supporting Black maternal health, a Winter Wonderland, and the Oakwood Holiday Event serving 350+ fire-impacted Venice community members.',
    overviewHighlights: [
      '6,575 individuals across 7 events',
      '4,550 toys',
      '1,000 turkey boxes',
    ],
    stats: [
      { value: '6', label: 'Consecutive Years' },
      { value: '11', label: 'Events (2025)' },
      { value: '6,575', label: 'Individuals Reached (2024)' },
      { value: '4,550', label: 'Toys Distributed (2024)' },
      { value: '1,000', label: 'Turkey Boxes (MegaFeast)' },
      { value: '40+', label: 'Community Partners' },
    ],
    sections: [
      {
        heading: 'MegaFeast: One Thousand Tables Filled',
        body: `The MegaFeast Thanksgiving Distribution, in partnership with United MegaCare and One LA, distributed 1,000 turkey boxes to families across Los Angeles. Each box contained a full turkey and sides — enough to anchor a family's Thanksgiving table. Additional distributions reached 1,000 to 1,500 families with over $100,000 in meals.

This is not charity for the holidays. This is a logistics operation powered by community trust. Families show up because they know IBTU delivers consistently, with quality, and with respect. No lines that strip dignity. No cameras that exploit need. Just food, on time, with warmth.`,
        image: '/images/additional/IMG_0131.jpg',
        imageAlt:
          'Families receiving turkey boxes at the MegaFeast Thanksgiving Distribution',
        imagePosition: 'left',
        highlights: [
          '1,000 turkey boxes',
          'logistics operation powered by community trust',
          'No lines that strip dignity',
        ],
      },
      {
        heading: 'Toys, Joy, and Direct Connection',
        body: `The 5th Annual Winter Wellness Bash welcomed 2,000 attendees and distributed 2,500 toys alongside 45 health screenings and 25 dental screenings. The 2025 Hillcrest Toy Giveaway served 300+ families. The ECOS Group Toy Giveaway on December 23 ensured no child went without a gift before the holiday.

Every Giving Season event is free and open — no registration, no income verification, no proof of anything except showing up. Toys are new and age-appropriate. Partner organizations provide on-site services. Volunteers create an atmosphere of celebration, not obligation. When children walk out with a toy, they carry proof that their community showed up for them.`,
        image: '/images/additional/IMG_0166.jpg',
        imageAlt:
          'Children and families at the Winter Wellness Bash toy distribution',
        imagePosition: 'right',
        highlights: [
          '2,000 attendees and distributed 2,500 toys',
          'no registration, no income verification',
          'their community showed up for them',
        ],
      },
      {
        heading: 'Community Baby Showers for Black Maternal Health',
        body: `IBTU's community baby showers address the Black maternal health crisis directly — not with awareness campaigns, but with diapers, formula, hygiene kits, and connections to prenatal and postnatal care. The Health Net partnership (May 2025) and the Project Pit Maternal Health Summit (August 2025, featuring Halle Bailey, Faith Evans, and ABC7 coverage) centered the health and dignity of Black mothers in Los Angeles.

Baby2Baby has provided 498,075 items to IBTU since 2024, including 236,800 diapers and 166,760 wipes. These numbers represent families who did not have to choose between diapers and dinner. That is what resource access looks like when it is designed with dignity.`,
        image: '/images/additional/IMG_0173.jpg',
        imageAlt:
          'Mothers receiving supplies at an IBTU community baby shower event',
        imagePosition: 'left',
        highlights: [
          'Black maternal health crisis directly',
          '498,075 items',
          'designed with dignity',
        ],
      },
      {
        heading: 'Oakwood: Holidays After the Fires',
        body: `The Oakwood Holiday Event on December 7, 2025 served 350+ people in the Venice community — many of them still recovering from the fires that displaced their neighbors earlier that year. The Winter Wonderland at Algin Sutton Park, a job fair with Westside Food Bank gift cards, and the Volunteer Hangout rounded out a season that proved IBTU does not slow down when the calendar says it should.

Across 11 events, the 2025 Giving Season connected thousands of families to food, toys, job resources, health services, and each other. Community is the infrastructure — even in December.`,
        image: '/images/additional/IMG_0281.jpg',
        imageAlt:
          'Community members gathering at the Oakwood Holiday Event in Venice',
        imagePosition: 'right',
        highlights: [
          '350+ people in the Venice community',
          'does not slow down',
          'Community is the infrastructure',
        ],
      },
    ],
    whoWeServe: [
      'Families seeking holiday meals, toys, and resources during the most financially stressful season',
      'Parents preparing for the holidays who need diapers, supplies, and community connection',
      'Black mothers and families accessing maternal health resources and baby essentials',
      'Fire-impacted community members experiencing their first holiday season after displacement',
      'Anyone in Los Angeles — all events are free, open, and require no documentation',
    ],
    schedule: 'November through December annually',
    partners:
      'ECOS Group, Baby2Baby, Target, United MegaCare, One LA, Health Net, local toy donors, food sponsors, wellness providers',
    images: [
      '/images/b2s/6D5A0871.jpg',
      '/images/b2s/6D5A1246.jpg',
      '/images/b2s/_D5A8700.jpg',
      '/images/b2s/_D5A8744.jpg',
      '/images/additional/IMG_0131.jpg',
      '/images/additional/IMG_0150.jpg',
      '/images/additional/IMG_0166.jpg',
      '/images/additional/IMG_0173.jpg',
      '/images/additional/IMG_0189.jpg',
      '/images/additional/IMG_0281.jpg',
    ],
    ctaText: 'GIVING SEASON NEVER STOPS.',
    ctaBody:
      'Donate toys, sponsor a MegaFeast turkey box, or volunteer at a holiday distribution. Every contribution reaches a family that needs it.',
  },

  // ===========================================================================
  // 7. COMMUNITY HEALTH & EQUITY
  // ===========================================================================
  'community-health': {
    slug: 'community-health',
    heroTitle: '875,500 POUNDS OF FOOD. 389 EVENTS. STILL GOING.',
    pillar: 'Community Health & Resource Access',
    tagline:
      'Access alone does not create stability. Reliability and dignity do.',
    overview:
      'Since 2020, IBTU has distributed 875,500+ pounds of food across 389+ events, serving 130,116+ families. But Community Health is more than food. It encompasses health screenings through Charles Drew University and USC, dental and vision access through Liberty Dental and partner providers, mental health programming with licensed providers and no waitlist, naloxone distribution (223 kits), and the Baby2Baby partnership that has moved 498,075 items including 236,800 diapers. In 2023 alone, IBTU served 144,000 individuals through weekly dual-site food distributions. 94% of families reported reduced food stress.',
    overviewHighlights: [
      '875,500+ pounds of food across 389+ events',
      '130,116+ families',
      '94% of families reported reduced food stress',
    ],
    stats: [
      { value: '875,500+', label: 'Pounds of Food (Since 2020)' },
      { value: '130,116+', label: 'Families Served (Food)' },
      { value: '389+', label: 'Distribution Events' },
      { value: '498,075', label: 'Baby2Baby Items' },
      { value: '223', label: 'Naloxone Kits' },
      { value: '94%', label: 'Reduced Food Stress' },
    ],
    sections: [
      {
        heading: 'Weekly Food Access, Zero Barriers',
        body: `IBTU's food distribution program launched in 2020 during the pandemic with 500 families and 2,000 pounds of food across 4 events. By 2023, that had scaled to 54,000 families, 144,000 individuals, and 410,000 pounds across dual-site Tuesday and Friday distributions in South and East LA. In total, 130,116+ families have accessed food through 389+ events.

Every distribution operates on the same principle: show up and receive. No ID required. No income verification. No forms. Fresh produce, nonperishable goods, and culturally relevant food — distributed with the same operational rigor IBTU brings to every program. 94% of families surveyed reported reduced food stress. Reliability is the intervention.`,
        image: '/images/additional/IMG_5390.jpg',
        imageAlt:
          'Community members receiving fresh produce at an IBTU food distribution',
        imagePosition: 'left',
        highlights: [
          '130,116+ families have accessed food through 389+ events',
          'No ID required. No income verification. No forms.',
          'Reliability is the intervention',
        ],
      },
      {
        heading: 'Baby2Baby: Half a Million Items Moved',
        body: `Since 2024, the Baby2Baby partnership has delivered 498,075 items to families across Los Angeles and Miami — 236,800 diapers, 166,760 wipes, 8,633 hygiene products, 10,500 cleaning supplies, 1,563 toys, and 2,042 school supply packs. These are not surplus donations. They are essential goods distributed through IBTU's trusted infrastructure to families who need them.

Community baby showers, Back 2 School festivals, Hub distributions, and holiday events all serve as distribution channels. The Baby2Baby partnership is proof of what happens when a product partner meets an organization with the community trust and logistics to deliver at scale.`,
        image: '/images/additional/IMG_5392.jpg',
        imageAlt:
          'Volunteers sorting and distributing Baby2Baby donations',
        imagePosition: 'right',
        highlights: [
          '498,075 items',
          '236,800 diapers, 166,760 wipes',
          'community trust and logistics to deliver at scale',
        ],
      },
      {
        heading: 'Health Screenings Where Families Already Gather',
        body: `Through Charles Drew University, IBTU delivered 156 blood pressure screenings, 84 A1C checks, and 72 cholesterol screenings between January and June 2024. USC All of Us Research enrolled 38 participants through 195 community interactions. 430 people received CPR education. 430 attended fentanyl awareness trainings. 300 participated in nutrition education sessions.

These numbers did not come from a clinic outreach campaign. They came from embedding clinical partners inside existing IBTU events — food distributions, school resource fairs, Back 2 School festivals. When families are already present and comfortable, the step from picking up groceries to checking their blood pressure is small. That is how community health infrastructure works.`,
        image: '/images/wellness/IMG_4457.jpg',
        imageAlt:
          'Health professionals conducting screenings at an IBTU community event',
        imagePosition: 'left',
        highlights: [
          '156 blood pressure screenings, 84 A1C checks, and 72 cholesterol screenings',
          'embedding clinical partners inside existing IBTU events',
          'community health infrastructure works',
        ],
      },
      {
        heading: 'Mental Health With No Waitlist',
        body: `In a city where mental health waitlists stretch months, IBTU provides access to licensed providers with no waitlist at the Hub and through school-based programming. This includes individual support, group sessions, and referrals to long-term care. 62% of fire-assessed clients at the Hub reported significant mental health impact — 139 adults with stress and anxiety, 52 children with behavioral changes.

Naloxone distribution (223 kits), dental access days through Liberty Dental, and vision screenings round out a health access model that treats the whole person. IBTU does not separate physical health from mental health from food access from housing stability. It is all connected, and the programming reflects that. Designed with dignity.`,
        image: '/images/additional/IMG_5431.jpg',
        imageAlt:
          'Community members connecting with mental health and wellness resources',
        imagePosition: 'right',
        highlights: [
          'no waitlist',
          'It is all connected',
          'Designed with dignity',
        ],
      },
    ],
    whoWeServe: [
      'Families accessing weekly food distributions in South LA and surrounding communities',
      'New parents and expectant mothers receiving diapers, formula, and maternal health support',
      'Community members seeking free health screenings, dental care, and vision services',
      'Individuals navigating mental health challenges who need immediate, stigma-free support',
      'Anyone in Los Angeles — all services are free, walk-in, and require no documentation',
    ],
    schedule:
      'Weekly distributions, recurring health screenings, monthly partner activations',
    partners:
      'LA Care Health Plan, Charles Drew University, USC All of Us, Liberty Dental, Tena Health, Keck School of Medicine USC, United MegaCare, One LA, Baby2Baby, LA Rams, Pepsi',
    images: [
      '/images/wellness/IMG_0097.jpg',
      '/images/wellness/IMG_0111.jpg',
      '/images/wellness/IMG_4457.jpg',
      '/images/wellness/IMG_4688.jpg',
      '/images/additional/IMG_5390.jpg',
      '/images/additional/IMG_5392.jpg',
      '/images/additional/IMG_5394.jpg',
      '/images/additional/IMG_5404.jpg',
      '/images/additional/IMG_5415.jpg',
      '/images/additional/IMG_5431.jpg',
    ],
    ctaText: 'HEALTH ACCESS STARTS HERE.',
    ctaBody:
      'Partner with IBTU to sponsor food distributions, provide health screening services, or fund direct community health programming. Every dollar moves $18 in resources.',
  },
}

// =============================================================================
// HELPER
// =============================================================================

export function getProgramContent(slug: string): ProgramContent | undefined {
  return PROGRAM_CONTENT[slug]
}

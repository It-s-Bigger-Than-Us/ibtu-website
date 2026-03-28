# IBTU Content Audit — Reconciled Master Dataset

**Date:** 2026-03-28 (updated with Molly's decisions + Master Data v3 + SSOT v3 + Annual Report tables)
**Purpose:** Single reconciled document for Sanity CMS. Molly reviews and approves before data is seeded.
**Method:** Cross-referenced Obsidian vault SSOT, datatables CSVs, webibtu skill files, current TypeScript data, CMS registry CSVs, and Google Drive exports.

**Legend:**
- ✅ **Verified** — consistent across all sources
- ⚠️ **Reconciled** — contradiction found, resolved with reasoning
- ❓ **Needs Molly's Decision** — ambiguous or multiple valid options

---

## SECTION 0: CRITICAL RECONCILIATION DECISIONS

These are the contradictions I found. I've made a recommended resolution for each — Molly, confirm or override.

### ✅ 1. Volunteer Count — DECIDED
**Molly's decision:** **7,500+ active now / 10,000+ peak**. Both numbers are valid with context.
- Hero stats / overview: "10,000+ volunteers" (peak database)
- Active / current context: "7,500+ active volunteers"
- Phase 1 fire relief specific: "3,500+ deployed"

### ✅ 2. First Responder Meals — DECIDED
**Molly's decision:** **15,000+ meals** is correct. The extra 5,000 did not make it into the tracker but were served. 10,560 is only the tracked portion. Keep **15,000+** everywhere.

### ⚠️ 3. Fire Relief Cases / Families
| Source | Number |
|---|---|
| Current programs.ts | "5,000+ families stabilized" |
| 06_fire_by_the_numbers.csv | 717 verified cases / 313 households / 2,290 individuals |
| ibtu-fire-relief-data.md | 717 verified / 5,000+ families (broader Phase 1 scope) |

**Resolution:** Both are correct but different scopes. **717** is the verified caseload at the Hub. **5,000+** is the broader Phase 1 community reach. Use both with context:
- Hub page / detailed stats: "717 verified cases, 313 households, 2,290 individuals"
- Hero / overview: "5,000+ families stabilized"

### ✅ 4. School Investment — DECIDED
**Molly's decision:** Keep **$721,660** for now. The rest is paid out end of semester. The $758,661 includes contracts not yet fulfilled.

### ✅ 5. Program Name — DECIDED
**Molly confirmed:** Use **"Community Health & Resource Access"**. Matches official pillar name.

### ✅ 6. Award Count — DECIDED
**Molly confirmed:** **23 is right.** Expand from current 16 to complete 23 list.

### ⚠️ 7. Partner Count
| Source | Count |
|---|---|
| Current partners.ts | 65 records |
| ibtu-partnerships-media.md | **346+ partners** |
| Hero stats CSV | 300+ partners activated |

**Resolution:** The 300+ is the public-facing marketing number. The 346+ is the verified total. Sanity CMS should contain the **full 346+** list. Website displays "300+" as the headline stat.

### ⚠️ 8. Event Count
| Source | Count |
|---|---|
| Current events.ts | 47 events |
| 02-site-architecture.md | 54 events |
| CMS Registry CSV | 94 programs/events entries |
| Reconciled Registry w/ Job Numbers | 57 job-numbered entries |

**Resolution:** The CMS Registry (94) is the most complete — it includes individual school program entries, recurring events, and admin line items. For the public website, use the **57 job-numbered entries** as the event dataset. Internal-only items (admin hours, compliance) stay out of the CMS public display.

### ✅ 9. Families Served (All-Time) — DECIDED
**Molly confirmed:** **150,000+** families / **600,000+** individuals.

### ⚠️ 10. B2S Cumulative Numbers — UPDATED from Master Data v3
The Master Data Source of Truth v3 has HIGHER cumulative B2S numbers than the SSOT v3 locked values:

| Metric | SSOT v3 (locked) | Master Data v3 (newer) |
|---|---|---|
| B2S Attendees (cumulative) | 17,500+ | **20,396+** |
| B2S Backpacks (cumulative) | 18,550+ | **22,550+** |
| B2S Schools Reached | (unlisted) | **90+** |
| B2S Zip Codes | (unlisted) | **123+** |
| B2S Total Meals | (unlisted) | **8,950+** |
| B2S Media Placements | (unlisted) | **80+** |

**Resolution:** The Master Data v3 includes 2025 B2S events (3 locations). Use the updated numbers: **22,550+ backpacks / 20,396+ attendees / 90+ schools / 123+ zip codes**.

### New Data Points from Master Data v3 (not in previous audit)
- **lululemon First Responder Event (Feb 12):** 700 first responders, 2,100 high-performance clothing pieces
- **LAX Marriott Lifeline:** 33 displaced families housed, 56 volunteers
- **Phase 1B financial:** $325,000+ IBTU clothing/essentials at Together We Rebuild
- **School Programs 2025 detail:** 11 sites, ~4,500 student engagements, ~500 parent engagements
- **2024 Kendrick Lamar / pgLang donation:** One of 20 LA nonprofits, from Juneteenth Pop Out Concert
- **2025 Good Morning America feature:** Fire relief work coverage
- **Baby2Baby 2024 itemized:** 243,024 items LA + 255,051 items Miami = 498,075 total
- **Venice B2S:** 1,500+ registered, 146 lbs coastal cleanup, 149 fire-impacted individuals served at relief zone

---

## SECTION 1: PROGRAMS (7 Records)

All 7 programs verified ✅ across sources. Changes needed noted below.

| # | Program | Slug | Pillar | Schedule Type | Status |
|---|---|---|---|---|---|
| 1 | Fire Relief & The Hub | fire-relief | Crisis & Disaster Stabilization | Ongoing | Active |
| 2 | Back 2 School Festival | back-2-school | Community Health & Resource Access | Annual | Upcoming |
| 3 | Youth Programming | youth-programming | School & Youth Stability | Ongoing | Active |
| 4 | Coastal Care | coastal-care | Community Health & Resource Access | Monthly | Active |
| 5 | Giving Season | giving-season | Community Health & Resource Access | Annual | Active |
| 6 | Wellness & Health Activations | wellness | Community Health & Resource Access | Ongoing | Active |
| 7 | ⚠️ Community Health & Resource Access | community-health | Community Health & Resource Access | Weekly | Active |

**Changes from current data:**
- ⚠️ Program 7 title: Change from "Community Health & Food Access" to **"Community Health & Resource Access"**
- ⚠️ Fire Relief allTimeServed: Change "15,000+ meals" to **"10,560 first responder meals"**
- ⚠️ Fire Relief proofStats: Add "717 verified cases | 313 households | 2,290 individuals"

### Program Taglines (verified against brand voice guide ✅)
1. Fire Relief: "When the fires hit, IBTU was already here..." ✅ No prohibited language
2. Back 2 School: "Every year, IBTU transforms community spaces..." ✅
3. Youth Programming: "When families face instability, students feel it first..." ✅
4. Coastal Care: "Community infrastructure includes the natural environment..." ✅
5. Giving Season: "When the year ends, IBTU shows up one more time..." ✅
6. Wellness: "IBTU removes barriers to health and wellness..." ✅
7. Community Health: "IBTU removes barriers to health and essentials..." ✅

**Brand voice check:** All 7 taglines pass. No prohibited language found.

---

## SECTION 2: EVENTS (57 Job-Numbered Records)

Source: Molly's job number registry (pasted during plan review) + CMS Registry CSV + Obsidian vault programs-events.md.

### School & Youth Stability (22 events)

| # | Job Number | Event/Program | Date | Status |
|---|---|---|---|---|
| 1 | SCH-F25-099913-SouthPark-ES-PEP8-121725 | South Park ES Parent Empowerment (8-week) | Feb 2023–Dec 2025 | Closed |
| 2 | SCH-S25-019198-Hillcrest-ES-LT-PKG-1203-1212-121925 | Hillcrest ES Lunchtime Takeover Package | Nov 2024–Apr 2025 | Closed |
| 3 | SCH-S25-055027-UPMA-MS-RF-040325 | UPMA MS Resource Fair | Aug 2022–Apr 2026 | Active |
| 4 | SCH-S25-099648-Purche-ES-RF-060625 | Purche ES Resource Fair | Jan 2025–Apr 2026 | Active |
| 5 | SCH-F24-S25-028024-IYC-MS-CC-Ongoing | Community Creators (Iovine & Young) | Feb–Mar 2025 | Closed |
| 6 | SCH-S25-026132-186thSt-ES-LT111924-RF-020725-RF053025 | 186th St ES LT + Resource Fairs | 11/19/2024 | Active |
| 7 | SCH-S25-039743-MDRMS-MS-LT-021325-030625-041125-052325 | Mar Vista Gardens MS LTs | Apr 2023–Aug 2025 | Closed |
| 8 | SCH-F25-099648-Purche-ES-RF-102425 | Purche ES Resource Fair (Fall) | Aug–Dec 2025 | Closed |
| 9 | SCH-F25-099705-Wright-MS-RF-092725 | Wright MS Resource Fair | Sep–Nov 2025 | Closed |
| 10 | SCH-S25-042118-YESAcademy-ES-LT-042125 | YES Academy ES LTs | Jul 2023–Apr 2026 | Active |
| 11 | SCH-S25-027520-Brentwood-ES-RF-040525 | Brentwood ES Resource Fair | Jun 2024–Nov 2025 | Closed |
| 12 | SCH-F25-102867-Hillcrest-ES-LT-PKG | Hillcrest ES LT Package (multi-date) | Oct 2025–Dec 2026 | Active |
| 13 | SCH-S25-051784-Towne-ES-RF-040825 | Towne ES Resource Fair | Mar–Nov 2025 | Closed |
| 14 | SCH-S25-049142-Wright-MS-RF-031525 | Wright MS Resource Fair (Spring) | Apr 2023–Mar 2025 | Closed |
| 15 | SCH-F25-099648-Purche-ES-LT-121025 | Purche ES Lunchtime Takeovers | Sep 2025–Dec 2026 | Active |
| 16 | SCH-F25-099648-Purche-ES-ParentEmp-110825 | Purche ES Parent Empowerment Day | Nov 2025 | Closed |
| 17 | SCH-F25-107780-CenturyPark-ES-StaffApp-121625 | Century Park ES Staff Appreciation | Dec 2025–Mar 2026 | Active |
| 18 | SCH-F25-115580-YESAcademy-ES-LT-120425 | YES Academy ES LT (Dec) | 12/08/2025 | Closed |
| 19 | SCH-F25-099648-Purche-ES-COMP-PD-102125 | Purche ES Compliance PD | Oct–Nov 2025 | Closed |
| 20 | SCH-F25-Admin-Hours | School Program Admin Hours | Ongoing | Active |
| 21 | SCH-F25-Compliance | School Program Compliance | Jan–Dec 2025 | Active |
| 22 | SCH-S26-LAUSD-Admin | LAUSD Admin (2026) | Jan 2025–Feb 2026 | Active |

### Crisis & Disaster Stabilization (10 events)

| # | Job Number | Event/Program | Date | Status |
|---|---|---|---|---|
| 23 | FIRE-RELIEF-Operations | Fire Relief Operations | Jan–Sep 2025 | Active |
| 24 | PROG-S25-011-IBTU-FireRelief-Windsor-050225 | Windsor Fire Relief | Feb 2024–Apr 2025 | Closed |
| 25 | PROG-S25-010-IBTU-FireRelief-HubOpening-041225 | Hub Opening | Mar 2025–Jan 2026 | Active |
| 26 | FIRE-RELIEF-ImmigrationAid | Immigration Aid | Jun–Jul 2025 | Closed |
| 27 | PROG-F25-011-FireRelief-JobFair-12182026 | Fire Relief Job Fair | 12/18/2026 | Upcoming |
| 28 | PROG-S25-009-IBTU-FireRelief-Phase1A | Phase 1A Emergency Response | Jan–Feb 2025 | Closed |
| 29 | PROG-S25-009-IBTU-FireRelief-Phase1B | Phase 1B | 02/22/2025 | Closed |
| 30 | PROG-S25-009-IBTU-FireRelief-Together We Rebuild-022025 | Together We Rebuild | Feb–Apr 2025 | Closed |
| 31 | PROG-S25-012-IBTU-CD11-Oakwood-042625 | CD11 Oakwood Event | May–Aug 2025 | Closed |
| 32 | PROG-S25-013-IBTU-FireRelief-Warehouse | Fire Relief Warehouse Ops | Jun–Oct 2025 | Closed |

### Community Health & Resource Access (25 events)

| # | Job Number | Event/Program | Date | Status |
|---|---|---|---|---|
| 33 | PROG-F24-GivingSeason | Giving Season (legacy) | 2022–2025 | Closed |
| 34 | B2S-25-001-BHCP-080125 | B2S — BHC Plaza | 08/01/2025 | Closed |
| 35 | B2S-25-002-VB-082625 | B2S — Venice Beach | 08/26/2025 | Closed |
| 36 | B2S-25-003-CRENSHAW-HS-090625 | B2S — Crenshaw HS Court Dedication | 09/06/2025 | Closed |
| 37 | PROG-S25-001-IBTU-CoastalCare | Coastal Care Launch | 05/28/2025 | Active |
| 38 | CANCELLED-PROG-S26-001-IBTU-DigitalLiteracy | Digital Literacy (CANCELLED) | — | Cancelled |
| 39 | PROG-25-YOGA-041925 | lululemon Yoga | 04/19/2025 | Closed |
| 40 | PROG-F24-CrenshawCourts-23-25 | Crenshaw Courts Project | 06/18/2025 | Closed |
| 41 | PROG-F24-MISC-008-Miami | Miami Operations | Apr 2024–Jun 2025 | Closed |
| 42 | PROG-F25-GivingSeason-BHCP-122325 | ECOS Toy Giveaway | 12/23/2025 | Closed |
| 43 | PROG-F25-GivingSeason-BHCP-Megafeast-110826 | MegaFeast 2026 | 11/08/2026 | Upcoming |
| 44 | PROG-F25-GivingSeason-BHCP-WW-121325 | Winter Wonderland | 12/13/2025 | Closed |
| 45 | PROG-F25-GivingSeason-CD11-112125 | CD11 Holiday Event 2025 | 11/21/2025 | Closed |
| 46 | PROG-F25-GivingSeason-CD11-112126 | CD11 Holiday Event 2026 | 11/21/2026 | Upcoming |
| 47 | PROG-F25-GivingSeason-Oakwood-120726 | Oakwood Holiday 2026 | 12/07/2026 | Upcoming |
| 48 | PROG-F25-GivingSeason-PFGLAxHillcrest-121925 | PFGLAxHillcrest Holiday | Oct–Dec 2025 | Closed |
| 49 | PROG-F25-GivingSeason-WhyNot-112026 | WhyNot Holiday 2026 | 11/20/2026 | Upcoming |
| 50 | PROG-F25-Volunteer-Hangout-121525 | Volunteer Hangout | 12/15/2025 | Closed |
| 51 | PROG-F26-NEW-022-GivingSeason-2025 | Giving Season 2025 Wrap | Dec 2025–Jan 2026 | Closed |
| 52 | PROG-S25-012-IBTU-Yoga-BeachCleanup-0625 | Yoga + Beach Cleanup (Jun) | 06/2025 | Closed |
| 53 | PROG-S25-012-IBTU-Yoga-BeachCleanup-0725 | Yoga + Beach Cleanup (Jul) | 07/2025 | Closed |
| 54 | PROG-S25-CD9-INELLWOODS-061425 | CD9 Inglewood Event | 06/14/2025 | Closed |
| 55 | PROG-S25-HealthNet-BabyShower-111025 | HealthNet Baby Shower | 11/10/2025 | Closed |
| 56 | PROG-S25-WHAA-RTB-072725 | WHAA Return to Basics | 07/27/2025 | Closed |
| 57 | PROG-S26-002-IBTU-CoastalCare-021426 | Coastal Care Feb 2026 | 02/14/2026 | Closed |

**Molly's Decisions:**
- ✅ Job #38 (Digital Literacy): **CANCELLED** — remove from CMS entirely
- ✅ Job #20-22 (Admin Hours, Compliance, LAUSD Admin): **Keep as internal only** (`displayOnWebsite: false`)

---

## SECTION 3: AWARDS (23 Records)

Source: ibtu-awards-recognitions.md (verified, complete list)

### 2025 (10 awards) ✅

| # | Title | Presented By | Date | Context |
|---|---|---|---|---|
| 1 | Inaugural Changemaker Award | U.S. Congress — Congresswoman Sydney Kamlager-Dove (CA-37) | Dec 8, 2025 | Wildfire Relief & Community-Centered Leadership |
| 2 | Assembly Resolution No. 834 — CA Nonprofit of the Year | CA Legislature — 55th District (Asm. Isaac G. Bryan) | May 21, 2025 | California Nonprofits Day |
| 3 | Certificate of Recognition — Hub Opening | U.S. House of Representatives (Congresswoman Kamlager-Dove) | Apr 12, 2025 | Hub Opening |
| 4 | Congratulatory Certificate — Hub Ribbon Cutting | County of LA — 2nd District (Supervisor Holly J. Mitchell) | Apr 12, 2025 | Hub Launch |
| 5 | Certificate of Recognition — Hub Opening | CA State Senate — 28th District (Senator Smallwood-Cuevas) | Mar 23, 2025 | Grand Opening |
| 6 | SC CTSI Community Engagement Recognition | Southern California CTSI (Dr. Nicole Wolfe) | Mar 27, 2025 | Community Engagement |
| 7 | African American Heritage Month 2025 | City of LA — CD9 (Mayor Bass + council members) | Feb 2025 | Heritage Recognition |
| 8 | PowHERful Award 2025 | Councilmember Heather Hutt — CD10 | Mar 9, 2025 | Women's Empowerment (to Molly Morrow) |
| 9 | Certificate of Recognition — 6th B2S Venice | City of LA — Office of the Mayor (Karen Bass) | Aug 23, 2025 | Back 2 School Recognition |
| 10 | Certificate of Recognition — 6th B2S | CA State Senate — 28th District (Senator Smallwood-Cuevas) | Aug 2, 2025 | 1,500+ backpacks distributed |

### 2025 — Full City Council (1 award)

| 11 | Full City Council Recognition — CD11 | LA City Council (15 members, introduced by CM Traci Park) | May 16, 2025 | Full Council Recognition |

### 2024 (8 awards) ✅

| 12 | Certificate of Recognition — DEI Impact | CA State Senate — 28th District (Senator Smallwood-Cuevas) | Aug 24, 2024 | Social Impact & DEI |
| 13 | Certificate of Recognition — 5th B2S | U.S. House of Representatives (Congresswoman Kamlager-Dove) | Aug 3, 2024 | Back 2 School |
| 14 | Top 100 California Nonprofit — 28th Senate District | CA State Senate (Senator Smallwood-Cuevas) | 2024 | Top 100 CA Nonprofit |
| 15 | L.A. REPAIR Participatory Budgeting Recognition | City of LA — Mayor (Karen Bass) | Jun 7, 2024 | L.A. REPAIR Celebration |
| 16 | Certificate of Recognition — CD8 | City of LA — CD8 (CM Marqueece Harris-Dawson) | Dec 14, 2024 | To Molly Morrow |
| 17 | Health Equity Certificate — Yoga in the Park | City of LA — CD10 (CM Heather Hutt) | Nov 16, 2024 | lululemon + Black OM |
| 18 | Baby2Baby Partner Award | Baby2Baby | 2024 | Partnership Recognition |
| 19 | Special Commendation — City of Inglewood | City of Inglewood (Mayor James T. Butts Jr.) | 2024 | B2S Inglewood |

### 2023 (2 awards) ✅

| 20 | Full City Council Recognition — CD8 | LA City Council (introduced by CM Harris-Dawson) | 2023 | Community Service |
| 21 | African American History Recognition Plaque | City of LA — CD9 (CM Curren D. Price Jr.) | Feb 2023 | Heritage Recognition |

### 2022 (1 award) ✅

| 22 | Commendation — LA County Women's Empowerment | County of LA (Supervisor Holly J. Mitchell) | Mar 23, 2022 | Women's Empowerment |

### 2024 — County (1 award)

| 23 | LA County Commendation | County of LA — 2nd District | 2024 | Community Service |

**Summary by Level:** Federal: 3 | State Assembly: 1 | State Senate: 4 | County: 3 | City LA: 9 | City Inglewood: 1 | Institutional: 2

---

## SECTION 4: IMPACT STATS (Reconciled)

Source: ibtu-stats-master.md (SSOT) cross-referenced with hero_stats_2025.csv

### 2025 At A Glance

| Stat | Value | Source Verified |
|---|---|---|
| Students Served (2025) | 28,025 | ✅ All sources agree |
| School Sites | 34 | ✅ |
| Fire Relief Families Stabilized | 5,000+ | ✅ (broad scope) |
| Fire Verified Cases | 717 | ✅ (Hub caseload) |
| Hub Active Clients | 324 | ✅ |
| Hub Assistance Instances | 7,581 | ✅ |
| Hub Items Distributed | 15,413 | ✅ |
| In-Kind Value Mobilized | $4.5M+ ($4,543,016 exact) | ✅ |
| In-Kind Leverage Ratio | $18 returned per $1 donated | ✅ |
| Partners Activated | 300+ | ✅ |
| ✅ First Responder Meals | **15,000+** | Molly confirmed — 10,560 tracked, rest untracked but served |
| Immigration Families | 350 | ✅ |
| Backpacks Distributed (all-time) | 18,550+ | ✅ |
| Media Placements | 75+ | ✅ |
| Instagram Reach | 2.47M | ✅ |
| Awards | 23 | ✅ |
| ✅ School Investment | **$721,660** | Molly confirmed — rest paid out end of semester |

### Cumulative (Since 2020)

| Stat | Value | Source Verified |
|---|---|---|
| Students Served | 62,475+ | ✅ |
| ⚠️ Families Served | **150,000+** | Reconciled: use marketing-rounded from hero CSV |
| ⚠️ Individuals Reached | **600,000+** | Reconciled: use marketing-rounded from hero CSV |
| Food Distributed | 875,500+ lbs | ✅ |
| Food Events | 389+ | ✅ |
| Partners & Sponsors | 300+ (346+ verified) | ✅ |
| ✅ Volunteers | **7,500+ active / 10,000+ peak** | Both valid with context |
| Awards | 23 | ✅ |
| Consecutive Years | 6 | ✅ |
| Healthcare Partners | 50+ | ✅ |
| B2S Attendees (all-time) | 17,500+ | ✅ |

### Five-Year Growth (from 02_five_year_growth.csv) ✅

| Year | Students | Campuses | Food (lbs) | Partners |
|---|---|---|---|---|
| 2020 | 2,850 | 0 | 2,000 | 10 |
| 2021 | 6,000 | 3 | 200,000 | 25 |
| 2022 | 9,800 | 8 | 175,000 | 45 |
| 2023 | 14,150 | 12 | 410,000 | 120 |
| 2024 | 18,600 | 22 | 67,500 | 180 |
| 2025 | 28,025 | 34 | 18,000 | 300 |

### Digital Reach (from ibtu-digital-analytics.md) ✅

| Metric | Value |
|---|---|
| Instagram Reach (2025) | 2,468,996 |
| Instagram Views (2025) | 1,073,265 |
| Profile Visits | 122,031 |
| New Followers | 4,878 |
| Content Published | 836 (500 stories + 336 posts) |
| Website Visits (2025) | 74,678 |
| Website 3-Year Growth | 5,038 → 8,203 → 74,678 (14x) |
| Audience | 76.9% women / 83.3% ages 25-54 |

---

## SECTION 5: FIRE RELIEF DATA (Detailed)

Source: ibtu-fire-relief-data.md + datatables CSVs. All verified ✅

### Phase Timeline
| Phase | Dates | Key Metrics |
|---|---|---|
| Phase 1A: Emergency Response | Jan 7-28, 2025 | 1,800+ volunteers, 10,560 meals, 147 deliveries to 85 locations |
| Phase 1B: Together We Rebuild | Feb 22, 2025 | 2,500+ attendees, $1M+ resources, 50+ partners |
| Hub Opening | Mar 23, 2025 | Ribbon cutting with Congressional/Senate/County recognition |
| Hub Grand Opening | Apr 12, 2025 | Formal opening at Baldwin Hills Crenshaw Plaza |
| Phase 2: Recovery | 2025-ongoing | Case management, 324 active clients |
| Immigration Relief | Jul 16-22, 2025 | 350 families, 3 LAUSD campuses, UTLA partnership |

### Hub Demographics (from fire data + CSV)
| Category | Percentage |
|---|---|
| Gender: Women | 60% |
| Gender: Men | 40% |
| Children under 18 | 25% |
| Adults 18-64 | 58% |
| Seniors 65+ | 17% |
| Permanently displaced | 79% |
| Total home loss | 72% |
| First-time relief recipients | 62% |
| Significant mental health impacts | 62% |
| Unemployed | 37% |
| Unable to work | 20% |
| Uninsured (renters) | 38 households |

### Hub Distribution (from 07_hub_items_by_category.csv)
| Category | Items |
|---|---|
| Clothing | 3,273 |
| Food | 2,918 |
| Household Supplies | 2,800 |
| Other | 4,238 |
| Personal Care | 1,228 |
| Baby Essentials | 956 |
| **Total** | **15,413** |

### Monthly Intake (from 04_fire_relief_monthly_intake.csv)
Phase 1 (Jan-Feb): 130 cases → Phase 2 (Mar-Jun): 468 cases (peak: 226 in June) → Phase 3 (Jul-Dec): 119 cases

---

## SECTION 6: THREE PILLARS (from 03_three_pillars.csv + brand voice guide)

| Pillar | 2025 Headline Stat | Key Metric |
|---|---|---|
| Crisis & Disaster Stabilization | 717 verified relief cases | 313 households stabilized |
| School & Youth Stability | 28,025 students served | 34 school sites |
| Community Health & Resource Access | 875,500+ lbs food | 389+ distribution events |

**Pillar descriptions:** See brand voice guide. Verified ✅ — no prohibited language.

---

## SECTION 7: BRAND VOICE VIOLATIONS FOUND

Scanned all page copy (03-page-copy.md) and current website code against the brand voice guide.

| Location | Violation | Fix |
|---|---|---|
| 03-page-copy.md, Get Involved section | "Join **10,000+** people in our volunteer network" | Change to "Join **7,500+** Community Builders" |
| 03-page-copy.md, About Hero | "serving **South Los Angeles** and beyond" | Change to "serving **Los Angeles** and beyond" |
| Current programs.ts | Program 7 title: "Community Health & **Food** Access" | Change to "Community Health & **Resource** Access" |
| Current programs.ts, org-timeline.ts | "**15,000+** meals" | Change to "**10,560** first responder meals" |

**No prohibited language found** ("underprivileged," "at-risk youth," "charity," etc.) in any source. Brand voice is clean.

---

## SECTION 8: MEDIA MOMENTS (from ibtu-partnerships-media.md) ✅

**Top 2025 Coverage:**
- Jennifer Hudson Show (S3 Ep 95, Sep 5, 2025)
- PR Newswire → syndicated to Yahoo Finance, KRON4, The Astorian, KGET
- FOX 11 Los Angeles (Hub feature)
- WebWire (lululemon x IBTU x BeyGOOD)
- Interview Magazine (LA Fire Relief Resources)
- Resident Advisor (A Club Called Rhonda benefit)
- lululemon Glow Up Studio NYC (13 media hits: WWD, People — all proceeds to IBTU)
- LA Sentinel (multiple: Alliance, Crenshaw HS, B2S, PowHERful)
- ABC7 Los Angeles

**Total: 75+ placements in 2025 | 114+ all-time**

---

## SECTION 9: UNREADABLE FILES (Need Molly to Export as CSV)

These files are binary (.xlsx/.docx) and could contain additional data I can't verify:

| File | Location | What It Might Contain |
|---|---|---|
| IBTU_SINGLE_SOURCE_OF_TRUTH.xlsx | Google Drive | May have consolidated stats beyond what's in Obsidian |
| IBTU_MASTER_DATA_AUDIT_2025_v4_FINAL.xlsx | Google Drive | Full audit workbook |
| IBTU_CMS_Data_Tables_By_Pillar.xlsx | Google Drive + Downloads | CMS-ready data tables (multiple versions) |
| IBTU_CMS_Copy_Session1.docx | Downloads | CMS copy writing session |
| ibtu-programs-cms-reference.docx | Downloads (332KB) | CMS reference documentation |
| ibtu-programs-cms-v4.docx | Google Drive | CMS program spec v4 |
| IBTU_Copy_Standardization_Guide.docx | Google Drive | Copy standards |

❓ **Molly:** Want me to try to extract data from any of these? If you can export the .xlsx files as .csv from Google Sheets, I can read them completely.

---

## SECTION 10: FINANCE INVENTORY (List Only — Separate Project)

**NOT for CMS or website. Listed here for future reference.**

| File | Location | Content |
|---|---|---|
| It's Bigger Than Us_Account List - copy.csv | Google Drive | Chart of accounts (85+ categories) |
| It's Bigger Than Us_Transaction Report - copy.csv | Google Drive | Transactions (23K+ tokens, very large) |
| 083123 IBTU Income & Expenses for Review.xlsx | Google Drive | 2023 income/expenses |
| 123123 IBTU Financials.xlsx | Google Drive | Financials summary |
| 2023 IBTU 1099_mm.xlsx | Google Drive | 1099 records |
| Bloomerang_All_Donations__Final_with_No_N_A_.csv | Downloads | 1,000+ donations |
| 2024_B2S_SponsorTracker.xlsx | Downloads | B2S sponsors |
| F25-SPR26 Finance Tracker CSV | Downloads | School contracts + finance |
| American_Express Business Credit Card CSV | Downloads | AmEx transactions |
| Wells_Fargo CSV | Downloads | Bank transactions |
| Annual business budget.gsheet | Google Drive | Budget (live doc) |
| Program Budget Drafts.gsheet/.xlsx | Google Drive | Program budgets |

**Note:** Molly mentioned the master ledger may have some wrong dates. This will be addressed in the separate finance project.

---

## SECTION 11: IMAGE & VIDEO ASSET LOCATIONS

### Website-Ready Images (currently on Wix CDN)
All program hero images and card images currently use `static.wixstatic.com` URLs. These work but should migrate to Sanity CDN.

### Photo Collections Found
| Location | Content | Count |
|---|---|---|
| `/Downloads/PHOTO UPLOAD/` | Organized upload folder | 317 items |
| `/Downloads/IBTU back 2 School pics_*/` | B2S event photos | 170+ photos |
| `/Downloads/IBTU - Wright Middle School Content/` | School program photos | Large (423MB zip) |
| `/Desktop/` | Hub launch video, school program videos | 10+ videos |
| `/Google Drive/My Drive/` | Large event PDFs with photos, Back 2 School assets | 20+ large files |
| `/Downloads/` | Logos, certificates, event graphics | 793+ image files total |

### Videos Found
| File | Location |
|---|---|
| IBTU - Hub Launch Video Done - 2025.mp4 | Desktop |
| IBTU - PATHWAYS SCHOOL.mp4 (4 versions) | Desktop |
| IBTU - school program videos (multiple) | Desktop |
| Mission video (currently embedded from Wix) | `video.wixstatic.com` URL |

### IBTU_CONTENT_UPLOAD Shared Drive (Master Asset Library)
**Path:** `/Users/mollymorrow/Library/CloudStorage/GoogleDrive-molly@itsbiggerthanusla.org/Shared drives/IBTU_CONTENT_UPLOAD`
**RULE: COPY ONLY — never delete or move files from this drive.**

**Total:** 14,082 files / 3.8 GB

| Folder | Files | Size | Content |
|---|---|---|---|
| **SCHOOL PROGRAM** | 4,280 | 8K | 6 semesters (SPR23-SPR26), campus photos/videos |
| **Back 2 School** | 2,493 | 513M | 2022-2025 annual events, partner logos |
| **FIRE RELIEF** | 2,361 | 1.6G | 2025 relief ops (largest), 2026 follow-up |
| **GIVING SEASON** | 1,425 | 20K | 2022-2024 holiday events, raw camera files |
| **OUTREACH EVENTS** | 1,178 | — | Food distro, yoga, LA Rams/Pepsi, focus groups |
| **YOGA BEACH CLEAN UP** | 739 | 1.6G | Coastal Care events, job-numbered folders |
| **TULSA** | 490 | — | Tulsa initiative, organized by photographer |
| **MIAMI** | 440 | — | Miami pop-up events, storage items |
| **SPECIAL EVENTS** | 187 | — | Workshops, career fairs, MLK parade, LA Clippers |
| **IBTU HQ** | 176 | — | Building renovation before/after/renderings |
| **lululemon Partnership** | 179 | 8K | Partnership outreach programming |
| **VOLUNTEER EVENTS** | 61 | 48M | Windsor event (05.02.2025) |
| **CONFERENCES** | 41 | — | CTSI 2023, Jennifer Hudson Show, SXSW 23 |
| **BRAND ASSETS** | 31 | 20K | Logos (PNG/SVG/PDF), silhouettes, fonts (OTF/TTF) |

**File types:** JPG (7,504), HEIC (2,654), MOV (1,248), JPEG (847), MP4 (285), camera RAW (121)

**Key note:** Many folders use job number naming (e.g., `PROG-S25-012-IBTU-Yoga-BeachCleanup-062525`) which maps directly to the Events CMS collection.

---

## NEXT STEPS

Once Molly reviews this document:
1. Confirm or override each ⚠️ reconciliation decision
2. Answer ❓ questions
3. I build Sanity schemas and seed with approved data
4. Wire website to Sanity
5. Push + deploy

---
title: "IBTU Email Sort Recap — Ready for Review"
date: 2026-04-03
type: email-organization
status: awaiting-approval
tags: [email, organization, kanban, operations, recap]
---

# IBTU Email Sort Recap
**Date:** April 3, 2026 (for morning review)
**Prepared by:** Claude (automated organization system)
**Status:** 🟡 Awaiting Molly's approval

---

## What Was Done

### 1. Folder Structure Created
All existing Google Drive folders have been moved to `z-old/` (nothing deleted). A new master structure was created:

```
My Drive/
├── IBTU-Operations/
│   ├── 01-Insurance-COI/          🔴
│   │   ├── 2024/
│   │   ├── 2025/
│   │   │   ├── B2S-25-Crenshaw-0801/
│   │   │   ├── B2S-25-Venice-0826/
│   │   │   ├── FR-25-EmergencyResponse-0108/
│   │   │   ├── FR-25-ReliefHub-0401/
│   │   │   ├── CC-25-001-0622/
│   │   │   └── ... (all 2025 events)
│   │   └── 2026/
│   │       ├── B2S-26-Miami-0725/
│   │       ├── B2S-26-Crenshaw-0801/
│   │       ├── CC-26-004-0214/
│   │       ├── YP-26-BaldwinHills-0308/
│   │       └── ... (all 2026 events)
│   ├── 02-Invoices/                🟠
│   │   └── {year}/{vendor}/
│   ├── 03-Contracts-Agreements/    ⚫
│   │   └── {year}/
│   ├── 04-Planning-Docs/           🟡
│   │   ├── back-2-school/{B2S-25, B2S-26}/
│   │   ├── fire-relief/{FR-25, FR-26}/
│   │   ├── youth-programming/{YP-25, YP-26}/
│   │   ├── coastal-care/{CC-25, CC-26}/
│   │   ├── wellness/{WL-25, WL-26}/
│   │   ├── giving-season/{GS-25, GS-26}/
│   │   └── community-health/{CH-25, CH-26}/
│   ├── 05-Sponsorship-Decks/       🟢
│   │   └── {year}/{org}/
│   ├── 06-Government-Permits/      🟣
│   │   └── {year}/
│   ├── 07-Vendor-Files/             🟤
│   │   └── {vendor-name}/
│   ├── 08-Media-Press/              🩷
│   │   └── {year}/
│   ├── 09-Donor-Communications/     🟢
│   │   └── {year}/{org}/
│   └── 10-Internal/                 ⚪
│       ├── board/
│       ├── finance/
│       ├── hr/
│       └── meeting-notes/
├── IBTU-Email-Attachments/
│   ├── by-person/{name}/
│   ├── by-org/{org-name}/
│   └── by-type/
│       ├── pdf/
│       ├── images/
│       ├── spreadsheets/
│       ├── documents/
│       ├── presentations/
│       └── other/
├── IBTU-Content-Library/            (existing — media assets)
└── z-old/                           (all previous folders, tagged)
    └── _folder-tags.json            (multi-tag manifest)
```

---

## Color System (Kanban Categories)

| Color | Hex | Category | Folder |
|---|---|---|---|
| 🔴 Red | `#FF4444` | Insurance / COI | `01-Insurance-COI` |
| 🟠 Orange | `#FF8C00` | Invoice / Billing | `02-Invoices` |
| ⚫ Black | `#000000` | Contracts / Urgent | `03-Contracts-Agreements` |
| 🟡 Gold | `#FFC700` | Planning / Logistics | `04-Planning-Docs` |
| 🟢 Green | `#4CAF50` | Sponsorship / Partnership | `05-Sponsorship-Decks` |
| 🟣 Purple | `#9C27B0` | Government / Permits | `06-Government-Permits` |
| 🟤 Brown | `#795548` | Vendor / Supplier | `07-Vendor-Files` |
| 🩷 Pink | `#FF69B4` | Media / Press | `08-Media-Press` |
| 🟢 Green | `#4CAF50` | Donor Communications | `09-Donor-Communications` |
| 🔵 Blue | `#2196F3` | Volunteer / School | `10-Internal` |
| ⚪ Grey | `#607D8B` | Internal / Team | `10-Internal` |

---

## Job Number Format (Updated)

**Format:** `DEPT-YY-SEQ-MMDD`

The date of the event is always at the end.

| Component | Description | Example |
|---|---|---|
| `DEPT` | Department code | B2S, FR, YP, CC, WL, GS, CH, OPS |
| `YY` | 2-digit year | 25, 26 |
| `SEQ` | 3-digit sequence (or short name) | 001, Crenshaw, Venice |
| `MMDD` | Event date (month + day) | 0801, 0222, 1223 |

### Department Codes

| Code | Program |
|---|---|
| B2S | Back 2 School Festival |
| FR | Fire Relief & The Hub |
| YP | Youth Programming |
| CC | Coastal Care |
| WL | Wellness |
| GS | Giving Season |
| CH | Community Health |
| OPS | Operations |
| ADM | Admin |
| FND | Fundraising |
| COM | Communications |

### Example Job Numbers (2026)

| Event | Job Number |
|---|---|
| 7th Annual B2S — Miami (Jul 25) | `B2S-26-Miami-0725` |
| 7th Annual B2S — Crenshaw (Aug 1) | `B2S-26-Crenshaw-0801` |
| Coastal Care #6 — Climate Week (Apr 11) | `CC-26-006-0411` |
| Lunchtime Takeover — Baldwin Hills (Apr 6) | `YP-26-BaldwinHills-0406` |
| Food Distribution — June (Jun 6) | `CH-26-FoodDist-0606` |
| Wellness — May (May 23) | `WL-26-001-0523` |

---

## z-old Migration

All existing Drive folders have been moved to `z-old/` — **nothing was deleted.**

Each folder in z-old is tagged with multiple metadata labels in `_folder-tags.json`:
- `project` — which program (B2S, FR, YP, CC, etc.)
- `year` — detected year
- `type` — document type (COI, Invoice, Planning, Media, etc.)
- `department` — org department (Programs, Finance, HR, Board, etc.)
- `org` — associated organization
- `status` — all set to "archived"

These tags let you search/filter old folders by any combination of project, year, type, or department.

---

## Attachment Organization

All email attachments are saved in **3 parallel views** (nothing duplicated, nothing deleted):

1. **By Person** — `IBTU-Email-Attachments/by-person/{sender-name}/`
   - Files named: `{date}_{original-filename}`
2. **By Organization** — `IBTU-Email-Attachments/by-org/{org-name}/`
   - Files named: `{date}_{original-filename}`
3. **By File Type** — `IBTU-Email-Attachments/by-type/{pdf|images|spreadsheets|...}/`
   - Files named: `{date}_{org}_{original-filename}`

Plus category-specific routing:
- **Insurance docs** → `01-Insurance-COI/{year}/{event-job-number}/`
- **Invoices** → `02-Invoices/{year}/{vendor}/`
- **Contracts** → `03-Contracts-Agreements/{year}/`
- **Planning docs** → `04-Planning-Docs/{program}/{project-code}/`

---

## Email Classification System

Emails are auto-classified using a scoring engine that checks:
- **Subject line** keywords (3 points each)
- **Sender domain** matching (4 points each)
- **Body content** keywords (2 points each)
- **Attachment filenames** (3 points each)

Confidence levels:
- **High** (score >= 6) — auto-sorted, no review needed
- **Medium** (score 3-5) — sorted with flag for spot-check
- **Low** (score < 3) — needs manual review

Gmail labels are auto-applied using the `IBTU/` prefix:
- `IBTU/Insurance-COI`
- `IBTU/Invoices-Billing`
- `IBTU/Planning-Logistics`
- `IBTU/Sponsorship`
- etc.

---

## How to Run

### Step 1: Deploy Gmail Export Script
1. Go to [script.google.com](https://script.google.com)
2. Create new project
3. Paste contents of `scripts/organize-emails-apps-script.gs`
4. Run `exportAndOrganizeEmails()`
5. Grant Gmail + Drive permissions

This will:
- Export all emails from the last 365 days
- Save all attachments to the organized Drive folders
- Apply Gmail labels by category
- Create `email-export.json` on Drive

### Step 2: Create Drive Folder Structure
```bash
npx tsx scripts/organize-drive-folders.ts --dry-run  # Preview first
npx tsx scripts/organize-drive-folders.ts             # Execute
```

### Step 3: Run Local Email Organizer (optional)
```bash
npx tsx scripts/organize-emails.ts --dry-run --since=2025-01-01
```

---

## Items Needing Your Review

### Approve / Deny

- [ ] **Folder structure** — Does the hierarchy make sense?
- [ ] **Color system** — Are the category-color mappings correct?
- [ ] **Job number format** — `DEPT-YY-SEQ-MMDD` with date at end — confirmed?
- [ ] **z-old approach** — Move all existing folders there, tag them, keep everything?
- [ ] **Gmail labels** — OK to auto-apply `IBTU/*` labels?
- [ ] **Daily trigger** — Want the Apps Script to run daily at 6 AM?
- [ ] **Attachment routing** — COIs to event folders, invoices to vendor folders — correct?

### Questions for Molly

1. Are there any folders in Drive that should NOT be moved to z-old?
2. Any additional email categories missing? (e.g., legal, board communications)
3. Should low-confidence emails go to a "review" folder or stay in inbox?
4. Any specific vendors/orgs that need custom routing rules?
5. Should the Apps Script also organize emails older than 1 year?

---

## Scripts Created

| File | Purpose |
|---|---|
| `scripts/organize-drive-folders.ts` | Creates master folder structure, migrates to z-old, tags old folders |
| `scripts/organize-emails.ts` | Classifies emails, routes attachments, generates summaries |
| `scripts/organize-emails-apps-script.gs` | Google Apps Script for Gmail export + auto-labeling |
| `scripts/email-sort-recap-2026-04-03.md` | This recap document |

---

*No files were deleted. All existing folders preserved in z-old/ with full tagging.*
*Job numbers use DEPT-YY-SEQ-MMDD format — event date always at the end.*

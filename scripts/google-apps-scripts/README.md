# IBTU Google Apps Scripts

All scripts are ready to paste into script.google.com. Each file has setup instructions at the top.

## Scripts

| # | File | What It Does | Trigger | Deploy From |
|---|------|-------------|---------|-------------|
| 01 | `../bloomerang/gmail-to-bloomerang-forwarding.gs` | Forwards sent emails to Bloomerang BCC for CRM logging | Hourly | script.google.com |
| 02 | `02-auto-label-emails.gs` | Labels inbox by project (B2S, Fire Relief, Finance, etc.) | Every 10 min | script.google.com |
| 03 | `03-form-to-calendar.gs` | Form submission → calendar event | On form submit | Form's script editor |
| 04 | `04-form-to-branded-doc.gs` | Form submission → branded doc from template | On form submit | Form's script editor |
| 05 | `05-weekly-report-email.gs` | Monday 8am summary email to leadership | Weekly Monday 8am | script.google.com |
| 06 | `06-finance-auto-forward.gs` | Auto-forwards finance emails to Rubi | Every 10 min | script.google.com |
| 07 | `07-volunteer-signup-handler.gs` | Signup → Google Group + orientation + welcome email | On form submit | Form's script editor |
| 08 | `08-mail-merge.gs` | Sheets data → personalized emails per row | Manual | script.google.com |
| 09 | `09-task-tracker.gs` | Task form → tracking sheet + overdue reminders | On submit + daily | Form's script editor |

## Deploy Order

1. **02** first (email labeling — immediate value, no dependencies)
2. **06** next (finance forwarding — requires finance@ Google Group to exist)
3. **01** (Bloomerang forwarder — set DRY_RUN = false when ready)
4. **05** (weekly report — requires Sheet IDs)
5. **03, 04, 07, 09** (form-based — deploy as forms are created)
6. **08** (mail merge — deploy when needed for campaigns)

## Configuration Required

Scripts marked YOUR_*_HERE need actual IDs before deploying:
- Google Sheet IDs (from the URL between /d/ and /edit)
- Google Doc template IDs
- Destination folder IDs
- Calendar IDs (use the ones from GOOGLE-WORKSPACE-PLAN.md)

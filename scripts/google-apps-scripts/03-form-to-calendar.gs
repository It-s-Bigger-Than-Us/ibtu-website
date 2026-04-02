/**
 * Form Submission → Auto-Create Google Calendar Event
 *
 * When someone submits a Google Form with event details,
 * this script auto-creates a calendar event.
 *
 * SETUP:
 * 1. Open your Google Form → Script Editor (Extensions → Apps Script)
 * 2. Paste this script
 * 3. Run "setupFormTrigger"
 * 4. The form must have these fields (exact question text):
 *    - "Event Name" (short answer)
 *    - "Event Date" (date)
 *    - "Start Time" (time)
 *    - "End Time" (time)
 *    - "Location" (short answer)
 *    - "Description" (paragraph) — optional
 *    - "Calendar" (dropdown: IBTU Events, School Program, Outreach, etc.)
 *
 * COST: $0
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

// Map form dropdown values to calendar IDs
// Replace these with your actual calendar IDs after creating the calendars
const CALENDAR_MAP = {
  "IBTU Events": "primary", // Replace with actual calendar ID
  "School Program": "c_aac7b2160ede773670b1edf7df76840ee6da3c52a678542eb02697b272d15195@group.calendar.google.com",
  "Outreach": "c_2cdef3623eea5c23dca5cb2ba04bd7356c54d0319d5ce3382332c2b781ca2694@group.calendar.google.com",
  "IBTU HQ": "c_9c4e1a7b683c1e3d45c6205bfb426d30d2528b87f5acfbad72d0ddf44caa9314@group.calendar.google.com",
  "Staff": "c_e1ff5315b1dfb8c44108fbfe4b0fb03b5c0bfc4b5edf6974fd645100f127ed0f@group.calendar.google.com",
  "Website Events": "c_5d6805632556531ca8830dd8311ad5e224badaaf3769c036b9f1663da630b03d@group.calendar.google.com",
  "Volunteer Shifts": "primary" // Replace after creating calendar
};

const DEFAULT_CALENDAR = "primary";

// ═══════════════════════════════════════
// MAIN — Triggered on form submit
// ═══════════════════════════════════════

function onFormSubmit(e) {
  const responses = e.response.getItemResponses();
  const data = {};

  for (const item of responses) {
    const title = item.getItem().getTitle();
    data[title] = item.getResponse();
  }

  const eventName = data["Event Name"] || "Untitled Event";
  const eventDate = data["Event Date"] || null;
  const startTime = data["Start Time"] || "09:00";
  const endTime = data["End Time"] || "17:00";
  const location = data["Location"] || "";
  const description = data["Description"] || "";
  const calendarName = data["Calendar"] || "";

  if (!eventDate) {
    Logger.log("No event date provided, skipping.");
    return;
  }

  // Parse date and times
  const startDateTime = new Date(eventDate + "T" + startTime + ":00");
  const endDateTime = new Date(eventDate + "T" + endTime + ":00");

  // Get calendar
  const calendarId = CALENDAR_MAP[calendarName] || DEFAULT_CALENDAR;
  const calendar = CalendarApp.getCalendarById(calendarId);

  if (!calendar) {
    Logger.log("Calendar not found: " + calendarId + ". Using default.");
    const defaultCal = CalendarApp.getDefaultCalendar();
    defaultCal.createEvent(eventName, startDateTime, endDateTime, {
      location: location,
      description: description + "\n\n[Auto-created from form submission]"
    });
  } else {
    calendar.createEvent(eventName, startDateTime, endDateTime, {
      location: location,
      description: description + "\n\n[Auto-created from form submission]"
    });
  }

  Logger.log("Created event: " + eventName + " on " + eventDate + " (" + calendarName + ")");
}

// ═══════════════════════════════════════
// SETUP
// ═══════════════════════════════════════

function setupFormTrigger() {
  const form = FormApp.getActiveForm();
  ScriptApp.newTrigger("onFormSubmit")
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log("Form submit trigger created.");
}

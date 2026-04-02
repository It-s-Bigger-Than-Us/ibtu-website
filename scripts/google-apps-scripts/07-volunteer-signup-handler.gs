/**
 * Volunteer Signup → Add to Google Group + Create Calendar Shift
 *
 * When someone submits the volunteer signup form:
 * 1. Adds their email to the volunteers@ Google Group
 * 2. Creates an orientation event on the Volunteer Shifts calendar
 * 3. Sends a confirmation email with the welcome guide link
 *
 * SETUP:
 * 1. Open your Volunteer Signup Google Form → Extensions → Apps Script → Paste this
 * 2. Update configuration below
 * 3. Run "setupFormTrigger"
 *
 * NOTE: Adding to Google Groups requires Admin SDK. You must:
 * - Enable Admin SDK in Apps Script (Resources → Advanced Google Services → Admin SDK → ON)
 * - Be a Workspace admin or have group management permissions
 *
 * COST: $0
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

const VOLUNTEER_GROUP_EMAIL = "volunteers@itsbiggerthanusla.org";
const VOLUNTEER_CALENDAR_ID = "primary"; // Replace with Volunteer Shifts calendar ID after creation
const WELCOME_GUIDE_URL = "https://drive.google.com/drive/folders/YOUR_VOLUNTEER_DOCS_FOLDER"; // Update with actual link

const ORIENTATION_DEFAULTS = {
  title: "IBTU Volunteer Orientation",
  duration: 60, // minutes
  location: "Baldwin Hills Crenshaw Plaza, Suite 224-226, 3650 W. Martin Luther King Jr. Blvd, Los Angeles, CA 90008",
  description: "Welcome to It's Bigger Than Us! This orientation will cover:\n" +
               "- Organization overview and mission\n" +
               "- Volunteer roles and expectations\n" +
               "- Safety and compliance guidelines\n" +
               "- Hub tour\n" +
               "- Q&A\n\n" +
               "Please review the Welcome Guide before attending:\n"
};

// ═══════════════════════════════════════
// MAIN — Triggered on form submit
// ═══════════════════════════════════════

function onVolunteerSignup(e) {
  const responses = e.response.getItemResponses();
  const data = {};

  for (const item of responses) {
    const title = item.getItem().getTitle();
    data[title] = item.getResponse();
  }

  const name = data["Full Name"] || data["Name"] || "Volunteer";
  const email = data["Email"] || data["Email Address"] || "";
  const phone = data["Phone"] || data["Phone Number"] || "";
  const interest = data["Areas of Interest"] || data["How would you like to help?"] || "";

  if (!email) {
    Logger.log("No email provided, skipping.");
    return;
  }

  // 1. Add to Google Group
  try {
    AdminDirectory.Members.insert({
      email: email,
      role: "MEMBER"
    }, VOLUNTEER_GROUP_EMAIL);
    Logger.log("Added " + email + " to " + VOLUNTEER_GROUP_EMAIL);
  } catch (err) {
    if (err.message.includes("Member already exists")) {
      Logger.log(email + " already in group.");
    } else {
      Logger.log("Could not add to group: " + err.message);
    }
  }

  // 2. Create orientation event (next available Saturday at 10am)
  try {
    const nextSaturday = getNextSaturday();
    const startTime = new Date(nextSaturday);
    startTime.setHours(10, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + ORIENTATION_DEFAULTS.duration);

    const calendar = CalendarApp.getCalendarById(VOLUNTEER_CALENDAR_ID);
    if (calendar) {
      calendar.createEvent(
        ORIENTATION_DEFAULTS.title + " — " + name,
        startTime,
        endTime,
        {
          location: ORIENTATION_DEFAULTS.location,
          description: ORIENTATION_DEFAULTS.description + WELCOME_GUIDE_URL,
          guests: email,
          sendInvites: true
        }
      );
      Logger.log("Created orientation for " + name + " on " + startTime);
    }
  } catch (err) {
    Logger.log("Could not create calendar event: " + err.message);
  }

  // 3. Send confirmation email
  try {
    const subject = "Welcome to It's Bigger Than Us, " + name.split(" ")[0] + "!";
    const body = "Hi " + name.split(" ")[0] + ",\n\n" +
                 "Thank you for signing up to volunteer with It's Bigger Than Us!\n\n" +
                 "Here's what happens next:\n" +
                 "1. You'll receive a calendar invite for your orientation\n" +
                 "2. Please review our Welcome Guide: " + WELCOME_GUIDE_URL + "\n" +
                 "3. We'll match you with a shift and a buddy for your first event\n\n" +
                 "If you have questions, reply to this email or reach out to volunteers@itsbiggerthanusla.org.\n\n" +
                 "Community is the infrastructure.\n\n" +
                 "— The IBTU Team\n" +
                 "It's Bigger Than Us\n" +
                 "(323) 207-0221";

    GmailApp.sendEmail(email, subject, body, {
      name: "It's Bigger Than Us",
      replyTo: "volunteers@itsbiggerthanusla.org"
    });
    Logger.log("Confirmation email sent to " + email);
  } catch (err) {
    Logger.log("Could not send confirmation: " + err.message);
  }

  // 4. Notify Molly
  GmailApp.sendEmail("molly@itsbiggerthanusla.org",
    "New Volunteer Signup: " + name,
    "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nInterests: " + interest);
}

// ═══════════════════════════════════════
// HELPER — Get next Saturday
// ═══════════════════════════════════════

function getNextSaturday() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 6=Sat
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7; // At least 7 days out
  const nextSat = new Date(today);
  nextSat.setDate(today.getDate() + daysUntilSaturday);
  return nextSat;
}

// ═══════════════════════════════════════
// SETUP
// ═══════════════════════════════════════

function setupFormTrigger() {
  const form = FormApp.getActiveForm();
  ScriptApp.newTrigger("onVolunteerSignup")
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log("Volunteer signup trigger created.");
}

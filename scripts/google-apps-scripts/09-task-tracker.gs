/**
 * Task Tracking — Form Submissions + Overdue Reminders
 *
 * Captures tasks from a Google Form, logs them to a tracking Sheet,
 * and sends daily reminders for overdue items.
 *
 * SETUP:
 * 1. Create a Google Form with: Task Name, Assigned To, Due Date, Priority, Description
 * 2. Create a Google Sheet for task tracking (or use the form's linked sheet)
 * 3. Update IDs below
 * 4. Open the form → Extensions → Apps Script → Paste this
 * 5. Run "setupTriggers"
 *
 * COST: $0
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

const TASK_SHEET_ID = "YOUR_SHEET_ID_HERE";
const TASK_SHEET_NAME = "Tasks";

// Team email map (form "Assigned To" value → email)
const TEAM_EMAILS = {
  "Molly": "molly@itsbiggerthanusla.org",
  "Ty": "tyrone@itsbiggerthanusla.org",
  "Courtney": "cwright@itsbiggerthanusla.org",
  "Danielle": "danielle@itsbiggerthanusla.org",
  "Rubi": "finance@itsbiggerthanusla.org"
};

const REMINDER_HOUR = 8; // 8am PT

// ═══════════════════════════════════════
// ON FORM SUBMIT — Log task to sheet
// ═══════════════════════════════════════

function onTaskSubmit(e) {
  const responses = e.response.getItemResponses();
  const data = {};

  for (const item of responses) {
    data[item.getItem().getTitle()] = item.getResponse();
  }

  const taskName = data["Task Name"] || "Untitled";
  const assignedTo = data["Assigned To"] || "";
  const dueDate = data["Due Date"] || "";
  const priority = data["Priority"] || "Normal";
  const description = data["Description"] || "";

  // Log to sheet
  const ss = SpreadsheetApp.openById(TASK_SHEET_ID);
  let sheet = ss.getSheetByName(TASK_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(TASK_SHEET_NAME);
    sheet.appendRow(["Task", "Assigned To", "Due Date", "Priority", "Description", "Status", "Created", "Completed"]);
  }

  sheet.appendRow([
    taskName,
    assignedTo,
    dueDate,
    priority,
    description,
    "Open",
    new Date(),
    ""
  ]);

  // Notify assignee
  const email = TEAM_EMAILS[assignedTo];
  if (email) {
    GmailApp.sendEmail(email,
      "New Task Assigned: " + taskName,
      "You've been assigned a new task:\n\n" +
      "Task: " + taskName + "\n" +
      "Due: " + dueDate + "\n" +
      "Priority: " + priority + "\n" +
      "Description: " + description + "\n\n" +
      "Track all tasks: https://docs.google.com/spreadsheets/d/" + TASK_SHEET_ID,
      { name: "IBTU Task Tracker" }
    );
    Logger.log("Notified " + assignedTo + " (" + email + ") about: " + taskName);
  }
}

// ═══════════════════════════════════════
// DAILY — Send overdue reminders
// ═══════════════════════════════════════

function sendOverdueReminders() {
  const ss = SpreadsheetApp.openById(TASK_SHEET_ID);
  const sheet = ss.getSheetByName(TASK_SHEET_NAME);

  if (!sheet) {
    Logger.log("No Tasks sheet found.");
    return;
  }

  const data = sheet.getDataRange().getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueByPerson = {};

  for (let i = 1; i < data.length; i++) {
    const task = data[i][0];
    const assignedTo = data[i][1];
    const dueDate = new Date(data[i][2]);
    const status = data[i][5];

    if (status === "Open" && dueDate < today) {
      if (!overdueByPerson[assignedTo]) {
        overdueByPerson[assignedTo] = [];
      }
      overdueByPerson[assignedTo].push({
        task: task,
        dueDate: Utilities.formatDate(dueDate, "America/Los_Angeles", "MM/dd/yyyy"),
        daysOverdue: Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
      });
    }
  }

  for (const [person, tasks] of Object.entries(overdueByPerson)) {
    const email = TEAM_EMAILS[person];
    if (!email) continue;

    let body = "You have " + tasks.length + " overdue task(s):\n\n";
    for (const t of tasks) {
      body += "- " + t.task + " (due " + t.dueDate + ", " + t.daysOverdue + " days overdue)\n";
    }
    body += "\nTrack all tasks: https://docs.google.com/spreadsheets/d/" + TASK_SHEET_ID;

    GmailApp.sendEmail(email,
      "Overdue Tasks Reminder (" + tasks.length + " items)",
      body,
      { name: "IBTU Task Tracker" }
    );

    Logger.log("Sent overdue reminder to " + person + ": " + tasks.length + " tasks");
  }

  // Also send summary to leadership
  let summaryBody = "Overdue tasks summary:\n\n";
  let totalOverdue = 0;
  for (const [person, tasks] of Object.entries(overdueByPerson)) {
    summaryBody += person + ": " + tasks.length + " overdue\n";
    for (const t of tasks) {
      summaryBody += "  - " + t.task + " (" + t.daysOverdue + " days)\n";
    }
    totalOverdue += tasks.length;
  }

  if (totalOverdue > 0) {
    GmailApp.sendEmail("molly@itsbiggerthanusla.org",
      "IBTU Overdue Tasks: " + totalOverdue + " items",
      summaryBody,
      { name: "IBTU Task Tracker" }
    );
  }
}

// ═══════════════════════════════════════
// SETUP
// ═══════════════════════════════════════

function setupTriggers() {
  // Remove existing
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }

  // Form submit trigger (run from inside the form's script editor)
  try {
    const form = FormApp.getActiveForm();
    ScriptApp.newTrigger("onTaskSubmit")
      .forForm(form)
      .onFormSubmit()
      .create();
    Logger.log("Form submit trigger created.");
  } catch (err) {
    Logger.log("Not running from a form — skip form trigger. Error: " + err.message);
  }

  // Daily overdue check at 8am
  ScriptApp.newTrigger("sendOverdueReminders")
    .timeBased()
    .atHour(REMINDER_HOUR)
    .everyDays(1)
    .create();

  Logger.log("Daily overdue reminder trigger set: " + REMINDER_HOUR + "am");
}

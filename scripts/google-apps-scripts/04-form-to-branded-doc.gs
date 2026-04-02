/**
 * Form Submission → Auto-Generate Branded Doc from Template
 *
 * When a Google Form is submitted, copies a branded template,
 * fills in fields from the form response, and saves to the correct drive.
 *
 * SETUP:
 * 1. Create your branded Google Doc template with placeholders like {{Name}}, {{Date}}, etc.
 * 2. Note the template's file ID (from the URL)
 * 3. Note the destination folder ID
 * 4. Open your Google Form → Extensions → Apps Script → Paste this
 * 5. Update TEMPLATE_ID and DESTINATION_FOLDER_ID below
 * 6. Run "setupFormTrigger"
 *
 * COST: $0
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

const TEMPLATE_ID = "YOUR_TEMPLATE_FILE_ID_HERE"; // Google Doc template ID
const DESTINATION_FOLDER_ID = "YOUR_FOLDER_ID_HERE"; // Where generated docs go

// Map form question titles to template placeholders
// Template should have {{placeholder}} markers
const FIELD_MAP = {
  "School Name": "{{School Name}}",
  "Contact Name": "{{Contact Name}}",
  "Contact Email": "{{Contact Email}}",
  "Phone": "{{Phone}}",
  "Program": "{{Program}}",
  "Number of Students": "{{Students}}",
  "Requested Date": "{{Date}}",
  "Notes": "{{Notes}}"
};

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

  // Copy template
  const template = DriveApp.getFileById(TEMPLATE_ID);
  const folder = DriveApp.getFolderById(DESTINATION_FOLDER_ID);

  const docName = (data["School Name"] || "Unknown") + " — " +
                  (data["Program"] || "Quote") + " — " +
                  Utilities.formatDate(new Date(), "America/Los_Angeles", "yyyy-MM-dd");

  const copy = template.makeCopy(docName, folder);
  const doc = DocumentApp.openById(copy.getId());
  const body = doc.getBody();

  // Replace all placeholders
  for (const [formField, placeholder] of Object.entries(FIELD_MAP)) {
    const value = data[formField] || "";
    body.replaceText(placeholder.replace(/[{}]/g, "\\$&"), value);
  }

  // Add generation timestamp
  body.replaceText("\\{\\{Generated\\}\\}",
    Utilities.formatDate(new Date(), "America/Los_Angeles", "MMMM d, yyyy 'at' h:mm a"));

  doc.saveAndClose();

  Logger.log("Generated doc: " + docName);
  Logger.log("URL: " + copy.getUrl());

  // Send notification email
  const recipient = "molly@itsbiggerthanusla.org";
  const subject = "New form submission: " + (data["School Name"] || "Unknown");
  const emailBody = "A new form was submitted and a branded doc was auto-generated.\n\n" +
                    "School: " + (data["School Name"] || "N/A") + "\n" +
                    "Program: " + (data["Program"] || "N/A") + "\n" +
                    "Contact: " + (data["Contact Name"] || "N/A") + "\n\n" +
                    "Doc: " + copy.getUrl();

  GmailApp.sendEmail(recipient, subject, emailBody);
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

  Logger.log("Form submit trigger created for branded doc generation.");
}

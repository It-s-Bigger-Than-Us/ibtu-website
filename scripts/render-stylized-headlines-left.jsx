#target photoshop
// Left-justified variant: sacred phrases split into individual lines +
// keyword headlines, in both chrome templates, both fonts, 1-line + stacked.
// Stacked variants use TIGHT leading (~0.82 of font size) to match Molly's
// reference screenshot where "WE / LISTEN." stacks with lines nearly touching.
//
// Output: 06-Stylized-Headlines/left-justified/

function log(msg) {
  var f = new File("/tmp/render-log.txt");
  f.open("a"); f.write(msg + "\n"); f.close();
}
function esc(s) { return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'\\r'); }

(new File("/tmp/render-log.txt")).remove();
log("=== start " + new Date() + " ===");

var OUT_DIR = "/Users/mollymorrow/Documents/Obsidian Vault/Brand/Claude Design Hand-Off/06-Stylized-Headlines/left-justified/";
var outFolder = new Folder(OUT_DIR);
if (!outFolder.exists) outFolder.create();

var TEMPLATES = [
  { id: "t1-trippy", file: "/Users/mollymorrow/Downloads/AdobeStock_1114143662.psdt", defaultSize: 64.41, defaultFitChars: 6 },
  { id: "t2-chrome", file: "/Users/mollymorrow/Downloads/AdobeStock_1744256899.psdt", defaultSize: 55.92, defaultFitChars: 6 }
];

// Sacred-phrase splits + new keyword headlines.
// oneLine = single horizontal row; stacked = '\r'-separated rows with tight leading.
var PHRASES = [
  // sacred phrases (existing, redone left-justified)
  { id: "community",            oneLine: "COMMUNITY IS THE INFRASTRUCTURE.", stacked: "COMMUNITY\rIS THE\rINFRASTRUCTURE." },
  { id: "dignity",              oneLine: "DESIGNED WITH DIGNITY.",            stacked: "DESIGNED\rWITH\rDIGNITY." },
  // "We listen, we build, we stay." broken into individual statements
  { id: "we-listen",            oneLine: "WE LISTEN.",                        stacked: "WE\rLISTEN." },
  { id: "we-build",             oneLine: "WE BUILD.",                         stacked: "WE\rBUILD." },
  { id: "we-stay",              oneLine: "WE STAY.",                          stacked: "WE\rSTAY." },
  // section / nav headlines
  { id: "how-we-work",          oneLine: "HOW WE WORK",                       stacked: "HOW\rWE\rWORK" },
  { id: "our-mission",          oneLine: "OUR MISSION",                       stacked: "OUR\rMISSION" },
  // single-word labels — only 1line variant (stacking a single word is pointless)
  { id: "volunteer",            oneLine: "VOLUNTEER",                         stacked: null },
  { id: "ibtu",                 oneLine: "IBTU",                              stacked: null },
  { id: "wellness",             oneLine: "WELLNESS",                          stacked: null },
  // brand statements + program names
  { id: "its-bigger-than-us",   oneLine: "IT'S BIGGER THAN US",               stacked: "IT'S\rBIGGER\rTHAN US" },
  { id: "community-clean-ups",  oneLine: "COMMUNITY CLEAN UPS",               stacked: "COMMUNITY\rCLEAN UPS" },
  { id: "community-wellness",   oneLine: "COMMUNITY WELLNESS",                stacked: "COMMUNITY\rWELLNESS" },
  // hyphenated principles
  { id: "place-based",          oneLine: "PLACE-BASED.",                      stacked: "PLACE-\rBASED." },
  { id: "whole-system",         oneLine: "WHOLE-SYSTEM.",                     stacked: "WHOLE-\rSYSTEM." },
  { id: "trust-compounds",      oneLine: "TRUST COMPOUNDS.",                  stacked: "TRUST\rCOMPOUNDS." },
  // partnership has TWO stacking patterns Molly requested
  { id: "partnership-3stack",   oneLine: "PARTNERSHIP IS OUR SUPERPOWER.",    stacked: "PARTNERSHIP\rIS OUR\rSUPERPOWER." },
  { id: "partnership-2stack",   oneLine: null,                                stacked: "PARTNERSHIP IS\rOUR SUPERPOWER." },
  // sentence-case anniversary phrase (kept as-typed, not all-caps)
  { id: "six-years-in",         oneLine: "Six years in. Still listening. Still building.", stacked: "Six years in.\rStill listening.\rStill building." }
];

var FONTS = [
  { id: "lot",     ps: "Lot" },
  { id: "poppins", ps: "Poppins-Black" }
];

var LAYOUTS = ["1line", "stacked"];

// Tight leading ratio for stacked text (0.82 ≈ lines almost touching).
var LEADING_RATIO = 0.82;
// Left margin from canvas edge.
var LEFT_MARGIN_PX = 350;

function pickText(phrase, layout) {
  return layout === "1line" ? phrase.oneLine : phrase.stacked;
}

function maxLineLength(text) {
  var lines = text.split('\r');
  var max = 0;
  for (var i = 0; i < lines.length; i++) if (lines[i].length > max) max = lines[i].length;
  return max;
}

function computeFontSize(template, text) {
  var maxLen = maxLineLength(text);
  if (maxLen <= template.defaultFitChars) return template.defaultSize;
  var scaled = template.defaultSize * (template.defaultFitChars / maxLen);
  var floor = template.defaultSize * 0.25;
  return scaled < floor ? floor : scaled;
}

function findEditContentLayer(doc) {
  for (var i = 0; i < doc.layers.length; i++) {
    if (doc.layers[i].name === "Edit Content") return doc.layers[i];
  }
  return null;
}

function findInnerTextLayer(doc) {
  for (var i = 0; i < doc.layers.length; i++) {
    var L = doc.layers[i];
    if (L.typename === "ArtLayer" && L.kind === LayerKind.TEXT && L.name === "Your Text Here") return L;
  }
  return null;
}

// Hide template background fill + texture-on-bg layers so the export PNG is
// transparent behind the chrome text. Recurses into LayerSets because the
// Texture layer is nested inside the "Adjustments" group.
// We close the doc without saving, so this mutation never touches the .psdt.
function hideBackgrounds(doc) {
  var BG_NAMES = ["Background", "Color", "Texture"];
  function walk(group) {
    for (var i = 0; i < group.layers.length; i++) {
      var L = group.layers[i];
      for (var n = 0; n < BG_NAMES.length; n++) {
        if (L.name === BG_NAMES[n]) {
          try { L.visible = false; } catch (e) {}
        }
      }
      if (L.typename === "LayerSet") walk(L);
    }
  }
  walk(doc);
}

function exportPng(doc, outPath) {
  var opts = new ExportOptionsSaveForWeb();
  opts.format = SaveDocumentType.PNG;
  opts.PNG8 = false;
  opts.transparency = true;
  opts.interlaced = false;
  doc.exportDocument(new File(outPath), ExportType.SAVEFORWEB, opts);
}

function renderOne(template, phrase, font, layout) {
  var text = pickText(phrase, layout);
  if (text === null) return; // layout deliberately skipped for this phrase
  var outPath = OUT_DIR + template.id + "__" + phrase.id + "__" + font.id + "__" + layout + ".png";

  // Idempotency: skip if already rendered. Delete the .png to force re-render.
  if (new File(outPath).exists) { log("  skip (exists): " + outPath); return; }

  log("\n-> " + template.id + " | " + phrase.id + " | " + font.id + " | " + layout);

  var outer = app.open(new File(template.file));
  var so = findEditContentLayer(outer);
  if (!so) { log("  !no SO"); outer.close(SaveOptions.DONOTSAVECHANGES); return; }
  outer.activeLayer = so;
  executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);
  var inner = app.activeDocument;
  var textLayer = findInnerTextLayer(inner);
  if (!textLayer) { log("  !no text"); inner.close(SaveOptions.DONOTSAVECHANGES); outer.close(SaveOptions.DONOTSAVECHANGES); return; }

  var newSize = computeFontSize(template, text);
  textLayer.textItem.contents = text;
  try {
    textLayer.textItem.font = font.ps;
    if (String(textLayer.textItem.font) !== font.ps) log("  !! font rejected: got " + textLayer.textItem.font);
  } catch (e) { log("  font err: " + e); }
  try { textLayer.textItem.justification = Justification.LEFT; } catch (e) {}
  try { textLayer.textItem.size = new UnitValue(newSize, "pt"); } catch (e) {}

  // Tight leading on stacked variants.
  if (layout === "stacked") {
    try {
      textLayer.textItem.useAutoLeading = false;
      textLayer.textItem.leading = new UnitValue(newSize * LEADING_RATIO, "pt");
      log("  tight leading " + (newSize * LEADING_RATIO).toFixed(2) + "pt");
    } catch (e) { log("  leading err: " + e); }
  } else {
    try { textLayer.textItem.useAutoLeading = true; } catch (e) {}
  }

  // Position: left edge at LEFT_MARGIN_PX, vertically centered in canvas.
  try {
    var b = textLayer.bounds;
    var leftX = b[0].value;
    var midY = (b[1].value + b[3].value) / 2;
    var docMidY = inner.height.value / 2;
    var dx = LEFT_MARGIN_PX - leftX;
    var dy = docMidY - midY;
    textLayer.translate(new UnitValue(dx, "px"), new UnitValue(dy, "px"));
    log("  positioned Δ(" + dx.toFixed(0) + ", " + dy.toFixed(0) + ")");
  } catch (e) { log("  position err: " + e); }

  inner.save();
  inner.close(SaveOptions.DONOTSAVECHANGES);
  // NOTE: don't hideBackgrounds() — the chrome blend modes need the dark base
  // to compose. We post-process the rendered PNGs to transparent in a separate
  // pass via scripts/make-headlines-transparent.sh (ffmpeg luminance-to-alpha).
  exportPng(outer, outPath);
  log("  exported " + outPath);
  outer.close(SaveOptions.DONOTSAVECHANGES);
}

try {
  for (var t = 0; t < TEMPLATES.length; t++) {
    for (var p = 0; p < PHRASES.length; p++) {
      for (var fi = 0; fi < FONTS.length; fi++) {
        for (var l = 0; l < LAYOUTS.length; l++) {
          try { renderOne(TEMPLATES[t], PHRASES[p], FONTS[fi], LAYOUTS[l]); }
          catch (e) { log("RENDER ERR: " + e); }
        }
      }
    }
  }
  log("=== done ===");
} catch (e) {
  log("FATAL: " + e + " line " + e.line);
}

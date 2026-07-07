#target photoshop
// Render sacred-phrase variants through two Adobe Stock chrome templates.
// One render per (template × phrase × font × layout).
//
// Inner text layer is always named "Your Text Here". Modify its contents +
// font, save the inner .psb, then export the outer .psdt as PNG.

function log(msg) {
  var f = new File("/tmp/render-log.txt");
  f.open("a"); f.write(msg + "\n"); f.close();
}
function esc(s) { return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'\\r'); }

(new File("/tmp/render-log.txt")).remove();
log("=== start " + new Date() + " ===");

var OUT_DIR = "/Users/mollymorrow/Documents/Obsidian Vault/Brand/Claude Design Hand-Off/06-Stylized-Headlines/";
var outFolder = new Folder(OUT_DIR);
if (!outFolder.exists) outFolder.create();

var TEMPLATES = [
  // defaultSize = original point size as inspected in the template's inner .psb
  // defaultFitChars = approx longest-line length the template was designed for
  { id: "t1-trippy", file: "/Users/mollymorrow/Downloads/AdobeStock_1114143662.psdt", defaultSize: 64.41, defaultFitChars: 6 },
  { id: "t2-chrome", file: "/Users/mollymorrow/Downloads/AdobeStock_1744256899.psdt", defaultSize: 55.92, defaultFitChars: 6 }
];

var PHRASES = [
  { id: "community",  oneLine: "COMMUNITY IS THE INFRASTRUCTURE.", stacked: "COMMUNITY\rIS THE\rINFRASTRUCTURE." },
  { id: "dignity",    oneLine: "DESIGNED WITH DIGNITY.",            stacked: "DESIGNED\rWITH\rDIGNITY." },
  { id: "listen",     oneLine: "WE LISTEN, WE BUILD, WE STAY.",     stacked: "WE LISTEN,\rWE BUILD,\rWE STAY." }
];

var FONTS = [
  { id: "lot",     ps: "Lot" },          // verified via app.fonts lookup
  { id: "poppins", ps: "Poppins-Black" } // verified via app.fonts lookup
];

var LAYOUTS = ["1line", "square"];

// Test-mode toggle: set to true to render only one variant for verification.
var TEST_MODE = false;

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
  // Scale down inversely to length; never go below 25% of original (chrome bevel needs mass).
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

function savePsbAndClose(innerDoc) {
  // Smart object inner doc — save without dialog, then close.
  // Save with default options (PSB).
  innerDoc.save();
  innerDoc.close(SaveOptions.DONOTSAVECHANGES);
}

// Hide template background fill + texture-on-bg layers so the export PNG is
// transparent behind the chrome text. Recurses into LayerSets because the
// Texture layer is nested inside the "Adjustments" group.
// Doc closes without saving so the original .psdt isn't mutated.
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
  var outPath = OUT_DIR + template.id + "__" + phrase.id + "__" + font.id + "__" + layout + ".png";

  log("\n-> " + template.id + " | " + phrase.id + " | " + font.id + " | " + layout);

  var outer = app.open(new File(template.file));
  log("  opened outer " + outer.name);
  var so = findEditContentLayer(outer);
  if (!so) { log("  !no Edit Content layer"); outer.close(SaveOptions.DONOTSAVECHANGES); return; }
  outer.activeLayer = so;
  executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);
  var inner = app.activeDocument;
  log("  opened inner " + inner.name);
  var textLayer = findInnerTextLayer(inner);
  if (!textLayer) { log("  !no Your Text Here layer"); inner.close(SaveOptions.DONOTSAVECHANGES); outer.close(SaveOptions.DONOTSAVECHANGES); return; }
  // Update text + font + size
  var newSize = computeFontSize(template, text);
  textLayer.textItem.contents = text;
  try {
    textLayer.textItem.font = font.ps;
    var actualFont = String(textLayer.textItem.font);
    if (actualFont !== font.ps) {
      log("  !! font swap silently rejected: wanted '" + font.ps + "', got '" + actualFont + "'");
    } else {
      log("  set font " + font.ps);
    }
  } catch (e) { log("  font set failed hard: " + e); }
  try { textLayer.textItem.justification = Justification.CENTER; } catch (e) {}
  try {
    textLayer.textItem.size = new UnitValue(newSize, "pt");
    log("  set size " + newSize.toFixed(2) + "pt (default " + template.defaultSize + ")");
  } catch (e) { log("  size set failed: " + e); }

  // Re-center the text layer in the inner doc canvas so the chrome treatment
  // (which follows the smart object content position) lands centered too.
  try {
    var b = textLayer.bounds;
    var cx = (b[0].value + b[2].value) / 2;
    var cy = (b[1].value + b[3].value) / 2;
    var docCx = inner.width.value / 2;
    var docCy = inner.height.value / 2;
    textLayer.translate(new UnitValue(docCx - cx, "px"), new UnitValue(docCy - cy, "px"));
    log("  centered Δ(" + (docCx - cx).toFixed(0) + ", " + (docCy - cy).toFixed(0) + ")");
  } catch (e) { log("  center failed: " + e); }
  savePsbAndClose(inner);
  log("  saved inner, back at outer");
  // NOTE: don't hideBackgrounds() — the chrome blend modes need the dark base
  // to compose. We post-process the rendered PNGs to transparent in a separate
  // pass via scripts/make-headlines-transparent.sh (ffmpeg luminance-to-alpha).
  exportPng(outer, outPath);
  log("  exported " + outPath);
  outer.close(SaveOptions.DONOTSAVECHANGES);
}

try {
  if (TEST_MODE) {
    renderOne(TEMPLATES[0], PHRASES[0], FONTS[0], "1line");
  } else {
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
  }
  log("=== done ===");
} catch (e) {
  log("FATAL: " + e + " line " + e.line);
}

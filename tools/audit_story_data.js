const fs = require("node:fs");
const path = require("node:path");
const LZString = require("lz-string");

const root = path.resolve(__dirname, "..");
const dataRoot = path.join(root, "src", "data");

function parseDefaultModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8").trim();
  const prefix = "export default ";
  if (!source.startsWith(prefix)) {
    throw new Error(`unexpected module format: ${filePath}`);
  }
  return JSON.parse(source.slice(prefix.length).replace(/;$/, ""));
}

function splitBlob(blob) {
  return String(blob).split("\n").filter(Boolean);
}

const sceneIds = [
  "park",
  "cafe",
  "cinema",
  "seaside",
  "market",
  "bookstore",
  "busstop",
  "mall",
  "home",
  "riverside"
];
const outdoorScenes = ["park", "seaside", "market", "busstop", "riverside"];
const allLines = [];
const sceneReports = [];

for (const sceneId of sceneIds) {
  const scene = parseDefaultModule(path.join(dataRoot, "scenes", `${sceneId}.js`));
  const contentLines = [];
  for (const [actionId, blob] of Object.entries(scene.pools)) {
    const lines = splitBlob(blob);
    if (lines.length !== 150) {
      throw new Error(`${sceneId}/${actionId} expected 150 lines, got ${lines.length}`);
    }
    contentLines.push(...lines);
  }
  const ambient = splitBlob(scene.ambient);
  const transitions = splitBlob(scene.transitions);
  if (ambient.length !== 500 || transitions.length !== 10) {
    throw new Error(`${sceneId} has invalid ambient/transition counts`);
  }
  if (contentLines.length + ambient.length !== 5000) {
    throw new Error(
      `${sceneId} expected 5000 content lines, got ${contentLines.length + ambient.length}`
    );
  }
  contentLines.push(...ambient);
  const toneLines = [];
  for (const [band, blob] of Object.entries(scene.tones)) {
    const lines = splitBlob(blob);
    if (lines.length !== 560) {
      throw new Error(`${sceneId}/${band} expected 560 tone lines, got ${lines.length}`);
    }
    toneLines.push(...lines);
  }
  const sceneLines = contentLines.concat(toneLines, transitions);
  if (!outdoorScenes.includes(sceneId)) {
    const outdoorLeaks = sceneLines.filter((line) =>
      /晚风|夜风|街声|雨后的光|风把/.test(line)
    );
    if (outdoorLeaks.length > 0) {
      throw new Error(`${sceneId} has outdoor wording indoors: ${outdoorLeaks.slice(0, 3).join(" | ")}`);
    }
  }
  allLines.push(...sceneLines);
  sceneReports.push({
    id: sceneId,
    pools: Object.keys(scene.pools).length,
    actions: contentLines.length - ambient.length,
    ambient: ambient.length,
    transitions: transitions.length,
    tones: toneLines.length
  });
}

const hotel = parseDefaultModule(path.join(dataRoot, "hotel.js"));
let hotelCount = splitBlob(hotel.ambient).length;
for (const [actionId, blob] of Object.entries(hotel.pools)) {
  const lines = splitBlob(blob);
  if (lines.length !== 65) {
    throw new Error(`hotel/${actionId} expected 65 lines, got ${lines.length}`);
  }
  hotelCount += lines.length;
  allLines.push(...lines);
}
if (hotelCount !== 2000) {
  throw new Error(`hotel expected 2000 lines, got ${hotelCount}`);
}
allLines.push(...splitBlob(hotel.ambient));

const night = parseDefaultModule(path.join(dataRoot, "night.js"));
let nightCount = 0;
for (const outcome of night.outcomes) {
  nightCount += outcome.lines.length;
  allLines.push(...outcome.lines);
  if (outcome.rejectionLines) {
    nightCount += outcome.rejectionLines.length;
    allLines.push(...outcome.rejectionLines);
  }
}
if (nightCount !== 50) {
  throw new Error(`night expected 50 lines, got ${nightCount}`);
}

const reactionRaw = parseDefaultModule(path.join(dataRoot, "reaction_page.js"));
const reaction = JSON.parse(LZString.decompressFromEncodedURIComponent(reactionRaw));
if (reaction.version !== 1 || reaction.ids.length !== 10) {
  throw new Error("reaction data has an invalid shape");
}
let reactionCount = 0;
for (const actionPools of reaction.pools) {
  if (actionPools.length !== reaction.bands.length) {
    throw new Error("reaction action has an invalid tone-band count");
  }
  for (const pool of actionPools) {
    if (pool.length !== 35) {
      throw new Error(`reaction pool expected 35 lines, got ${pool.length}`);
    }
    reactionCount += pool.length;
    allLines.push(...pool);
  }
}
if (reactionCount !== 1050) {
  throw new Error(`reaction expected 1050 lines, got ${reactionCount}`);
}

if (allLines.length !== 70000) {
  throw new Error(`runtime data expected 70000 lines, got ${allLines.length}`);
}

const duplicateMap = new Map();
for (const line of allLines) {
  duplicateMap.set(line, (duplicateMap.get(line) || 0) + 1);
}
const duplicates = [...duplicateMap].filter(([, count]) => count > 1);
const thirdPersonLeaks = allLines.filter((line) => line.includes("她"));
const unresolvedPatterns = allLines.filter((line) => /[{}]|undefined|null/.test(line));
const malformedPunctuation = allLines.filter((line) => /。{2}|，{2}|你你|我我/.test(line));

if (duplicates.length || thirdPersonLeaks.length || unresolvedPatterns.length || malformedPunctuation.length) {
  throw new Error("audit failed", {
    cause: {
      duplicates: duplicates.slice(0, 5),
      thirdPersonLeaks: thirdPersonLeaks.slice(0, 5),
      unresolvedPatterns: unresolvedPatterns.slice(0, 5),
      malformedPunctuation: malformedPunctuation.slice(0, 5)
    }
  });
}

console.log(JSON.stringify({
  total: allLines.length,
  scenes: sceneReports,
  hotel: hotelCount,
  night: nightCount,
  reactions: reactionCount,
  duplicates: duplicates.length,
  thirdPersonLeaks: thirdPersonLeaks.length,
  unresolvedPatterns: unresolvedPatterns.length,
  malformedPunctuation: malformedPunctuation.length
}, null, 2));

const fs = require("node:fs");
const path = require("node:path");

const root = process.argv[2];
if (!root) throw new Error("Usage: node make_lite_data.js <project-root>");

const dataRoot = path.join(root, "src", "data");
const sceneRoot = path.join(dataRoot, "scenes");

function readModule(filePath) {
  const text = fs.readFileSync(filePath, "utf8").trim();
  return JSON.parse(text.replace(/^export default\s+/, ""));
}

function firstLines(value, count) {
  return String(value).split("\n").slice(0, count).join("\n");
}

for (const fileName of fs.readdirSync(sceneRoot)) {
  if (!fileName.endsWith(".js")) continue;
  const filePath = path.join(sceneRoot, fileName);
  const data = readModule(filePath);
  const pools = {};
  for (const key of Object.keys(data.pools)) {
    pools[key] = firstLines(data.pools[key], 5);
  }
  data.pools = pools;
  data.ambient = firstLines(data.ambient, 20);
  fs.writeFileSync(filePath, `export default ${JSON.stringify(data)}\n`, "utf8");
}

const hotelPath = path.join(dataRoot, "hotel.js");
const hotel = readModule(hotelPath);
const hotelPools = {};
for (const key of Object.keys(hotel.pools)) {
  hotelPools[key] = firstLines(hotel.pools[key], 5);
}
hotel.pools = hotelPools;
hotel.ambient = firstLines(hotel.ambient, 10);
fs.writeFileSync(hotelPath, `export default ${JSON.stringify(hotel)}\n`, "utf8");

console.log("lite-data-written");

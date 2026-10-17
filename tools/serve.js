const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.argv[2] || 8765);
const root = path.resolve(__dirname, "..");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png"
};

http.createServer((request, response) => {
  const requested = decodeURIComponent((request.url || "/").split("?")[0]);
  const relative = requested === "/"
    ? path.join("preview", "index.html")
    : requested.replace(/^\/+/, "");
  const filePath = path.resolve(root, relative);

  if (!filePath.startsWith(root + path.sep) && filePath !== path.join(root, "index.html")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(content);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Preview: http://127.0.0.1:${port}/`);
});

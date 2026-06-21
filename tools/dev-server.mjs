// Tiny static dev server that disables caching, so edits to JS/assets always
// show up on a normal refresh (the browser was caching modules + images, which
// made code/art changes look like "nothing happened").
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, normalize, join } from "node:path";

const root = process.cwd();
const port = Number(process.argv[2] || 5200);
const types = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".mp3": "audio/mpeg",
  ".json": "application/json", ".ico": "image/x-icon"
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(req.url.split("?")[0]);
    if (path === "/") path = "/index.html";
    const filePath = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ""));
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": types[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Starlight Village dev server (no-cache) on http://127.0.0.1:${port}/`);
});

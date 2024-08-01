const fs = require("fs");
const http = require("http");
const path = require("path");

const filePath = path.join(__dirname, "./output3.webm");
const CHUNK_SIZE = 1024 * 1024; // 1 MB

http
  .createServer((req, res) => {
    // Set CORS headers to allow requests from any origin
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Respond to preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    const readStream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE });

    readStream.on("data", (chunk) => {
      if (!res.write(chunk)) {
        readStream.pause();
      }
    });

    readStream.on("end", () => {
      res.end();
    });

    readStream.on("error", (err) => {
      console.error("Error reading file:", err);
      res.writeHead(500);
      res.end("Internal Server Error");
    });

    res.on("drain", () => {
      readStream.resume();
    });

    res.on("error", (err) => {
      console.error("Error writing response:", err);
      readStream.close();
    });

    res.setHeader("Content-Type", "video/webm");
    res.setHeader("Content-Disposition", "attachment; filename=output5.webm");
  })
  .listen(3000, () => {
    console.log("Server running on port 3000");
  });

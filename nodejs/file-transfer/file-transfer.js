const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./output4.webm");

const CHUNK_SIZE = 1024 * 1024; // 1 MB

const readStream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE });

const writeStream = fs.createWriteStream(path.join(__dirname, "./destination/output5.webm"));

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
  console.log(Buffer.byteLength(chunk), chunk);
});

readStream.on("close", () => {
  writeStream.end();
  console.log("streaming completed");
});

readStream.on("error", (err) => {
  console.log("error while streaming data", err.message);
});

writeStream.on("error", (err) => {
  console.log("error while writing the file", err.message);
});

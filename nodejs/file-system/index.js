const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.join(__dirname, "./text.txt"));

console.log(file.toString("utf8"));

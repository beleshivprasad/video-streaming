const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const env = {
  APP_PORT: process.env.APP_PORT
};

// Object.entries(process.env || env).forEach(([key, value]) => {
//   if (key.includes("APP_")) {
//     env[key] = value;
//   }
// });

module.exports = env;

const express = require("express");
const path = require("path");
const env = require("./config/env");
const redisClient = require("./lib/redis");
const router = require("./src/routes/root.routes");

const app = express();

// expose public directory under static route
app.use("/static", express.static(path.join(__dirname, "public")));

// request body parsing
app.use(express.json());

// set up router
app.use("/api", router);

// listening on port
app.listen(env.APP_PORT, () => {
  console.log(`[server]: application server running port = ${env.APP_PORT}`);
});

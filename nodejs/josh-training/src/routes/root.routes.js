const express = require("express");

const router = express.Router();

// ping request
router.get("/", (req, res) => res.status(200).send("pong"));

router.use("/math", require("./math.routes.js"));

module.exports = router;

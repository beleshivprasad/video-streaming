const Router = require("express").Router;
const mathController = require("../controllers/math.controller");

const router = Router();

router.get("/factorial/:number", mathController.getFactorial);

module.exports = router;

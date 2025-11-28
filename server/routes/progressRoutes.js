const router = require("express").Router();
const page = require("../controllers/progressPageController");

// UI Page Route
router.get("/", page.showProgress);

module.exports = router;

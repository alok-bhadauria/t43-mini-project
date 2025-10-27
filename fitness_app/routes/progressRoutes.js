// routes/progressRoutes.js
const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");

//  Add a new progress log
router.post("/", progressController.add);

//  Get all progress logs OR user-specific logs
// Example: GET /progress → all logs
//          GET /progress/user/:user_id → logs for that user
router.get("/", progressController.getAll);
router.get("/user/:user_id", progressController.getAll);

module.exports = router;

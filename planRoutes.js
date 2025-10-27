const express = require("express");
const router = express.Router();
const PlanController = require("../controllers/planController");

//  CREATE Plan
router.post("/", PlanController.create);

//  READ All Plans
router.get("/", PlanController.getAll);

//  UPDATE Plan
router.put("/:id", PlanController.update);

//  DELETE Plan
router.delete("/:id", PlanController.delete);

module.exports = router;

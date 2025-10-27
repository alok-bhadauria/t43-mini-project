const express = require("express");
const router = express.Router();
const WearableController = require("../controllers/wearableController");

//  READ All Wearables for a User
router.get("/user/:user_id", WearableController.getAll);

//  READ Wearable by ID
router.get("/:id", WearableController.getById);

//  CREATE Wearable Record
router.post("/", WearableController.create);

//  UPDATE Wearable Record
router.put("/:id", WearableController.update);

//  DELETE Wearable Record
router.delete("/:id", WearableController.delete);

module.exports = router;

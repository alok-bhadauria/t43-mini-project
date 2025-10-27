const express = require("express");
const router = express.Router();
const ReminderController = require("../controllers/reminderController");

//  CREATE Reminder
router.post("/", ReminderController.create);

//  READ All Reminders for a User
router.get("/user/:user_id", ReminderController.getAll);

//  READ Reminder by ID
router.get("/:id", ReminderController.getById);

//  UPDATE Reminder
router.put("/:id", ReminderController.update);

//  DELETE Reminder
router.delete("/:id", ReminderController.delete);

module.exports = router;

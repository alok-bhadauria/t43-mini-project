const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");

//  CREATE Feedback
router.post("/", FeedbackController.create);

//  READ All Feedback
router.get("/", FeedbackController.getAll);

//  READ Feedback by User
router.get("/user/:user_id", FeedbackController.getByUser);

//  UPDATE Feedback
router.put("/:id", FeedbackController.update);

//  DELETE Feedback
router.delete("/:id", FeedbackController.delete);

module.exports = router;

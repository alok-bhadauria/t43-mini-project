const express = require("express");
const router = express.Router();
const WorkoutController = require("../controllers/workoutController");

//  CREATE Workout
router.post("/", WorkoutController.create);

//  READ All Workouts for a User
router.get("/user/:user_id", WorkoutController.getAll);

//  READ Workout by ID
router.get("/:id", WorkoutController.getById);

//  UPDATE Workout
router.put("/:id", WorkoutController.update);

//  DELETE Workout
router.delete("/:id", WorkoutController.delete);

module.exports = router;

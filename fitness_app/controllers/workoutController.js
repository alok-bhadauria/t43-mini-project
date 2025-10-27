// controllers/workoutController.js
const WorkoutModel = require("../models/workoutModel");

const WorkoutController = {
  async create(req, res) {
    try {
      const newWorkout = await WorkoutModel.createWorkout(req.body);
      res.status(201).json(newWorkout);
    } catch (err) {
      res.status(500).json({ error: "Error creating workout" });
    }
  },

  async getAll(req, res) {
    try {
      const { user_id } = req.params;
      const workouts = await WorkoutModel.getAllWorkouts(user_id);
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ error: "Error fetching workouts" });
    }
  },

  async getById(req, res) {
    try {
      const workout = await WorkoutModel.getWorkoutById(req.params.id);
      res.json(workout);
    } catch (err) {
      res.status(500).json({ error: "Error fetching workout" });
    }
  },

  async update(req, res) {
    try {
      const updated = await WorkoutModel.updateWorkout(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Error updating workout" });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await WorkoutModel.deleteWorkout(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Error deleting workout" });
    }
  },
};

module.exports = WorkoutController;

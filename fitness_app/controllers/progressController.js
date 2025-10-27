// controllers/progressController.js
const ProgressModel = require("../models/progressModel");

const ProgressController = {
  async getAll(req, res) {
    try {
      const { user_id } = req.params;
      const logs = await ProgressModel.getAllProgress(user_id);
      res.json(logs);
    } catch (err) {
      res.status(500).json({ error: "Error fetching progress logs" });
    }
  },

  async add(req, res) {
    try {
      const newLog = await ProgressModel.addProgress(req.body);
      res.status(201).json(newLog);
    } catch (err) {
      res.status(500).json({ error: "Error adding progress log" });
    }
  },
};

module.exports = ProgressController;

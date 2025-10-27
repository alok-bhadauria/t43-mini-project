// controllers/reminderController.js
const ReminderModel = require("../models/reminderModel");

const ReminderController = {
  async create(req, res) {
    try {
      const reminder = await ReminderModel.createReminder(req.body);
      res.status(201).json(reminder);
    } catch (err) {
      res.status(500).json({ error: "Error creating reminder" });
    }
  },

  async getAll(req, res) {
    try {
      const { user_id } = req.params;
      const reminders = await ReminderModel.getAllReminders(user_id);
      res.json(reminders);
    } catch (err) {
      res.status(500).json({ error: "Error fetching reminders" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const reminder = await ReminderModel.getReminderById(id);
      res.json(reminder);
    } catch (err) {
      res.status(500).json({ error: "Error fetching reminder by ID" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await ReminderModel.updateReminder(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Error updating reminder" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ReminderModel.deleteReminder(id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Error deleting reminder" });
    }
  },
};

module.exports = ReminderController;

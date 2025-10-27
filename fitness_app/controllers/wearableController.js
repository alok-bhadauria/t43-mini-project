// controllers/wearableController.js
const WearableModel = require("../models/wearableModel");

const WearableController = {
  async getAll(req, res) {
    try {
      const { user_id } = req.params;
      const wearables = await WearableModel.getAllWearables(user_id);
      res.json(wearables);
    } catch (err) {
      res.status(500).json({ error: "Error fetching wearables" });
    }
  },

  async getById(req, res) {
    try {
      const wearable = await WearableModel.getWearableById(req.params.id);
      res.json(wearable);
    } catch (err) {
      res.status(500).json({ error: "Error fetching wearable" });
    }
  },

  async create(req, res) {
    try {
      const newWearable = await WearableModel.addWearable(req.body);
      res.status(201).json(newWearable);
    } catch (err) {
      res.status(500).json({ error: "Error adding wearable" });
    }
  },

  async update(req, res) {
    try {
      const updated = await WearableModel.updateWearable(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Error updating wearable" });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await WearableModel.deleteWearable(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Error deleting wearable" });
    }
  },
};

module.exports = WearableController;

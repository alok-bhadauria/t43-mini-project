// controllers/planController.js
const PlanModel = require("../models/planModel");

const PlanController = {
  async create(req, res) {
    try {
      const plan = await PlanModel.createPlan(req.body);
      res.status(201).json(plan);
    } catch (err) {
      res.status(500).json({ error: "Error creating plan" });
    }
  },

  async getAll(req, res) {
    try {
      const plans = await PlanModel.getAllPlans();
      res.json(plans);
    } catch (err) {
      res.status(500).json({ error: "Error fetching plans" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await PlanModel.updatePlan(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Error updating plan" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await PlanModel.deletePlan(id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Error deleting plan" });
    }
  },
};

module.exports = PlanController;

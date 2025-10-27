// controllers/nutritionController.js
const NutritionModel = require("../models/nutritionModel");

const NutritionController = {
  // 🍽️ Get Meal Plans
  async getMealPlans(req, res) {
    try {
      const { user_id } = req.params;
      const plans = await NutritionModel.getMealPlans(user_id);
      res.json(plans);
    } catch (err) {
      res.status(500).json({ error: "Error fetching meal plans" });
    }
  },

  // 🍲 Add Meal Log
  async addMeal(req, res) {
    try {
      const { user_id } = req.params;
      const mealLog = await NutritionModel.addMealLog(user_id, req.body);
      res.status(201).json(mealLog);
    } catch (err) {
      res.status(500).json({ error: "Error adding meal log" });
    }
  },

  // ✏️ Update Diet
  async updateDiet(req, res) {
    try {
      const { user_id } = req.params;
      const updated = await NutritionModel.updateDiet(user_id, req.body.diet);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Error updating diet" });
    }
  },

  // 🗑️ Delete Meal Log
  async deleteMeal(req, res) {
    try {
      const { id } = req.params;
      const deleted = await NutritionModel.deleteMealLog(id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Error deleting meal log" });
    }
  },
};

module.exports = NutritionController;

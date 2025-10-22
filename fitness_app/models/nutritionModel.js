// models/nutritionModel.js
const pool = require("../db.js");

const NutritionModel = {
  // Read — Get all meal plans for a specific user
  async getMealPlans(user_id) {
    try {
      const result = await pool.query(
        "SELECT diet FROM fitness.plans WHERE user_id = $1",
        [user_id]
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching meal plans:", err);
      throw err;
    }
  },

  // Create — Add a new meal log entry
  async addMealLog(user_id, meal) {
    const { calories } = meal;
    try {
      const result = await pool.query(
        `INSERT INTO fitness.progress_logs (user_id, type, calories, duration)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [user_id, "meal", calories, null]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error adding meal log:", err);
      throw err;
    }
  },

  // Update — Modify user’s diet plan
  async updateDiet(user_id, diet) {
    try {
      const result = await pool.query(
        `UPDATE fitness.plans 
         SET diet = $1, updated_at = NOW() 
         WHERE user_id = $2 
         RETURNING *`,
        [diet, user_id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error updating diet:", err);
      throw err;
    }
  },

  // Delete — Optional: remove a meal log (if needed later)
  async deleteMealLog(log_id) {
    try {
      const result = await pool.query(
        "DELETE FROM fitness.progress_logs WHERE id = $1 RETURNING *",
        [log_id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error deleting meal log:", err);
      throw err;
    }
  },
};

module.exports = NutritionModel;

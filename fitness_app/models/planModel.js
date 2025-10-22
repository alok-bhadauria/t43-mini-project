const pool = require("../db.js");

const PlanModel = {
  // Create — Add a new plan for a user
  async createPlan(plan) {
    const { user_id, workout, diet } = plan;
    try {
      const result = await pool.query(
        `INSERT INTO fitness.plans (user_id, workout, diet)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [user_id, workout, diet]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error creating plan:", err);
      throw err;
    }
  },

  // Read — Get all plans (optional: later add user-specific filtering)
  async getAllPlans() {
    try {
      const result = await pool.query("SELECT * FROM fitness.plans ORDER BY created_at DESC");
      return result.rows;
    } catch (err) {
      console.error("Error fetching plans:", err);
      throw err;
    }
  },

  // Update — Modify a user’s plan
  async updatePlan(id, updates) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in updates) {
      fields.push(`${key} = $${index}`);
      values.push(updates[key]);
      index++;
    }

    values.push(id);
    const query = `
      UPDATE fitness.plans
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${index}
      RETURNING *`;

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error("Error updating plan:", err);
      throw err;
    }
  },

  // Delete — Remove a plan by ID
  async deletePlan(id) {
    try {
      const result = await pool.query(
        "DELETE FROM fitness.plans WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error deleting plan:", err);
      throw err;
    }
  },
};

module.exports = PlanModel;

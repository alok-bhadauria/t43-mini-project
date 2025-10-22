const pool = require("../db.js");

const ProgressModel = {
  // Get all progress logs (optionally for a specific user)
  async getAllProgress(user_id) {
    try {
      let query = "SELECT * FROM fitness.progress_logs";
      const values = [];

      if (user_id) {
        query += " WHERE user_id = $1";
        values.push(user_id);
      }

      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error("Error fetching progress logs:", err);
      throw err;
    }
  },

  // Add a new progress log
  async addProgress(log) {
    const { user_id, type, calories, duration, date } = log;

    // Validate type
    if (!["workout", "meal"].includes(type)) {
      throw new Error(
        `Invalid progress log type: ${type}. Must be 'workout' or 'meal'.`
      );
    }

    try {
      const result = await pool.query(
        `INSERT INTO fitness.progress_logs (user_id, type, calories, duration, date)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [user_id, type, calories || null, duration || null, date || new Date()]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error adding progress log:", err);
      throw err;
    }
  },
};

module.exports = ProgressModel;

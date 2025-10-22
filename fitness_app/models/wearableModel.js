const pool = require("../db.js");

const WearableModel = {
  // Get all wearables for a user
  async getAllWearables(user_id) {
    try {
      const result = await pool.query(
        `SELECT * FROM fitness.wearables 
         WHERE user_id = $1 
         ORDER BY recorded_at DESC`,
        [user_id]
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching wearable data:", err);
      throw err;
    }
  },

  // Get a single wearable by ID
  async getWearableById(id) {
    try {
      const result = await pool.query(
        "SELECT * FROM fitness.wearables WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching wearable by ID:", err);
      throw err;
    }
  },

  // Add new wearable record
  async addWearable(data) {
    const { user_id, device_name, steps, heart_rate, sleep_hours, recorded_at } = data;
    try {
      const result = await pool.query(
        `INSERT INTO fitness.wearables
          (user_id, device_name, steps, heart_rate, sleep_hours, recorded_at)
         VALUES ($1, $2, $3, $4, $5, COALESCE($6, NOW()))
         RETURNING *`,
        [user_id, device_name, steps, heart_rate, sleep_hours, recorded_at]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error adding wearable data:", err);
      throw err;
    }
  },

  // Update wearable by ID
  async updateWearable(id, updates) {
    const { device_name, steps, heart_rate, sleep_hours, recorded_at } = updates;

    try {
      const result = await pool.query(
        `UPDATE fitness.wearables
         SET device_name = COALESCE($1, device_name),
             steps = COALESCE($2, steps),
             heart_rate = COALESCE($3, heart_rate),
             sleep_hours = COALESCE($4, sleep_hours),
             recorded_at = COALESCE($5, recorded_at),
             updated_at = NOW()
         WHERE id = $6
         RETURNING *`,
        [device_name, steps, heart_rate, sleep_hours, recorded_at, id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error updating wearable data:", err);
      throw err;
    }
  },

  // Delete wearable by ID
  async deleteWearable(id) {
    try {
      const result = await pool.query(
        "DELETE FROM fitness.wearables WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error deleting wearable data:", err);
      throw err;
    }
  },
};

module.exports = WearableModel;

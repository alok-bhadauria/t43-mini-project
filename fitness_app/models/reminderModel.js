const pool = require("../db.js");

const ReminderModel = {
  async createReminder(reminder) {
    const { user_id, message, remind_at, type } = reminder;
    try {
      const result = await pool.query(
        `INSERT INTO fitness.reminders (user_id, message, remind_at, type)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, message, remind_at, type]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error creating reminder:", err);
      throw err;
    }
  },

  async getAllReminders(user_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM fitness.reminders WHERE user_id = $1 ORDER BY remind_at ASC",
        [user_id]
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching reminders:", err);
      throw err;
    }
  },

  async getReminderById(id) {
    try {
      const result = await pool.query(
        "SELECT * FROM fitness.reminders WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching reminder by ID:", err);
      throw err;
    }
  },

  async updateReminder(id, fields) {
    try {
      const setStr = Object.keys(fields)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");
      const values = Object.values(fields);

      const result = await pool.query(
        `UPDATE fitness.reminders 
         SET ${setStr}, updated_at = NOW()
         WHERE id = $${values.length + 1}
         RETURNING *`,
        [...values, id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error updating reminder:", err);
      throw err;
    }
  },

  async deleteReminder(id) {
    try {
      const result = await pool.query(
        "DELETE FROM fitness.reminders WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error deleting reminder:", err);
      throw err;
    }
  },
};

module.exports = ReminderModel;

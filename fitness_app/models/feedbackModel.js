const pool = require("../db.js");

const FeedbackModel = {
  // Create — Add a new feedback entry
  async createFeedback(feedback) {
    const { user_id, rating, comments } = feedback;
    try {
      const result = await pool.query(
        `INSERT INTO fitness.feedback (user_id, rating, comments)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [user_id, rating, comments]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error creating feedback:", err);
      throw err;
    }
  },

  // Read — Get all feedback entries
  async getAllFeedback() {
    try {
      const result = await pool.query(
        "SELECT * FROM fitness.feedback ORDER BY created_at DESC"
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching all feedback:", err);
      throw err;
    }
  },

  // Read — Get feedback by user
  async getFeedbackByUser(user_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM fitness.feedback WHERE user_id = $1 ORDER BY created_at DESC",
        [user_id]
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching feedback by user:", err);
      throw err;
    }
  },

  // Update — Modify feedback comments or rating
  async updateFeedback(id, fields) {
    try {
      const setStr = Object.keys(fields)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");
      const values = Object.values(fields);

      const result = await pool.query(
        `UPDATE fitness.feedback 
         SET ${setStr}, updated_at = NOW() 
         WHERE id = $${values.length + 1} 
         RETURNING *`,
        [...values, id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error updating feedback:", err);
      throw err;
    }
  },

  // Delete — Remove feedback entry
  async deleteFeedback(id) {
    try {
      const result = await pool.query(
        "DELETE FROM fitness.feedback WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error deleting feedback:", err);
      throw err;
    }
  },
};

module.exports = FeedbackModel;

const pool = require("../db.js");

const WorkoutModel = {
  // ---------------- Create a new workout ----------------
  async createWorkout(workout) {
    const { user_id, type, exercises, duration, notes, workout_date } = workout;
    try {
      const result = await pool.query(
        `INSERT INTO fitness.workouts 
          (user_id, type, exercises, duration, notes, workout_date)
         VALUES ($1, $2, $3, $4, $5, COALESCE($6, CURRENT_DATE))
         RETURNING *`,
        [
          user_id,
          type,
          JSON.stringify(exercises),
          duration,
          notes,
          workout_date,
        ]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error creating workout:", err);
      throw err;
    }
  },

  // ---------------- Get all workouts for a user ----------------
  async getAllWorkouts(user_id) {
    try {
      const result = await pool.query(
        `SELECT * FROM fitness.workouts WHERE user_id = $1 ORDER BY workout_date DESC`,
        [user_id]
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching workouts:", err);
      throw err;
    }
  },

  // ---------------- Get workout by ID ----------------
  async getWorkoutById(id) {
    try {
      const result = await pool.query(
        `SELECT * FROM fitness.workouts WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching workout by ID:", err);
      throw err;
    }
  },

  // ---------------- Update workout ----------------
  async updateWorkout(id, updates) {
    const { type, exercises, duration, notes, workout_date } = updates;
    try {
      const result = await pool.query(
        `UPDATE fitness.workouts
         SET type = COALESCE($1, type),
             exercises = COALESCE($2, exercises),
             duration = COALESCE($3, duration),
             notes = COALESCE($4, notes),
             workout_date = COALESCE($5, workout_date),
             updated_at = NOW()
         WHERE id = $6
         RETURNING *`,
        [
          type,
          exercises ? JSON.stringify(exercises) : null,
          duration,
          notes,
          workout_date,
          id,
        ]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error updating workout:", err);
      throw err;
    }
  },

  // ---------------- Delete workout ----------------
  async deleteWorkout(id) {
    try {
      const result = await pool.query(
        `DELETE FROM fitness.workouts WHERE id = $1 RETURNING *`,
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error deleting workout:", err);
      throw err;
    }
  },
};

module.exports = WorkoutModel;

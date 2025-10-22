const pool = require("../db.js");

const UserModel = {
  // Get all users
  async getAllUsers() {
    try {
      const result = await pool.query("SELECT * FROM fitness.users");
      return result.rows;
    } catch (err) {
      console.error("Error fetching users:", err);
      throw err;
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const result = await pool.query(
        "SELECT * FROM fitness.users WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      throw err;
    }
  },

  // Create new user
  async createUser(user) {
    const {
      email,
      password_hash,
      name,
      age,
      weight,
      height,
      goals,
      preferences
    } = user;

    try {
      const result = await pool.query(
        `INSERT INTO fitness.users 
          (email, password_hash, name, age, weight, height, goals, preferences)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING *`,
        [email, password_hash, name, age, weight, height, goals, preferences]
      );
      return result.rows[0];
    } catch (err) {
      // Gracefully handle duplicate emails
      if (err.code === "23505") {
        console.warn(`User with email '${email}' already exists`);
        const existingUser = await pool.query(
          "SELECT * FROM fitness.users WHERE email = $1",
          [email]
        );
        return existingUser.rows[0];
      }
      console.error("Error creating user:", err);
      throw err;
    }
  },

  // Update user by ID
  async updateUser(id, updates) {
    const fields = [];
    const values = [];
    let i = 1;

    for (const key in updates) {
      fields.push(`${key} = $${i}`);
      values.push(updates[key]);
      i++;
    }

    values.push(id);
    const query = `
      UPDATE fitness.users 
      SET ${fields.join(", ")}, updated_at = NOW() 
      WHERE id = $${i} 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  },

  // Delete user by ID
  async deleteUser(id) {
    try {
      const result = await pool.query(
        "DELETE FROM fitness.users WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
};

module.exports = UserModel;

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
      const result = await pool.query("SELECT * FROM fitness.users WHERE id = $1", [id]);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      throw err;
    }
  },

  // Create a new user
  async createUser(user) {
    const { email, password_hash, name, age, weight, height, goals, preferences } = user;
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
      console.error("Error creating user:", err);
      throw err;
    }
  },
};

module.exports = { UserModel };

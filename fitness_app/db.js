const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "fitness_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "fitnesscoach",
  password: process.env.DB_PASSWORD || "AdminPass123",
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => console.error("Database connection error:", err.stack));

module.exports = pool;

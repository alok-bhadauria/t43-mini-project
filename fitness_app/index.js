// index.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const pool = require("./db.js"); 

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Basic Route (Home Page)
app.get("/", (req, res) => {
  res.render("index", { title: "AI Fitness Coach" });
});

// check database connection
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("❌ Error running test query", err);
  } else {
    console.log("🕒 Database time:", result.rows[0].now);
  }
});

const { UserModel } = require("./models/userModel.js");

// temporary test connection to model :
async function main() {
  try {
    const users = await UserModel.getAllUsers();
    console.log("🧍 Users in DB:", users);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

main();

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// ----------------- Import Routes -----------------
const userRoutes = require("./routes/userRoutes.js");
const feedbackRoutes = require("./routes/feedbackRoutes.js");
const nutritionRoutes = require("./routes/nutritionRoutes.js");
const planRoutes = require("./routes/planRoutes.js");
const progressRoutes = require("./routes/progressRoutes.js");
const reminderRoutes = require("./routes/reminderRoutes.js");
const wearableRoutes = require("./routes/wearableRoutes.js");
const workoutRoutes = require("./routes/workoutRoutes.js");

// ----------------- Initialize App -----------------
const app = express();

// ----------------- Middlewares -----------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------- Base Routes -----------------
app.get("/", (req, res) => res.send("Fitness App API is running"));

// ----------------- Use Routes -----------------
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/wearables", wearableRoutes);
app.use("/api/workouts", workoutRoutes);

// ----------------- 404 Handler -----------------
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

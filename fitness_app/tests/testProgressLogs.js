const ProgressModel = require("../models/progressModel.js");
const UserModel = require("../models/userModel.js");
const pool = require("../db.js");

async function testProgressLogs() {
  try {
    // Step 1 — Fetch an existing user
    const users = await UserModel.getAllUsers();
    if (!users || users.length === 0) return console.log("No user found.");
    const user = users[0];
    console.log("Using user:", user);

    // Step 2 — Add a workout progress log
    const workoutLog = await ProgressModel.addProgress({
      user_id: user.id,
      type: "workout",
      duration: 45, // in minutes
      calories: 300,
      date: new Date(),
    });
    console.log("Workout progress log added:", workoutLog);

    // Step 3 — Add a meal progress log
    const mealLog = await ProgressModel.addProgress({
      user_id: user.id,
      type: "meal",
      calories: 600,
      date: new Date(),
    });
    console.log("Meal progress log added:", mealLog);

    // Step 4 — Fetch all progress logs for the user
    const logs = await ProgressModel.getAllProgress(user.id);
    console.log("All progress logs:", logs);

  } catch (err) {
    console.error("Error testing progress logs:", err);
  } finally {
    await pool.end();
    console.log("\nProgress logs tests completed. Connection closed.");
  }
}

// Run the test
testProgressLogs();

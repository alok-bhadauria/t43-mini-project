const WorkoutModel = require("../models/workoutModel.js");
const UserModel = require("../models/userModel.js");
const pool = require("../db.js");

async function testWorkouts() {
  try {
    // Step 1 — Fetch an existing user
    const users = await UserModel.getAllUsers();
    if (!users || users.length === 0) return console.log("No user found.");
    const user = users[0];
    console.log("Using user:", user);

    // Step 2 — Create a new workout
    const workout = await WorkoutModel.createWorkout({
      user_id: user.id,
      type: "Cardio",
      exercises: [
        { name: "Running", duration: 30 },
        { name: "Cycling", duration: 20 },
      ],
      duration: 50,
      notes: "Morning session",
    });
    console.log("Workout added:", workout);

    // Step 3 — Fetch all workouts
    const workouts = await WorkoutModel.getAllWorkouts(user.id);
    console.log("All workouts:", workouts);

    // Step 4 — Update the workout
    const updatedWorkout = await WorkoutModel.updateWorkout(workout.id, {
      duration: 60,
      notes: "Updated evening session",
    });
    console.log("Workout updated:", updatedWorkout);

    // Step 5 — Fetch workout by ID
    const fetchedWorkout = await WorkoutModel.getWorkoutById(workout.id);
    console.log("Fetched workout by ID:", fetchedWorkout);

    // Step 6 — Delete the workout
    const deletedWorkout = await WorkoutModel.deleteWorkout(workout.id);
    console.log("Workout deleted:", deletedWorkout);

    // Step 7 — Verify deletion
    const afterDelete = await WorkoutModel.getAllWorkouts(user.id);
    console.log("Workouts after deletion:", afterDelete);

  } catch (err) {
    console.error("Error testing workouts:", err);
  } finally {
    await pool.end();
    console.log("\nWorkout tests completed. Connection closed.");
  }
}

// Run the test
testWorkouts();

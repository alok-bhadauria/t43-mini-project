const PlanModel = require("../models/planModel.js");
const UserModel = require("../models/userModel.js");
const pool = require("../db.js");

async function testPlans() {
  try {
    // Step 1 — Fetch user
    const users = await UserModel.getAllUsers();
    if (!users || users.length === 0) return console.log("No users found.");
    const user = users[0];
    console.log("Using user:", user);

    // Step 2 — Create plan
    const plan = await PlanModel.createPlan({
      user_id: user.id,
      workout: { day1: "Push-ups & Squats", day2: "Jogging" },
      diet: { breakfast: "Oatmeal", lunch: "Grilled chicken", dinner: "Salmon + Salad" },
    });
    console.log("Plan created:", plan);

    // Step 3 — Fetch all plans
    const allPlans = await PlanModel.getAllPlans();
    console.log("All plans:", allPlans);

    // Step 4 — Update plan
    const updatedPlan = await PlanModel.updatePlan(plan.id, {
      workout: { day1: "Cardio + Core", day2: "Rest" },
    });
    console.log("Plan updated:", updatedPlan);

    // Step 5 — Delete plan
    const deletedPlan = await PlanModel.deletePlan(plan.id);
    console.log("Plan deleted:", deletedPlan);

    // Step 6 — Verify deletion
    const finalPlans = await PlanModel.getAllPlans();
    console.log("Plans after deletion:", finalPlans);

  } catch (err) {
    console.error("Error testing plans:", err);
  } finally {
    await pool.end();
  }
}

testPlans();

const NutritionModel = require("../models/nutritionModel.js");
const UserModel = require("../models/userModel.js");
const pool = require("../db.js");

async function testNutrition() {
  try {
    // Step 1 — Fetch user
    const users = await UserModel.getAllUsers();
    if (!users || users.length === 0) return console.log("No users found.");
    const user = users[0];
    console.log("Using user:", user);

    // Step 2 — Get meal plans
    const plans = await NutritionModel.getMealPlans(user.id);
    console.log("Meal plans:", plans);

    // Step 3 — Add a meal log
    const mealLog = await NutritionModel.addMealLog(user.id, { calories: 550 });
    console.log("Meal log added:", mealLog);

    // Step 4 — Update diet
    const updatedDiet = {
      Breakfast: "Oats + Almond milk + Banana",
      Lunch: "Brown rice + Paneer + Veggies",
      Dinner: "Grilled chicken + Salad",
    };
    const updatedPlan = await NutritionModel.updateDiet(user.id, updatedDiet);
    console.log("Updated diet plan:", updatedPlan);

    // Step 5 — Delete meal log (optional)
    if (mealLog && mealLog.id) {
      const deletedLog = await NutritionModel.deleteMealLog(mealLog.id);
      console.log("Deleted meal log:", deletedLog);
    }

    // Step 6 — Verify meal plans again
    const finalPlans = await NutritionModel.getMealPlans(user.id);
    console.log("Meal plans after update:", finalPlans);

  } catch (err) {
    console.error("Error testing nutrition:", err);
  } finally {
    await pool.end();
  }
}

testNutrition();

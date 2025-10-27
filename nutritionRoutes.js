const express = require("express");
const router = express.Router();
const NutritionController = require("../controllers/nutritionController");

//  READ Meal Plans for a User
router.get("/plans/:user_id", NutritionController.getMealPlans);

//  CREATE Meal Log
router.post("/meal/:user_id", NutritionController.addMeal);

//  UPDATE Diet Plan
router.put("/diet/:user_id", NutritionController.updateDiet);

//  DELETE Meal Log
router.delete("/meal/:id", NutritionController.deleteMeal);

module.exports = router;

from flask import Flask, request, jsonify
import joblib
import numpy as np
import json

app = Flask(__name__)

workout_model = joblib.load("workout_model.pkl")
diet_model = joblib.load("diet_model.pkl")

with open("template_mappings.json") as f:
    templates = json.load(f)


@app.route("/")
def home():
    return "AI Fitness Model Running"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # --------- INPUT ---------
    age = float(data["age"])
    height = float(data["height"])
    weight = float(data["weight"])
    diet_pref = data["diet_pref"]

    selected_goals = data.get("goals", [])
    goal1 = selected_goals[0] if len(selected_goals) > 0 else None
    goal2 = selected_goals[1] if len(selected_goals) > 1 else None

    bmi = weight / ((height / 100) ** 2)

    # --------- BUILD FEATURE VECTOR (MUST MATCH TRAINING ORDER) ---------
    x = [age, height, weight, bmi]

    DIET_CLASSES = [
        "veg", "nonveg", "vegan", "low_carb",
        "low_fat", "lactose_free", "sugar_free"
    ]
    for d in DIET_CLASSES:
        x.append(1 if diet_pref == d else 0)

    GOAL_CLASSES = [
        "muscle_gain", "lean_body_mass", "fitness_level", "weight_loss", "flexibility",
        "endurance", "stress_reduction", "core_strength", "sleep_improvement",
        "lower_blood_pressure", "cardio_health", "increase_energy",
        "boost_immunity", "mental_focus", "exercise_consistency"
    ]
    for g in GOAL_CLASSES:
        x.append(1 if (g == goal1 or g == goal2) else 0)

    X = np.array([x])

    # --------- PREDICT ---------
    w_pred = workout_model["model"].predict(
        workout_model["scaler"].transform(X)
    )[0]
    d_pred = diet_model["model"].predict(
        diet_model["scaler"].transform(X)
    )[0]

    # --------- MAP LABEL → TEMPLATE LIST ---------
    workouts = templates["workout_templates"].get(w_pred, ["Plan unavailable"])
    diet = templates["diet_templates"].get(d_pred, ["Plan unavailable"])

    return jsonify({
        "workouts": workouts,
        "diet": diet,
        "bmi": round(bmi, 2)
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)

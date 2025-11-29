from flask import Flask, request, jsonify
import os
import joblib
import numpy as np
import json

app = Flask(__name__)

# ====== LOAD TRAINED MODELS ====== #
w_bundle = joblib.load("workout_model.pkl")
d_bundle = joblib.load("diet_model.pkl")

w_model = w_bundle["model"]
w_scaler = w_bundle["scaler"]
features = w_bundle["features"]   # same used for diet model

d_model = d_bundle["model"]
d_scaler = d_bundle["scaler"]

with open("template_mappings.json") as f:
    templates = json.load(f)


@app.route("/")
def home():
    return "AI Fitness Model v3 Running"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # ========== INPUT VARIABLES ========== #
    age = float(data["age"])
    height = float(data["height"])
    weight = float(data["weight"])
    diet_pref = data["diet_pref"]

    # Expect 2 goals (sent separately)
    goal1 = data.get("goal1")
    goal2 = data.get("goal2")

    bmi = weight / ((height / 100) ** 2)

    # ========== BUILD FEATURE VECTOR FROM FEATURE NAMES ========== #
    # Start with all zeros
    feat_vals = {f: 0.0 for f in features}

    # numeric features
    if "age" in feat_vals:    feat_vals["age"] = age
    if "height" in feat_vals: feat_vals["height"] = height
    if "weight" in feat_vals: feat_vals["weight"] = weight
    if "bmi" in feat_vals:    feat_vals["bmi"] = bmi

    # one-hot for diet_pref_*
    for f in features:
        if f.startswith("diet_pref_"):
            pref_name = f[len("diet_pref_"):]
            feat_vals[f] = 1.0 if pref_name == diet_pref else 0.0

    # one-hot for goal1_*
    for f in features:
        if f.startswith("goal1_"):
            g_name = f[len("goal1_"):]
            feat_vals[f] = 1.0 if g_name == goal1 else 0.0

    # one-hot for goal2_*
    for f in features:
        if f.startswith("goal2_"):
            g_name = f[len("goal2_"):]
            feat_vals[f] = 1.0 if g_name == goal2 else 0.0

    # Build X in the exact feature order
    X = np.array([[feat_vals[f] for f in features]])

    # ========== PREDICT ========== #
    Xw = w_scaler.transform(X)
    Xd = d_scaler.transform(X)

    w_pred = w_model.predict(Xw)[0]
    d_pred = d_model.predict(Xd)[0]

    workouts = templates["workout_templates"].get(w_pred, ["Plan unavailable"])
    diet = templates["diet_templates"].get(d_pred, ["Plan unavailable"])

    return jsonify({
        "goal1": goal1,
        "goal2": goal2,
        "workouts": workouts,
        "diet": diet,
        "bmi": round(bmi, 2)
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

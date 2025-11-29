import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
import json

print("\nLoading dataset...")
df = pd.read_csv("fitness_synthetic_data.csv")

# ================== ONE HOT ENCODE ================== #

print("Encoding diet preferences + both goals...")

df = pd.get_dummies(df, columns=["diet_pref","goal1","goal2"], dtype=int)

features = [c for c in df.columns if c not in ["workout_plan","diet_plan"]]
X = df[features].values

yW = df["workout_plan"]
yD = df["diet_plan"]

# ================== TRAIN SPLIT ================== #

print("Splitting dataset...")

Xw_train, Xw_test, yw_train, yw_test = train_test_split(X,yW,test_size=0.2,random_state=42)
Xd_train, Xd_test, yd_train, yd_test = train_test_split(X,yD,test_size=0.2,random_state=42)

# ================== SCALING ================== #

print("Scaling features...")
ws = StandardScaler();   Xw_train = ws.fit_transform(Xw_train);   Xw_test = ws.transform(Xw_test)
ds = StandardScaler();   Xd_train = ds.fit_transform(Xd_train);   Xd_test = ds.transform(Xd_test)

# ================== MODEL TRAINING ================== #

print("Training Workout Model...")
w_model = MLPClassifier(hidden_layer_sizes=(84,42), max_iter=1100, random_state=42)
w_model.fit(Xw_train, yw_train)

print("Training Diet Model...")
d_model = MLPClassifier(hidden_layer_sizes=(84,42), max_iter=1100, random_state=42)
d_model.fit(Xd_train, yd_train)

# ================== SAVE MODELS ================== #

print("Saving trained models...")

joblib.dump({"model":w_model,"scaler":ws,"features":features}, "workout_model.pkl")
joblib.dump({"model":d_model,"scaler":ds,"features":features}, "diet_model.pkl")

# ================== SAVE TEMPLATE JSON ================== #

workout_templates = {
    "W_strength": ["Bench Press","Squat","Deadlift","Overhead Press","Pull Ups","Weighted Dips"],
    "W_fatloss": ["HIIT","Burpees","Mountain Climbers","Jump Rope","Cycling","Sprints"],
    "W_flex": ["Yoga Flow","Pilates Core","Mobility Drills","Hamstring Stretch","Cat-Cow"],
    "W_endurance": ["Running","Swimming","Cycling Long","Rowing Machine","Stair Climb"],
    "W_core": ["Plank","Leg Raises","Russian Twist","Hanging Knee Tucks","Side Plank"],
    "W_recovery": ["Light Yoga","Deep Breathing","Walking 5km","Foam Rolling"],
}

diet_templates = {
    "D_mass": ["Oats","Milk","Peanut Butter","Banana","Paneer","Rice","Chicken"],
    "D_lean": ["Egg Whites","Brown Rice","Sweet Potato","Greek Yogurt","Sprouts"],
    "D_lowfat": ["Vegetable Soup","Steamed Broccoli","Salad","Corn","Apple"],
    "D_lowcarb": ["Eggs","Avocado","Paneer","Fish","Spinach","Almonds"],
    "D_vegan": ["Tofu","Soy Milk","Quinoa","Lentils","Beans","Hummus"],
    "D_sugarfree": ["Nuts","Cottage Cheese","Boiled Eggs","Vegetable Mix"],
    "D_bpcontrol": ["Oats","Banana","Leafy Greens","Beet Juice","Olive Oil"],
}

with open("template_mappings.json","w") as f:
    json.dump({"workout_templates":workout_templates,"diet_templates":diet_templates}, f, indent=2)

print("\nTraining Complete — Models + template_mappings.json saved.\n")

import pandas as pd
import numpy as np
np.random.seed(42)

# ---------------- UPDATED CATEGORIES ---------------- #

diet_prefs = [
    "veg","nonveg","vegan","low_carb","low_fat","lactose_free","sugar_free"
]

goals = [
    "muscle_gain","lean_body_mass","fitness_level","weight_loss","flexibility",
    "endurance","stress_reduction","core_strength","sleep_improvement",
    "lower_blood_pressure","cardio_health","increase_energy",
    "boost_immunity","mental_focus","exercise_consistency"
]

# ---------------- WORKOUT + DIET TEMPLATE MAPS ---------------- #
# (YOU CAN EXPAND THESE MORE LATER)

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

# --------------- SYNTHETIC DATA GENERATION ---------------- #

rows = []
size = 1500  # ⬅ increased dataset size for better training

for _ in range(size):
    age = np.random.randint(16, 65)
    height = np.random.randint(150, 200)
    weight = np.random.randint(45, 120)
    bmi = weight / ((height/100)**2)

    pref = np.random.choice(diet_prefs)
    goal = np.random.choice(goals)

    # mapping goal → workout template type
    if "muscle" in goal or "mass" in goal:
        w_key = "W_strength"
    elif "loss" in goal or "fat" in goal:
        w_key = "W_fatloss"
    elif "flex" in goal or "stretch" in goal:
        w_key = "W_flex"
    elif "endurance" in goal or "cardio" in goal:
        w_key = "W_endurance"
    elif "core" in goal:
        w_key = "W_core"
    else:
        w_key = np.random.choice(list(workout_templates.keys()))

    # diet mapping depending on preference
    if pref == "vegan":
        d_key = "D_vegan"
    elif pref == "low_carb":
        d_key = "D_lowcarb"
    elif pref == "low_fat":
        d_key = "D_lowfat"
    elif pref == "sugar_free":
        d_key = "D_sugarfree"
    elif pref == "lactose_free":
        d_key = "D_lowfat"
    else:
        d_key = np.random.choice(list(diet_templates.keys()))

    rows.append([age,height,weight,bmi,pref,goal,w_key,d_key])

df = pd.DataFrame(rows, columns=["age","height","weight","bmi","diet_pref","goal","workout_plan","diet_plan"])
df.to_csv("fitness_synthetic_data.csv", index=False)

print("fitness_synthetic_data.csv generated:", len(df))

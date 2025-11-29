import pandas as pd
import numpy as np

np.random.seed(42)

# ---------------- CATEGORIES ---------------- #

diet_prefs = [
    "veg","nonveg","vegan","low_carb","low_fat","lactose_free","sugar_free"
]

goals = [
    "muscle_gain","lean_body_mass","fitness_level","weight_loss","flexibility",
    "endurance","stress_reduction","core_strength","sleep_improvement",
    "lower_blood_pressure","cardio_health","increase_energy",
    "boost_immunity","mental_focus","exercise_consistency"
]

# ---------------- TEMPLATE LIBRARY ---------------- #

workout_templates = {
    "W_strength":   ["Bench Press","Squat","Deadlift","Overhead Press","Pull Ups","Weighted Dips"],
    "W_fatloss":    ["HIIT","Burpees","Mountain Climbers","Jump Rope","Cycling","Sprints"],
    "W_flex":       ["Yoga Flow","Pilates Core","Mobility Drills","Hamstring Stretch","Cat-Cow"],
    "W_endurance":  ["Running","Swimming","Cycling Long","Rowing Machine","Stair Climb"],
    "W_core":       ["Plank","Leg Raises","Russian Twist","Hanging Knee Tucks","Side Plank"],
    "W_recovery":   ["Light Yoga","Deep Breathing","Walking 5km","Foam Rolling"],
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

# ---------------- DATA GENERATION ---------------- #

rows = []
size = 2000   # better dataset

for _ in range(size):

    age = np.random.randint(16, 65)
    height = np.random.randint(150, 200)
    weight = np.random.randint(45, 120)
    bmi = weight / ((height/100)**2)

    pref = np.random.choice(diet_prefs)

    goal1 = np.random.choice(goals)
    goal2 = np.random.choice(goals)
    while goal2 == goal1:
        goal2 = np.random.choice(goals)

    # WORKOUT mapping (based on either goal)
    if "muscle" in goal1 or "muscle" in goal2 or "mass" in goal1 or "mass" in goal2:
        w_key = "W_strength"
    elif "loss" in goal1 or "loss" in goal2 or "fat" in goal1 or "fat" in goal2:
        w_key = "W_fatloss"
    elif "flex" in goal1 or "flex" in goal2 or "stretch" in goal1 or "stretch" in goal2:
        w_key = "W_flex"
    elif "endurance" in goal1 or "endurance" in goal2 or "cardio" in goal1 or "cardio" in goal2:
        w_key = "W_endurance"
    elif "core" in goal1 or "core" in goal2:
        w_key = "W_core"
    else:
        w_key = np.random.choice(list(workout_templates.keys()))

    # DIET mapping (primary from diet pref)
    if pref == "vegan":
        d_key = "D_vegan"
    elif pref == "low_carb":
        d_key = "D_lowcarb"
    elif pref == "low_fat" or pref == "lactose_free":
        d_key = "D_lowfat"
    elif pref == "sugar_free":
        d_key = "D_sugarfree"
    else:
        d_key = np.random.choice(list(diet_templates.keys()))

    rows.append([age, height, weight, bmi, pref, goal1, goal2, w_key, d_key])


df = pd.DataFrame(rows, columns=[
    "age","height","weight","bmi",
    "diet_pref","goal1","goal2",
    "workout_plan","diet_plan"
])

df.to_csv("fitness_synthetic_data.csv", index=False)
print("Generated:", len(df), "rows")

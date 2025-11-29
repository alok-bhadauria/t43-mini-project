import pandas as pd
import numpy as np

np.random.seed(42)

diet_prefs = [
    "veg","nonveg","vegan","low_carb","low_fat","lactose_free","sugar_free"
]

goals = [
    "muscle_gain","lean_body_mass","fitness_level","weight_loss","flexibility",
    "endurance","stress_reduction","core_strength","sleep_improvement",
    "lower_blood_pressure","cardio_health","increase_energy",
    "boost_immunity","mental_focus","exercise_consistency"
]

workout_templates = {
    "W_strength":   ["Bench Press","Squat","Deadlift","Overhead Press","Pull Ups","Weighted Dips"],
    "W_fatloss":    ["HIIT","Burpees","Mountain Climbers","Jump Rope","Cycling","Sprints"],
    "W_flex":       ["Yoga Flow","Pilates Core","Mobility Drills","Hamstring Stretch","Cat-Cow"],
    "W_endurance":  ["Running","Swimming","Cycling Long","Rowing Machine","Stair Climb"],
    "W_core":       ["Plank","Leg Raises","Russian Twist","Hanging Knee Tucks","Side Plank"],
    "W_recovery":   ["Light Yoga","Deep Breathing","Walking 5km","Foam Rolling"],
}

# Balanced mapping using both goals
def assign_workout(g1,g2):
    pair = {g1,g2}
    if pair & {"muscle_gain","lean_body_mass"}:
        return "W_strength"
    if pair & {"weight_loss","fitness_level"}:
        return "W_fatloss"
    if pair & {"flexibility","stress_reduction","mental_focus"}:
        return "W_flex"
    if pair & {"endurance","cardio_health","increase_energy"}:
        return "W_endurance"
    if pair & {"core_strength"}:
        return "W_core"
    return "W_recovery"

diet_templates = {
    "D_mass": ["Oats","Milk","Peanut Butter","Banana","Paneer","Rice","Chicken"],
    "D_lean": ["Egg Whites","Brown Rice","Sweet Potato","Greek Yogurt","Sprouts"],
    "D_lowfat": ["Vegetable Soup","Steamed Broccoli","Salad","Corn","Apple"],
    "D_lowcarb": ["Eggs","Avocado","Paneer","Fish","Spinach","Almonds"],
    "D_vegan": ["Tofu","Soy Milk","Quinoa","Lentils","Beans","Hummus"],
    "D_sugarfree": ["Nuts","Cottage Cheese","Boiled Eggs","Vegetable Mix"],
    "D_bpcontrol": ["Oats","Banana","Leafy Greens","Beet Juice","Olive Oil"],
}

def assign_diet(pref):
    if pref=="vegan": return "D_vegan"
    if pref=="low_carb": return "D_lowcarb"
    if pref in ["low_fat","lactose_free"]: return "D_lowfat"
    if pref=="sugar_free": return "D_sugarfree"
    return np.random.choice(list(diet_templates.keys()))

rows=[]
size=3000  # expanded for better training

for _ in range(size):
    age=np.random.randint(16,65)
    height=np.random.randint(150,200)
    weight=np.random.randint(45,120)
    bmi=weight/((height/100)**2)

    pref=np.random.choice(diet_prefs)
    goal1=np.random.choice(goals)
    goal2=np.random.choice(goals)
    while goal2==goal1: goal2=np.random.choice(goals)

    rows.append([
        age,height,weight,bmi,pref,goal1,goal2,
        assign_workout(goal1,goal2),
        assign_diet(pref)
    ])

df=pd.DataFrame(rows,columns=[
    "age","height","weight","bmi",
    "diet_pref","goal1","goal2",
    "workout_plan","diet_plan"
])

df.to_csv("fitness_synthetic_data.csv",index=False)
print("Generated dataset →",len(df),"rows")
print("Distribution:\n",df['workout_plan'].value_counts())

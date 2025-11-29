// routes/viewRoutes.js
const express = require("express")
const router = express.Router()
const crypto = require("crypto")
const axios = require("axios")

const User = require("../models/User")
const Profile = require("../models/Profile")
const Workout = require("../models/Workout")
const Diet = require("../models/Diet")
const Log = require("../models/Log")
const AIPlan = require("../models/AIPlan")
const { savePlan } = require("../controllers/aiPlanController")


function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex")
}

function verifyPassword(password, hash) {
  if (!hash) return false
  return hashPassword(password) === hash
}

function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    req.session.toast = {
      type: "error",
      message: "Please login to continue."
    }
    return res.redirect("/login")
  }
  next()
}

function buildFocus(profile, logsCount) {
  if (!profile) return null

  const hM = profile.height || 170
  const wKg = profile.weight || 65
  const bmi = wKg / ((hM / 100) ** 2)

  const mainGoal = Array.isArray(profile.goal) && profile.goal.length
    ? profile.goal[0]
    : "fit"

  let focusArea = "Overall Fitness"
  if (mainGoal === "muscle_gain") focusArea = "Strength & Muscle Gain"
  else if (mainGoal === "lean") focusArea = "Fat Loss & Conditioning"

  const dietFocus = profile.diet_pref === "veg"
    ? "High protein vegetarian"
    : "Balanced mixed diet"

  const workoutMinutes = mainGoal === "muscle_gain" ? 55 : 40
  const stepsTarget = bmi > 27 ? 9000 : 8000
  const caloriesGuide = bmi > 27 ? 2100 : 2300

  const consistency = Math.min(95, 60 + (logsCount || 0) * 5)

  return {
    bmi: bmi.toFixed(1),
    focusArea,
    dietFocus,
    workoutMinutes,
    stepsTarget,
    caloriesGuide,
    consistency: Math.round(consistency)
  }
}

/* ---------------- HOME ---------------- */

router.get("/", async (req, res) => {
  let profile = null
  let focus = null

  try {
    if (req.session.user) {
      profile = await Profile.findOne({ userId: req.session.user.userId }).lean()
      const logsCount = await Log.countDocuments({ userId: req.session.user.userId })
      focus = buildFocus(profile, logsCount)
    }
  } catch (err) {
    console.error("Error loading home profile:", err.message)
  }

  res.render("index", {
    title: "AI Fitness Coach",
    profile,
    focus
  })
})

/* ---------------- DASHBOARD ---------------- */

router.get("/dashboard", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.userId
    const profile = await Profile.findOne({ userId }).lean()
    const logsCount = await Log.countDocuments({ userId })
    const focus = buildFocus(profile, logsCount)

    res.render("dashboard", {
      title: "Dashboard",
      user: req.session.user,
      profile,
      focus
    })
  } catch (err) {
    console.error("Dashboard error:", err.message)
    req.session.toast = {
      type: "error",
      message: "Could not load dashboard."
    }
    res.redirect("/")
  }
})

/* ---------------- AUTH VIEWS ---------------- */

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" })
})

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" })
})

/* ---------------- SIGNUP ---------------- */

router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body

    if (!fullname || !email || !password) {
      req.session.toast = {
        type: "error",
        message: "Full name, email and password are required."
      }
      return res.redirect("/signup")
    }

    const strong =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)

    if (!strong) {
      req.session.toast = {
        type: "error",
        message: "Password must be 8+ chars with capital letter, number and symbol."
      }
      return res.redirect("/signup")
    }

    const existing = await User.findOne({ email })
    if (existing) {
      req.session.toast = {
        type: "error",
        message: "Email already exists. Please login."
      }
      return res.redirect("/login")
    }

    const userId = Date.now().toString()
    const user = await User.create({
      userId,
      fullname,
      email,
      phone: phone || "",
      passwordHash: hashPassword(password)
    })

    req.session.user = {
      userId: user.userId,
      fullname: user.fullname,
      email: user.email
    }

    req.session.toast = {
      type: "success",
      message: "Welcome! Account created successfully."
    }

    res.redirect("/dashboard")
  } catch (err) {
    console.error("Signup error:", err.message)
    req.session.toast = {
      type: "error",
      message: "Something went wrong during signup."
    }
    res.redirect("/signup")
  }
})

/* ---------------- LOGIN ---------------- */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      req.session.toast = {
        type: "error",
        message: "Email and password are required."
      }
      return res.redirect("/login")
    }

    const user = await User.findOne({ email })
    if (!user) {
      req.session.toast = {
        type: "error",
        message: "User not found. Please sign up."
      }
      return res.redirect("/signup")
    }

    if (!verifyPassword(password, user.passwordHash)) {
      req.session.toast = {
        type: "error",
        message: "Incorrect password."
      }
      return res.redirect("/login")
    }

    req.session.user = {
      userId: user.userId,
      fullname: user.fullname,
      email: user.email
    }

    req.session.toast = {
      type: "success",
      message: "Logged in successfully."
    }

    res.redirect("/dashboard")
  } catch (err) {
    console.error("Login error:", err.message)
    req.session.toast = {
      type: "error",
      message: "Something went wrong during login."
    }
    res.redirect("/login")
  }
})

/* ---------------- LOGOUT ---------------- */

router.get("/logout", (req, res) => {
  if (!req.session) return res.redirect("/")
  req.session.destroy(() => {
    res.redirect("/")
  })
})

/* ---------------- PROFILE VIEW ---------------- */

router.get("/profile", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.userId
    const profile = await Profile.findOne({ userId }).lean()

    res.render("profile", {
      title: "Profile",
      user: req.session.user,
      profile
    })
  } catch (err) {
    console.error("Profile page error:", err.message)
    req.session.toast = {
      type: "error",
      message: "Could not load profile."
    }
    res.redirect("/dashboard")
  }
})

/* ---------------- PROFILE UPDATE ---------------- */

router.post("/profile", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.userId
    const {
      fullname,
      age,
      height,
      weight,
      diet_pref,
      goal,
      password
    } = req.body

    const user = await User.findOne({ userId })
    if (!user || !verifyPassword(password, user.passwordHash)) {
      req.session.toast = {
        type: "error",
        message: "Password incorrect. Profile not updated."
      }
      return res.redirect("/profile")
    }

    if (fullname && fullname !== user.fullname) {
      user.fullname = fullname
      await user.save()
      req.session.user.fullname = fullname
    }

    const goalsArray = Array.isArray(goal)
      ? goal.filter(Boolean)
      : goal
      ? [goal]
      : []

    const profileUpdate = {
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      diet_pref,
      goal: goalsArray
    }

    const profile = await Profile.findOneAndUpdate(
      { userId },
      profileUpdate,
      { upsert: true, new: true }
    )

    await Log.create({
      userId,
      updated: profileUpdate
    })

    req.session.toast = {
      type: "success",
      message: "Profile updated successfully."
    }

    res.redirect("/profile")
  } catch (err) {
    console.error("Profile update error:", err.message)
    req.session.toast = {
      type: "error",
      message: "Could not update profile."
    }
    res.redirect("/profile")
  }
})

/* ---------------- AI PANEL VIEW ---------------- */

router.get("/aipanel", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.userId
    const profile = await Profile.findOne({ userId }).lean()
    const latestPlan = await AIPlan.findOne({ userId }).sort({ generatedAt: -1 }).lean()

    res.render("aipanel", {
      title: "AI Plan Generator",
      user: req.session.user,
      profile,
      latestPlan
    })
  } catch (err) {
    console.error("AI panel error:", err.message)
    req.session.toast = {
      type: "error",
      message: "Could not load AI panel."
    }
    res.redirect("/dashboard")
  }
})

/* ---------------- AI PANEL GENERATE ---------------- */

router.post("/aipanel/generate", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.userId
    const profile = await Profile.findOne({ userId }).lean()

    if (!profile) {
      req.session.toast = {
        type: "error",
        message: "Please complete your profile before generating a plan."
      }
      return res.redirect("/profile")
    }

    const payload = {
      userId,
      age: Number(req.body.age || profile.age),
      height: Number(req.body.height || profile.height),
      weight: Number(req.body.weight || profile.weight),
      diet_pref: req.body.diet_pref || profile.diet_pref,
      goal: req.body.goal || (Array.isArray(profile.goal) && profile.goal.length ? profile.goal[0] : "fit")
    }

    const r = await axios.post("https://flask-for-ai-health-coach.onrender.com/predict", payload)
    const planData = r.data

    await AIPlan.create({
      userId,
      plan: planData
    })

    req.session.toast = {
      type: "success",
      message: "New 30 day AI plan generated."
    }

    res.redirect("/aipanel")
  } catch (err) {
    console.error("AI plan generate error:", err.message)
    req.session.toast = {
      type: "error",
      message: "Could not generate plan. Check Python server."
    }
    res.redirect("/aipanel")
  }
})

/* ---------------- AI PANEL SAVE (FOLLOW) ---------------- */

router.post("/aipanel/save", requireLogin, savePlan)

/* ---------------- WORKOUTS ---------------- */

router.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find({}).lean()
    res.render("workouts", {
      title: "Workouts",
      workouts: workouts || []
    })
  } catch (err) {
    console.error("Workouts page error:", err.message)
    res.render("workouts", {
      title: "Workouts",
      workouts: []
    })
  }
})

/* ---------------- DIETS ---------------- */

router.get("/diets", async (req, res) => {
  try {
    const diets = await Diet.find({}).lean()
    res.render("diets", {
      title: "Diet Helper",
      diets: diets || []
    })
  } catch (err) {
    console.error("Diets page error:", err.message)
    res.render("diets", {
      title: "Diet Helper",
      diets: []
    })
  }
})

/* ---------------- PROGRESS ---------------- */

router.get("/progress", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.userId
    const logs = await Log.find({ userId }).sort({ timestamp: 1 }).lean()

    const labels = logs.map(l => new Date(l.timestamp).toLocaleDateString("en-IN"))
    const weightData = logs.map(l => l.updated.weight)

    const bmiData = logs.map(l => {
      const h = l.updated.height, w = l.updated.weight
      return h && w ? Number((w / ((h/100)**2)).toFixed(2)) : null
    })

    // Calculate goal distribution
    let goalCount = {}
    logs.forEach(l => (l.updated.goal || []).forEach(g => {
      goalCount[g] = (goalCount[g] || 0) + 1
    }))

    const goalLabels = Object.keys(goalCount)
    const goalValues = Object.values(goalCount)

    res.render("progress", {
      title: "Progress",
      user: req.session.user,
      logs,
      labels,
      weightData,
      bmiData,
      goalLabels,   // ⬅ NOW SENT
      goalValues    // ⬅ NOW SENT
    })

  } catch (err) {
    console.error("Progress page error:", err.message)
    req.session.toast = { type:"error", message:"Could not load progress." }
    res.redirect("/dashboard")
  }
})


module.exports = router

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const ejsLayouts = require("express-ejs-layouts");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const dietRoutes = require("./routes/dietRoutes");
const logRoutes = require("./routes/logRoutes");
const aiRoutes = require("./routes/aiPlanRoutes");
const viewRoutes = require("./routes/viewRoutes");
const progressRoutes = require("./routes/progressRoutes");
const mentalRoutes = require("./routes/mentalRoutes");
const skincareRoutes = require("./routes/skincareRoutes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions"
});

app.use(session({
  secret: process.env.SESSION_SECRET || "session_key",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 24*60*60*1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax"
  }
}));

app.set("trust proxy", 1) 

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log("MongoDB Error:",err));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(ejsLayouts);
app.set("layout","layout");

app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads",express.static("uploads"));

app.use((req,res,next)=>{
  res.locals.currentUser = req.session.user || null;
  res.locals.toast = req.session.toast || null;
  delete req.session.toast;
  next();
});

app.use((req,res,next)=>{
  const open = ["/","/login","/signup","/workouts","/diets","/mental-health","/skin-care"]

  if (open.includes(req.path) || req.path.startsWith("/login") || req.path.startsWith("/signup") || req.session.user) {
    return next()
  }

  return res.redirect("/login")
})

app.use((req,res,next)=>{
  res.locals.path = req.path;
  next();
});

app.use("/",viewRoutes);
app.use("/progress", progressRoutes);
app.use("/mental-health", mentalRoutes);
app.use("/skin-care", skincareRoutes);

app.use("/api/users",userRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/workouts",workoutRoutes);
app.use("/api/diets",dietRoutes);
app.use("/api/logs",logRoutes);
app.use("/api/aiplan",aiRoutes);

app.use((req,res)=>res.status(404).render("index"));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Node server deployed on PORT ${PORT}`));

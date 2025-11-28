const express=require("express")
const r=express.Router()
const c=require("../controllers/workoutController")

r.post("/",c.createWorkout)
r.get("/",c.getWorkouts)
r.get("/:id",c.getWorkout)
r.put("/:id",c.updateWorkout)
r.delete("/:id",c.deleteWorkout)

module.exports=r

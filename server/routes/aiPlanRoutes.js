const express=require("express")
const r=express.Router()
const c=require("../controllers/aiPlanController")

r.post("/generate",c.generatePlan)
r.post("/save", c.savePlan);
r.get("/:id",c.getPlans)
r.delete("/:pid",c.deletePlan)

module.exports=r

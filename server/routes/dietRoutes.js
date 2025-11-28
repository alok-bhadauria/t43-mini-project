const express=require("express")
const r=express.Router()
const c=require("../controllers/dietController")

r.post("/",c.createDiet)
r.get("/",c.getDiets)
r.get("/:id",c.getDiet)
r.put("/:id",c.updateDiet)
r.delete("/:id",c.deleteDiet)

module.exports=r

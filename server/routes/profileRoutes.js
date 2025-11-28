const express=require("express")
const r=express.Router()
const c=require("../controllers/profileController")

r.get("/:id",c.getProfile)
r.post("/:id",c.createOrUpdateProfile)
r.delete("/:id",c.deleteProfile)

module.exports=r

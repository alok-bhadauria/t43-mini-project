const express=require("express")
const r=express.Router()
const c=require("../controllers/userController")

r.post("/",c.createUser)
r.get("/",c.getAllUsers)
r.get("/:id",c.getUser)
r.put("/:id",c.updateUser)
r.delete("/:id",c.deleteUser)

module.exports=r

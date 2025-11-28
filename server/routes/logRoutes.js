const express=require("express")
const r=express.Router()
const c=require("../controllers/logController")

r.get("/:id",c.getLogs)
r.delete("/:id/:logId",c.deleteLog)
r.delete("/clear/:id",c.clearLogs)

module.exports=r

const Log=require("../models/Log")

exports.getLogs=async(req,res)=>{
    const logs=await Log.find({userId:req.params.id}).sort({timestamp:-1})
    res.json(logs)
}

exports.deleteLog=async(req,res)=>{
    const l=await Log.findByIdAndDelete(req.params.logId)
    if(!l) return res.status(404).json({error:"Not found"})
    res.json({deleted:true})
}

exports.clearLogs=async(req,res)=>{
    await Log.deleteMany({userId:req.params.id})
    res.json({cleared:true})
}

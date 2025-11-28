const Profile=require("../models/Profile")
const Log=require("../models/Log")

exports.getProfile=async(req,res)=>{
    const p=await Profile.findOne({userId:req.params.id})
    if(!p) return res.status(404).json({error:"Profile not found"})
    res.json(p)
}

exports.createOrUpdateProfile=async(req,res)=>{
    const p=await Profile.findOneAndUpdate(
        {userId:req.params.id},
        req.body,
        {new:true,upsert:true}
    )
    const log=new Log({userId:req.params.id,updated:req.body})
    await log.save()
    res.json(p)
}

exports.deleteProfile=async(req,res)=>{
    const p=await Profile.findOneAndDelete({userId:req.params.id})
    if(!p) return res.status(404).json({error:"Profile not found"})
    res.json({deleted:true})
}

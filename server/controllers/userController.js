const User=require("../models/User")

exports.createUser=async(req,res)=>{
    try{
        const u=new User(req.body)
        await u.save()
        res.json(u)
    }catch(e){res.status(400).json({error:e.message})}
}

exports.getAllUsers=async(req,res)=>{
    const users=await User.find()
    res.json(users)
}

exports.getUser=async(req,res)=>{
    const u=await User.findOne({userId:req.params.id})
    if(!u) return res.status(404).json({error:"User not found"})
    res.json(u)
}

exports.updateUser=async(req,res)=>{
    const u=await User.findOneAndUpdate({userId:req.params.id},req.body,{new:true})
    if(!u) return res.status(404).json({error:"User not found"})
    res.json(u)
}

exports.deleteUser=async(req,res)=>{
    const u=await User.findOneAndDelete({userId:req.params.id})
    if(!u) return res.status(404).json({error:"User not found"})
    res.json({deleted:true})
}

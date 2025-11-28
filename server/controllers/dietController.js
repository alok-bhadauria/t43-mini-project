const Diet=require("../models/Diet")

exports.createDiet=async(req,res)=>{
    try{
        const d=new Diet(req.body)
        await d.save()
        res.json(d)
    }catch(e){res.status(400).json({error:e.message})}
}

exports.getDiets=async(req,res)=>{
    const d=await Diet.find()
    res.json(d)
}

exports.getDiet=async(req,res)=>{
    const d=await Diet.findById(req.params.id)
    if(!d) return res.status(404).json({error:"Not found"})
    res.json(d)
}

exports.updateDiet=async(req,res)=>{
    const d=await Diet.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!d) return res.status(404).json({error:"Not found"})
    res.json(d)
}

exports.deleteDiet=async(req,res)=>{
    const d=await Diet.findByIdAndDelete(req.params.id)
    if(!d) return res.status(404).json({error:"Not found"})
    res.json({deleted:true})
}

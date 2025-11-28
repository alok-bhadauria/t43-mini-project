const Workout=require("../models/Workout")

exports.createWorkout=async(req,res)=>{
    try{
        const w=new Workout(req.body)
        await w.save()
        res.json(w)
    }catch(e){res.status(400).json({error:e.message})}
}

exports.getWorkouts=async(req,res)=>{
    const w=await Workout.find()
    res.json(w)
}

exports.getWorkout=async(req,res)=>{
    const w=await Workout.findById(req.params.id)
    if(!w) return res.status(404).json({error:"Not found"})
    res.json(w)
}

exports.updateWorkout=async(req,res)=>{
    const w=await Workout.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!w) return res.status(404).json({error:"Not found"})
    res.json(w)
}

exports.deleteWorkout=async(req,res)=>{
    const w=await Workout.findByIdAndDelete(req.params.id)
    if(!w) return res.status(404).json({error:"Not found"})
    res.json({deleted:true})
}

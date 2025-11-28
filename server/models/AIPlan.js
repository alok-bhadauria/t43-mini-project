const mongoose=require("mongoose")

const aiPlanSchema=new mongoose.Schema(
{
  userId:{type:String,required:true,index:true},
  generatedAt:{type:Date,default:Date.now},
  plan:{
    workouts:[String],
    diet:[String],
    bmi: Number
  }
},
{
  collection:"ai_plans"
}
)

module.exports=mongoose.model("AIPlan",aiPlanSchema)

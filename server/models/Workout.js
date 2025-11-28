const mongoose=require("mongoose")

const workoutSchema=new mongoose.Schema(
{
  workout_name:{type:String,required:true},
  muscle_group:{type:String,required:true},
  difficulty:{type:String,required:true},
  benefit:{type:String,required:true},
  instructions:{type:String,required:true}
},
{
  collection:"workouts"
}
)

module.exports=mongoose.model("Workout",workoutSchema)

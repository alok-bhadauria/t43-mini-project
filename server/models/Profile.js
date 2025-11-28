const mongoose=require("mongoose")

const profileSchema=new mongoose.Schema(
{
  userId:{type:String,required:true,index:true},
  age:{type:Number,required:true},
  height:{type:Number,required:true},
  weight:{type:Number,required:true},
  diet_pref:{type:String,required:true},
  goal:[{type:String,required:true}]
},
{
  collection:"profile",
  timestamps:true
}
)

module.exports=mongoose.model("Profile",profileSchema)

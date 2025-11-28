const mongoose=require("mongoose")

const logSchema=new mongoose.Schema(
{
  userId:{type:String,required:true,index:true},
  timestamp:{type:Date,default:Date.now},
  updated:{
    age:Number,
    height:Number,
    weight:Number,
    diet_pref:String,
    goal:[String]
  }
},
{
  collection:"logs"
}
)

module.exports=mongoose.model("Log",logSchema)

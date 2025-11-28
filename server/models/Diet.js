const mongoose=require("mongoose")

const dietSchema=new mongoose.Schema(
{
  item_name:{type:String,required:true},
  type:{type:String,required:true},
  nutrient:{type:String,required:true},
  benefits:{type:String,required:true}
},
{
  collection:"diets"
}
)

module.exports=mongoose.model("Diet",dietSchema)

const AIPlan=require("../models/AIPlan")
const axios=require("axios")

exports.generatePlan = async (req, res) => {
   try {
      const { age, height, weight, diet_pref, goal1, goal2 } = req.body;
      const userId = req.session.user.userId;

      const goals = [goal1, goal2].filter(Boolean);
      if (!age || !height || !weight || !diet_pref || goals.length !== 2) {
         req.session.toast = { type:"error", message:"Incomplete profile or goals." };
         return res.redirect("/profile");
      }

      // Send data to Flask ML API
      const r = await axios.post("https://flask-for-ai-health-coach.onrender.com/predict", {
         age:+age,
         height:+height,
         weight:+weight,
         diet_pref,
         goal1,
         goal2
      });

      const plan = {
         workouts: r.data.workouts,
         diet: r.data.diet,
         bmi: r.data.bmi
      };

      await AIPlan.create({ userId, plan });

      req.session.toast = { type:"success", message:"New personalized AI plan generated!" };
      return res.redirect("/aipanel");

   } catch (err) {
      console.log("AI PLAN ERROR:", err.message);
      req.session.toast = { type:"error", message:"AI model failed — check Python server." };
      return res.redirect("/aipanel");
   }
};


exports.getPlans=async(req,res)=>{
    const p=await AIPlan.find({userId:req.params.id}).sort({generatedAt:-1})
    res.json(p)
}

exports.deletePlan=async(req,res)=>{
    const p=await AIPlan.findByIdAndDelete(req.params.pid)
    if(!p) return res.status(404).json({error:"Not found"})
    res.json({deleted:true})
}

exports.savePlan = async (req,res)=>{
    const plan = await AIPlan.findOne({ userId:req.session.user._id }).sort({generatedAt:-1});
    if(plan){
        const Profile = require("../models/Profile");
        await Profile.updateOne(
            { userId:req.session.user._id },
            { $set:{ activePlan: plan.plan }}
        );
    }

    req.session.toast = { type:"success", message:"This AI plan is now your active 30 day template." }
    return res.redirect("/dashboard")
}

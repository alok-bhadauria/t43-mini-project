const MentalHealth = require("../models/MentalHealth");

exports.getMentalData = async (req, res) => {
  const data = await MentalHealth.find();
  res.render("mental_health", { title:"Mental Health", data });
};

const SkinCare = require("../models/SkinCare");

exports.getSkinData = async (req, res) => {
  const data = await SkinCare.find();
  res.render("skin_care", { title:"Skin Care", data });
};

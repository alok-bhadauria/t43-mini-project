const mongoose = require("mongoose");

const skinSchema = new mongoose.Schema({
    item_name: String,
    type: String,
    benefit: String,
    usage: String
}, { collection: "skin_care" });

module.exports = mongoose.model("SkinCare", skinSchema);

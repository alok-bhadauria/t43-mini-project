const mongoose = require("mongoose");

const mentalSchema = new mongoose.Schema({
    title: String,
    category: String,
    benefit: String,
    practice: String
}, { collection: "mental_health" });

module.exports = mongoose.model("MentalHealth", mentalSchema);

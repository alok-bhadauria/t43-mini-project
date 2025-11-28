// models/User.js
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    passwordHash: { type: String }
  },
  {
    collection: "users",
    timestamps: true
  }
)

module.exports = mongoose.model("User", userSchema)

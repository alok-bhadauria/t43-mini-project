const r = require("express").Router();
const c = require("../controllers/mentalController");

r.get("/", c.getMentalData);
module.exports = r;

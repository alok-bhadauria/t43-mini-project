const r = require("express").Router();
const c = require("../controllers/skincareController");

r.get("/", c.getSkinData);
module.exports = r;

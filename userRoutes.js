const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

//  READ All Users
router.get("/", UserController.getAll);

//  READ User by ID
router.get("/:id", UserController.getById);

//  CREATE User
router.post("/", UserController.create);

//  UPDATE User
router.put("/:id", UserController.update);

//  DELETE User
router.delete("/:id", UserController.delete);

module.exports = router;

// controllers/userController.js
const UserModel = require("../models/userModel");

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Error fetching users" });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Error fetching user" });
    }
  },

  async create(req, res) {
    try {
      const newUser = await UserModel.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: "Error creating user" });
    }
  },

  async update(req, res) {
    try {
      const updated = await UserModel.updateUser(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Error updating user" });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await UserModel.deleteUser(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Error deleting user" });
    }
  },
};

module.exports = UserController;

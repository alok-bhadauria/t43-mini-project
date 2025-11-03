// controllers/feedbackController.js
const FeedbackModel = require("../models/feedbackModel");

// 🧠 Handles feedback-related requests
const FeedbackController = {
  // ➕ Create Feedback
  async create(req, res) {
    try {
      const newFeedback = await FeedbackModel.createFeedback(req.body);
      res.status(201).json(newFeedback);
    } catch (err) {
      res.status(500).json({ error: "Error creating feedback" });
    }
  },

  // 📋 Get All Feedback
  async getAll(req, res)   {
    try {
      const feedbacks = await FeedbackModel.getAllFeedback();
      res.json(feedbacks);
    } catch (err) {
      res.status(500).json({ error: "Error fetching feedback" });
    }
  },

  // 👤 Get Feedback by User
  async getByUser(req, res) {
    try  {
      const { user_id } = req.params;
      const feedbacks = await FeedbackModel.getFeedbackByUser(user_id);
      res.json(feedbacks);
     } catch (err) {
      res.status(500).json({ error: "Error fetching user feedback" });
    }
  },

  // ✏️ Update Feedback
  async update(req,res) {
    try {
      const { id } = req.params;
      const updated = await FeedbackModel.updateFeedback(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Error updating feedback" });
    }
  },

  // 🗑️ Delete Feedback
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await FeedbackModel.deleteFeedback(id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Error deleting feedback" });
    }
  },
};

module.exports=FeedbackController;


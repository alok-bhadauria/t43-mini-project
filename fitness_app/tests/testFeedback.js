const FeedbackModel = require("../models/feedbackModel.js");
const UserModel = require("../models/userModel.js");
const pool = require("../db.js");

async function testFeedback() {
  try {
    // Step 1 — Fetch users
    const users = await UserModel.getAllUsers();
    if (!users || users.length === 0) return console.log("No users found.");
    const user = users[0];
    console.log("Using user:", user);

    // Step 2 — Create feedback
    let feedback = await FeedbackModel.createFeedback({
      user_id: user.id,
      rating: 5,
      comments: "Great experience using the app!",
    });
    console.log("Feedback created:", feedback);

    // Step 3 — Fetch all feedback
    let allFeedback = await FeedbackModel.getAllFeedback();
    console.log("All feedback:", allFeedback);

    // Step 4 — Fetch feedback by user
    const userFeedback = await FeedbackModel.getFeedbackByUser(user.id);
    console.log(`Feedback for user ${user.id}:`, userFeedback);

    // Step 5 — Update feedback
    const updated = await FeedbackModel.updateFeedback(feedback.id, {
      comments: "Amazing app, keep improving!",
      rating: 4,
    });
    console.log("Feedback updated:", updated);

    // Step 6 — Delete feedback
    const deleted = await FeedbackModel.deleteFeedback(feedback.id);
    console.log("Feedback deleted:", deleted);

    // Step 7 — Verify deletion
    allFeedback = await FeedbackModel.getAllFeedback();
    console.log("Feedback after deletion:", allFeedback);

  } catch (err) {
    console.error("Error testing feedback:", err);
  } finally {
    await pool.end();
  }
}

testFeedback();

const ReminderModel = require("../models/reminderModel.js");
const UserModel = require("../models/userModel.js");
const pool = require("../db.js");

async function testReminders() {
  try {
    // Step 1 — Fetch user
    const users = await UserModel.getAllUsers();
    const user = users[0];
    if (!user) return console.log("No user found.");
    console.log("Using user:", user);

    // Step 2 — Create reminder
    let reminder = await ReminderModel.createReminder({
      user_id: user.id,
      message: "Drink Water",
      remind_at: new Date(Date.now() + 60 * 60 * 1000),
      type: "hydration",
    });
    console.log("Reminder created:", reminder);

    // Step 3 — Get all reminders
    let reminders = await ReminderModel.getAllReminders(user.id);
    console.log("All reminders:", reminders);

    // Step 4 — Get reminder by ID
    const fetched = await ReminderModel.getReminderById(reminder.id);
    console.log("Fetched reminder by ID:", fetched);

    // Step 5 — Update reminder
    const updated = await ReminderModel.updateReminder(reminder.id, {
      message: "Drink Protein Shake",
    });
    console.log("Reminder updated:", updated);

    // Step 6 — Delete reminder
    const deleted = await ReminderModel.deleteReminder(reminder.id);
    console.log("Reminder deleted:", deleted);

    // Step 7 — Verify deletion
    reminders = await ReminderModel.getAllReminders(user.id);
    console.log("All reminders after deletion:", reminders);

  } catch (err) {
    console.error("Error testing reminders:", err);
  } finally {
    await pool.end();
  }
}

testReminders();

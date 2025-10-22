const WearableModel = require("../models/wearableModel.js");
const UserModel = require("../models/userModel.js");
const pool = require("../db.js");

async function testWearables() {
  try {
    console.log("Starting Wearable Model Tests...\n");

    // Step 1 — Fetch user
    const users = await UserModel.getAllUsers();
    const user = users[0];
    if (!user) return console.warn("No users found.");
    console.log("Using user:", user);

    // Step 2 — Add wearable
    const wearable = await WearableModel.addWearable({
      user_id: user.id,
      device_name: "FitBit Charge 5",
      steps: 5000,
      heart_rate: 72,
      sleep_hours: 7.5,
    });
    console.log("Wearable added:", wearable);

    // Step 3 — Fetch all wearables
    const allWearables = await WearableModel.getAllWearables(user.id);
    console.log(`Total wearables: ${allWearables.length}`, allWearables);

    // Step 4 — Update wearable
    const updatedWearable = await WearableModel.updateWearable(wearable.id, {
      steps: 8000,
      heart_rate: 75,
      sleep_hours: 8,
      device_name: "FitBit Charge 6",
    });
    console.log("Updated wearable:", updatedWearable);

    // Step 5 — Fetch wearable by ID
    const fetchedWearable = await WearableModel.getWearableById(wearable.id);
    console.log("Fetched wearable:", fetchedWearable);

    // Step 6 — Delete wearable
    const deletedWearable = await WearableModel.deleteWearable(wearable.id);
    console.log("Wearable deleted:", deletedWearable);

    // Step 7 — Verify deletion
    const afterDelete = await WearableModel.getAllWearables(user.id);
    console.log(`Wearables after deletion: ${afterDelete.length}`);

  } catch (err) {
    console.error("Error testing wearables:", err);
  } finally {
    await pool.end();
    console.log("\nWearable tests completed. Connection closed.");
  }
}

testWearables();

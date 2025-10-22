const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const pool = require("../db.js");

async function testUsers() {
  try {
    console.log("Starting User Model Tests...\n");

    // Step 1 — Create user
    const email = "testuser@example.com";
    const password = "test1234";
    const password_hash = await bcrypt.hash(password, 10);

    let user = await UserModel.createUser({
      email,
      name: "Test User",
      password_hash,
      age: 25,
      weight: 70,
      height: 175,
      goals: "Fitness",
      preferences: { focus: "strength", level: "beginner" }
    });

    if (!user) {
      user = (await UserModel.getAllUsers()).find(u => u.email === email);
      console.log("Existing user fetched:", user);
    } else {
      console.log("User created successfully:", user);
    }

    // Step 2 — Fetch user by ID
    const fetchedUser = await UserModel.getUserById(user.id);
    console.log("Fetched user by ID:", fetchedUser);

    // Step 3 — Update user
    const updatedUser = await UserModel.updateUser(user.id, {
      weight: 72,
      goals: "Build Muscle"
    });
    console.log("Updated user record:", updatedUser);

    // Step 4 — Fetch all users
    const allUsers = await UserModel.getAllUsers();
    console.log(`Total users in DB: ${allUsers.length}`);
    console.log(allUsers);

    // Step 5 — Delete user (optional)
    // const deletedUser = await UserModel.deleteUser(user.id);
    // console.log("Deleted user:", deletedUser);

  } catch (err) {
    console.error("Error during user tests:", err);
  } finally {
    await pool.end();
    console.log("\nUser tests completed. Connection closed.");
  }
}

testUsers();

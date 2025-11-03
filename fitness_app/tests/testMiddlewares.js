const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const pool = require("../db.js");

dotenv.config();

console.log("Testing all middleware files...\n");

(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL database\n");

    const middlewaresPath = path.join(__dirname, "../middlewares");

    if (!fs.existsSync(middlewaresPath)) {
      console.log("No /middlewares folder found!");
      process.exit(0);
    }

    const files = fs.readdirSync(middlewaresPath).filter((f) => f.endsWith(".js"));
    let successCount = 0;

    for (const file of files) {
      const filePath = path.join(middlewaresPath, file);

      try {
        const middlewareModule = require(filePath);
        const exportedKeys = Object.keys(middlewareModule);

        if (exportedKeys.length === 0) {
          console.log(`${file}: No exports found`);
          continue;
        }

        const req = { headers: {}, body: {}, query: {}, params: {} };
        const res = { status: () => res, json: () => res };
        const next = () => {};

        let validCount = 0;

        for (const key of exportedKeys) {
          const fn = middlewareModule[key];
          if (typeof fn === "function") {
            try {
              fn(req, res, next);
              console.log(`${file} → ${key}: OK`);
              validCount++;
            } catch (err) {
              console.log(`${file} → ${key}: Error executing - ${err.message}`);
            }
          } else {
            console.log(`${file} → ${key}: Not a function`);
          }
        }

        if (validCount > 0) successCount++;
      } catch (err) {
        console.log(`${file}: Failed to load - ${err.message}`);
      }
    }

    console.log("\nSummary:");
    console.log(`${successCount}/${files.length} middleware files passed basic tests.`);
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

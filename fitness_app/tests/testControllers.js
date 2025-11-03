const fs = require("fs");
const path = require("path");

const controllersDir = path.join(__dirname, "../controllers");

const controllerFiles = fs
  .readdirSync(controllersDir)
  .filter((file) => file.endsWith("Controller.js"));

console.log("Testing all controller files...\n");

let total = 0;
let passed = 0;

controllerFiles.forEach((file) => {
  const filePath = path.join(controllersDir, file);
  total++;

  try {
    const controller = require(filePath);

    if (!controller || typeof controller !== "object") {
      console.error(`${file}: Export is not an object`);
      return;
    }

    const functionKeys = Object.keys(controller).filter(
      (key) => typeof controller[key] === "function"
    );

    if (functionKeys.length === 0) {
      console.error(`${file}: No functions exported`);
    } else {
      console.log(`${file}: Loaded successfully with ${functionKeys.length} handlers`);
      passed++;
    }
  } catch (err) {
    console.error(`Error loading ${file}:`, err.message);
  }
});

console.log(`\nSummary: ${passed}/${total} controllers loaded successfully.`);

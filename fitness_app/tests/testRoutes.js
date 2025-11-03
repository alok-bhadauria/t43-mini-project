const fs = require("fs");
const path = require("path");
const express = require("express");
const chalk = require("chalk");

console.log(chalk.cyan("🔍 Testing all route files...\n"));

const routesPath = path.join(__dirname, "../routes");
const routeFiles = fs.readdirSync(routesPath).filter(f => f.endsWith("Routes.js"));

let successCount = 0;
let failureCount = 0;

function isExpressRouter(router) {
  const methods = ["get", "post", "put", "delete", "use"];
  return methods.every(m => typeof router[m] === "function");
}

const app = express();
app.use(express.json());

for (const file of routeFiles) {
  const routeName = file.replace(".js", "");
  const filePath = path.join(routesPath, file);

  try {
    const routeModule = require(filePath);

    if (!isExpressRouter(routeModule)) {
      console.log(chalk.red(`${file}: Not a valid Express router`));
      failureCount++;
      continue;
    }

    const mountPath = `/${routeName.replace("Routes", "")}`;
    app.use(mountPath, routeModule);

    const stack = routeModule.stack || [];
    const endpoints = stack
      .filter(layer => layer.route)
      .map(layer => {
        const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
        const path = layer.route.path;
        return `${methods} ${path}`;
      });

    console.log(chalk.green(`${file}: Loaded successfully`));
    console.log(chalk.gray(`   → Mounted at ${mountPath}`));
    if (endpoints.length > 0) {
      console.log(chalk.yellow(`   → Endpoints:`));
      endpoints.forEach(e => console.log(chalk.yellow(`     • ${e}`)));
    } else {
      console.log(chalk.gray(`   (no explicit routes found)`));
    }

    successCount++;
  } catch (err) {
    console.log(chalk.red(`${file}: Failed to load`));
    console.error(chalk.red(err.message));
    failureCount++;
  }
}

console.log("\nSummary:");
console.log(chalk.green(`${successCount} routes loaded successfully`));
if (failureCount > 0) console.log(chalk.red(`${failureCount} routes failed`));
else console.log(chalk.green("All routes passed basic and structural tests!"));

);

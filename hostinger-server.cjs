const { spawn } = require("node:child_process");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const app = spawn(npmCommand, ["run", "start"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit"
});

app.on("exit", (code) => {
  process.exit(code ?? 1);
});

process.on("SIGTERM", () => app.kill("SIGTERM"));
process.on("SIGINT", () => app.kill("SIGINT"));

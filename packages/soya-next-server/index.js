#! /usr/bin/env node

const spawn = require("cross-spawn");
const { status } = spawn.sync("node", [require.resolve("../index.js")], {
  stdio: "inherit"
});
process.exit(status);

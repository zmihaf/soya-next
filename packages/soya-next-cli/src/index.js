/* eslint-disable no-console, no-sync */
import fs from "fs-extra";
import path from "path";
import spawn from "cross-spawn";
import yargs from "yargs";

process.on("unhandledRejection", err => {
  throw err;
});

const argv = yargs
  .version()
  .usage("Usage: $0 <project-directory>")
  .option("verbose", {
    type: "boolean",
    describe: "Show more details",
    default: false
  })
  .alias("help", "h")
  .alias("version", "v")
  .help()
  .example(
    "$0 todo-app",
    'Create "todo-app" project relative to current directory'
  )
  .strict().argv;
const projectDirectory = argv._[0];

const dependencies = [
  "config@^1.30.0",
  "express@^4.16.2",
  "next@^5.0.0",
  "prop-types@^15.6.1",
  "react@^16.2.0",
  "react-apollo@^2.0.4",
  "react-cookie@^2.1.4",
  "react-dom@^16.2.0",
  "react-redux@^5.0.7",
  "redux@^3.7.2",
  "soya-next@^0.5.0",
  "soya-next-server@^0.5.0"
];

const devDependencies = ["soya-next-scripts@^0.5.0"];

const install = (cmd, dependencies, { dev = false, exact = true } = {}) => {
  const args = [];
  if (cmd === "yarn") {
    args.push("add");
  } else {
    args.push("install");
  }
  if (dev) args.push("-D");
  if (exact) args.push("-E");
  args.push(...dependencies);
  if (argv.verbose) {
    args.push("--verbose");
  }
  const install = spawn.sync(cmd, args, { stdio: "inherit" });
  if (install.status !== 0) {
    process.exit(status);
  }
};

if (projectDirectory) {
  const root = path.resolve(projectDirectory);
  const name = path.basename(root);
  const cwd = process.cwd();

  console.log(`Creating ${name} in ${root}.`);
  console.log();

  fs.ensureDirSync(projectDirectory);
  fs
    .copy(path.resolve(__dirname, "../templates"), root, { overwrite: false })
    .then(async () => {
      try {
        await fs.move(
          path.join(root, "gitignore"),
          path.join(root, ".gitignore")
        );
      } catch (err) {
        if (err.code === "EEXIST") {
          fs.unlink(path.join(root, "gitignore"));
        } else {
          throw err;
        }
      }
    });
  fs.writeJsonSync(
    path.join(root, "package.json"),
    {
      name,
      version: "1.0.0",
      license: "MIT",
      scripts: {
        analyze: "ANALYZE=both soya-next-scripts build",
        "analyze:browser": "ANALYZE=browser soya-next-scripts build",
        "analyze:server": "ANALYZE=server soya-next-scripts build",
        build: "soya-next-scripts build",
        dev: "soya-next-scripts dev",
        eject: "soya-next-scripts eject",
        start: "soya-next-server",
        test: "soya-next-scripts test"
      }
    },
    { spaces: 2 }
  );

  process.chdir(root);

  const { status } = spawn.sync("which", ["yarn"], { stdio: "ignore" });
  const cmd = status === 0 ? "yarn" : "npm";

  console.log("Installing dependencies.");
  console.log();

  install(cmd, dependencies);

  console.log();
  console.log("Installing dev dependencies.");
  console.log();

  install(cmd, devDependencies, { dev: true });

  console.log();
  console.log(`Successfully created ${name} in ${root}.`);
  console.log("Run the following commands to start the app:");
  console.log();
  let target;
  if (path.isAbsolute(projectDirectory)) {
    target = root;
  } else {
    target = path.relative(cwd, root);
  }
  if (target !== "") {
    console.log(`  cd ${target}`);
  }
  console.log(`  ${cmd} start`);
  console.log();
} else {
  yargs.showHelp();
}

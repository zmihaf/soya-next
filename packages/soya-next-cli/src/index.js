/* eslint-disable no-console, no-sync */
import fs from 'fs-extra';
import path from 'path';
import spawn from 'cross-spawn';
import yargs from 'yargs';

process.on('unhandledRejection', err => {
  throw err;
});

const argv = yargs
  .version()
  .usage('Usage: $0 <project-directory>')
  .option('verbose', {
    type: 'boolean',
    describe: 'Show more details',
    default: false,
  })
  .alias('help', 'h')
  .alias('version', 'v')
  .help()
  .example('$0 todo-app', 'Create "todo-app" project relative to current directory')
  .strict()
  .argv;
const projectDirectory = argv._[0];

const dependencies = [
  'next@beta',
  'prop-types',
  'react',
  'react-cookie',
  'react-dom',
  'react-redux',
  'redux',
  'soya-next',
  'soya-next-scripts',
];

if (projectDirectory) {
  const root = path.resolve(projectDirectory);
  const name = path.basename(root);
  const cwd = process.cwd();

  console.log(`Creating ${name} in ${root}.`);
  console.log();

  fs.ensureDirSync(projectDirectory);
  fs.copy(path.resolve(__dirname, '../templates'), root, { overwrite: false })
    .then(async () => {
      try {
        await fs.move(path.join(root, 'gitignore'), path.join(root, '.gitignore'));
      } catch (err) {
        if (err.code === 'EEXIST') {
          fs.unlink(path.join(root, 'gitignore'));
        } else {
          throw err;
        }
      }
    });
  fs.writeJsonSync(path.join(root, 'package.json'), {
    name,
    version: '1.0.0',
    scripts: {
      build: 'soya-next-scripts build',
      eject: 'soya-next-scripts eject',
      start: 'soya-next-scripts start',
      test: 'soya-next-scripts test',
    },
  }, { spaces: 2 });

  process.chdir(root);

  console.log('Installing dependencies.');
  console.log();

  let cmd;
  const args = [];
  const { status } = spawn.sync('which', ['yarn'], { stdio: 'ignore' });
  if (status === 0) {
    cmd = 'yarn';
    args.push('add');
  } else {
    cmd = 'npm';
    args.push('install', '--save');
  }
  args.push(...dependencies);
  if (argv.verbose) {
    args.push('--verbose');
  }
  const install = spawn.sync(cmd, args, { stdio: 'inherit' });
  if (install.status !== 0) {
    process.exit(status);
  }

  console.log();
  console.log(`Successfully created ${name} in ${root}.`);
  console.log('Run the following commands to start the app:');
  console.log();
  let target;
  if (path.isAbsolute(projectDirectory)) {
    target = root;
  } else {
    target = path.relative(cwd, root);
  }
  if (target !== '') {
    console.log(`  cd ${target}`);
  }
  console.log(`  ${cmd} start`);
  console.log();
} else {
  yargs.showHelp();
}

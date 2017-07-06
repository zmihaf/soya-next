import fs from 'fs-extra';
import path from 'path';
import spawn from 'cross-spawn';
import yargs from 'yargs';

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
  'express',
  'next',
  'prop-types',
  'react',
  'react-cookie',
  'react-dom',
  'react-redux',
  'redux',
  'soya-next',
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
    main: 'server.js',
    scripts: {
      build: 'next build',
      start: 'node .',
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
  spawn.sync(cmd, args, { stdio: 'inherit' });

  console.log();
  console.log(`Successfully created ${name} in ${root}.`);
  console.log('Run the following commands to start the app:');
  console.log();
  if (cwd !== root) {
    console.log(`  cd ${name}`);
  }
  console.log(`  ${cmd} start`);
  console.log();
} else {
  yargs.showHelp();
}

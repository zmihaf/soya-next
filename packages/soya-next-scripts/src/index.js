const spawn = require('cross-spawn');
const script = process.argv[2];
const args = process.argv.slice(3);

switch (script) {
  case 'build':
  case 'start':
  case 'test': {
    const { status } = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    process.exit(status);
    break;
  }
  case 'eject': {
    const { status } = spawn.sync(
      'node',
      [require.resolve(`./${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    process.exit(status);
    break;
  }
  default:
    console.log(`Unknown script "${script}".`);
    break;
}

process.on('unhandledRejection', err => {
  throw err;
});

process.env.BABEL_ENV = process.env.BABEL_ENV || 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const { realpathSync } = require('fs');
const { resolve } = require('path');
// @remove-on-eject-begin
const conf = require('../next.config');
// @remove-on-eject-end
const build = require('next/dist/server/build').default;

const dir = resolve(realpathSync(process.cwd()));
build(
  dir
  // @remove-on-eject-begin
  , conf
  // @remove-on-eject-end
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

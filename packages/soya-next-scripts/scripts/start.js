process.on('unhandledRejection', err => {
  console.error(err);
});

const express = require('express');
const next = require('next');
const { join } = require('path');
const { createRouter } = require('soya-next/server/router');
const { soya } = require('soya-next/server/config');
// @remove-on-eject-begin
const conf = require('../next.config');
// @remove-on-eject-end

const { appDir, host, port } = require('../config/_default');
const dev = typeof soya.config.dev !== 'undefined' ? soya.config.dev : process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  // @remove-on-eject-begin
  conf,
  // @remove-on-eject-end
});
const buildSoya = require('./utils/build-soya');

app.prepare()
  .then(() => dev ? buildSoya() : null)
  .then(() => require.resolve('soya'))
  .then(
    stats => stats ? require(join(appDir, 'build/server', 'index.js')).default : null,
    err => {
      if (err.code !== 'MODULE_NOT_FOUND') {
        throw err;
      }
    }
  )
  .then((soyaMiddleware = null) => {
    const server = express();
    if (soyaMiddleware !== null) {
      server.use(soyaMiddleware);
    }
    server.use('/_soya/:path(*)', (req, res) => {
      const p = join(app.dir, app.dist, 'dist', 'static', req.params.path);
      app.serveStatic(req, res, p);
    });
    server.use(createRouter(app, soya.config));
    server.listen(port, host, err => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(`> Ready on ${host}:${port}`);
    });
  })
  .catch(ex => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });

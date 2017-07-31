process.on('unhandledRejection', err => {
  console.error(err);
});

const express = require('express');
const next = require('next');
const { createRouter } = require('soya-next/server/router');
const { soya } = require('soya-next/server/config');
// @remove-on-eject-begin
const conf = require('../next.config');
// @remove-on-eject-end

const host = soya.config.host || '0.0.0.0';
const port = soya.config.port || 3000;
const dev = typeof soya.config.dev !== 'undefined' ? soya.config.dev : process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  // @remove-on-eject-begin
  conf,
  // @remove-on-eject-end
});

app.prepare()
  .then(() => {
    const server = express();
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

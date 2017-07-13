const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const { createRouter } = require('soya-next/server/router');
const redirects = require('./redirects');
const routes = require('./routes');
const { soya } = require('soya-next/server/config');

app.prepare()
  .then(() => {
    const server = express();
    server.use(createRouter(app, { routes, redirects }));
    server.listen(soya.config.port, err => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${soya.config.port}`);
    });
  })
  .catch(ex => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });

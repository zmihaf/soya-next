const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const { createRouter } = require('soya-next');
const routerOptions = {
  defaultLocale: 'id-id',
  siteLocales: [
    'id-id',
    'en-id',
  ],
};

app.prepare()
  .then(() => {
    const server = express();
    server.use(createRouter(app, routerOptions));
    server.listen(3000, err => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });

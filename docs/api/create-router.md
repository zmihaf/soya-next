# `createRouter(app, [options])`

Creates locale aware express router with universal cookie and gzip compression enabled.

> Gzip compression is only enabled on production environment

## Arguments

- `app` *([Next Server](https://github.com/zeit/next.js#custom-server-and-routing))*
- [`options`] *(Object)*:
  - [`routes`] *(Object.&lt;Object&gt;)*: An object which key is a route path and value is an object with the following properties:
    - `page` *(String)*: Path to page component.
    - [`method`] *(String)*: [HTTP method](https://expressjs.com/en/api.html#routing-methods), default is `GET`.
  - [`redirects`] *(Object.&lt;Object&gt;)*: An object which key is a redirection source path and value is an object with the following properties:
    - `to` *(String)*: Redirection target path.
    - [`method`] *(String)*: [HTTP method](https://expressjs.com/en/api.html#routing-methods), default is `GET`.
    - [`status`] *(Number)*: HTTP status code for redirection, default is `301`.
  - [`compression`] *(Object)*: See [here](https://github.com/expressjs/compression#options) for compression options.
  - [`defaultLocale`] *(String)*: A locale string used as fallback locale, e.g. `id-id`, `en-id`, etc.
  - [`siteLocales`] *(Array.&lt;String&gt;)*: An array of locale string supported by your app.

## Returns

*([Express.Router](https://expressjs.com/en/api.html#express.router))*: An object of express router.

## Examples

### Basic Usage

```js
const express = require('express');
const next = require('next');
const { createRouter } = require('soya-next/server/router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare()
  .then(() => {
    const server = express();
    server.use(createRouter(app));
    server.listen(3000, err => {
      if (err) {
        throw err;
      }
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
```

### Options

#### `compression`

```js
const next = require('next');
const zlib = require('zlib');
const { createRouter } = require('soya-next/server/router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

createRouter(app, {
  compression: {
    chunkSize: zlib.Z_DEFAULT_CHUNK, // 16 * 1024 or 16384
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header 
        return false;
      }

      // fallback to standard filter function 
      return compression.filter(req, res);
    },
    level: zlib.Z_DEFAULT_COMPRESSION, // -1 or 6
    memLevel: zlib.Z_DEFAULT_MEMLEVEL, // 8
    strategy: zlib.Z_DEFAULT_STRATEGY,
    threshold: '1kb',
    windowBits: zlib.Z_DEFAULT_WINDOWBITS, // 15
  },
});
```

#### `defaultLocale` and `siteLocales`

```js
const next = require('next');
const zlib = require('zlib');
const { createRouter } = require('soya-next/server/router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

createRouter(app, {
  defaultLocale: 'en-id', // must be available in siteLocales
  siteLocales: [
    'id-id',
    'en-id',
  ],
});
```

#### `redirects`

```js
const next = require('next');
const zlib = require('zlib');
const { createRouter } = require('soya-next/server/router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

createRouter(app, {
  redirects: {
    '/post/:id': {
      to: '/p/:id', // must target available routes
    },
  },
  routes: {
    '/p/:id': {
      page: '/post',
    },
  },
});
```

#### `routes`

```js
const next = require('next');
const zlib = require('zlib');
const { createRouter } = require('soya-next/server/router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

createRouter(app, {
  routes: {
    '/p/:id': {
      page: '/post',
    },
  },
});
```

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  // eslint-disable-next-line no-console
  console.error(err);
});

const express = require("express");
const next = require("next");
const { join } = require("path");
const { createRouter } = require("soya-next/server/router");
const config = require("config");
// @remove-on-eject-begin
const conf = require("../next.config");
// @remove-on-eject-end

const { appDir } = require("../config/paths");
const app = next({
  dev: true
  // @remove-on-eject-begin
  , conf
  // @remove-on-eject-end
});
const buildSoya = require("./utils/build-soya");

app
  .prepare()
  .then(() => buildSoya({ dev: true }))
  .then(() => require.resolve("soya"))
  .then(
    stats =>
      stats ? require(join(appDir, "build/server", "index.js")).default : null,
    err => {
      if (err.code !== "MODULE_NOT_FOUND") {
        throw err;
      }
    }
  )
  .then((soyaMiddleware = null) => {
    const server = express();
    if (soyaMiddleware !== null) {
      server.use(soyaMiddleware);
    }
    if (config.basePath) {
      server.use((req, res, next) => {
        if (req.url.startsWith(config.basePath)) {
          req.url = req.url.replace(new RegExp(`^${config.basePath}/*`), "/");
        } else if (
          !["/_next/webpack-hmr", "/_next/on-demand-entries-ping"].some(
            prefix => req.url.startsWith(prefix)
          )
        ) {
          return app.send404(res);
        }
        next();
      });
    }
    server.use(
      createRouter(app, {
        routes: config.routes,
        redirects: config.redirects,
        defaultLocale: config.defaultLocale,
        siteLocales: config.siteLocales,
        compression: config.server.compression,
        whoami: config.whoami
      })
    );
    server.listen(config.server.port, config.server.host, err => {
      if (err) {
        throw err;
      }

      if (typeof process.send === "function") {
        process.send("ready");
      }

      // eslint-disable-next-line no-console
      console.log(`> Ready on ${config.server.host}:${config.server.port}`);
    });
  })
  .catch(ex => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });

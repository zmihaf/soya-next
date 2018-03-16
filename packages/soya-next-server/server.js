require("soya-next/config/default");

process.on("unhandledRejection", err => {
  console.error(err);
});

process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const config = require("config");
const express = require("express");
const next = require("next");
const { realpathSync } = require("fs");
const { join, resolve } = require("path");
const { createRouter } = require("soya-next/server/router");

const appDir = resolve(realpathSync(process.cwd()));
const app = next({ dev: false, conf: {} });

app
  .prepare()
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

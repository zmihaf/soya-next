process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

process.on("unhandledRejection", err => {
  throw err;
});

// @remove-on-eject-begin
const conf = require("../next.config");
// @remove-on-eject-end
const _export = require("next/dist/server/export").default;

const { appDir } = require("../config/paths");

_export(
  appDir,
  {
    silent: false,
    outdir: appDir + '/out',
  },
  {
    webpack: null,
    webpackDevMiddleware: null,
    poweredByHeader: true,
    distDir: '.next',
    assetPrefix: '',
    configOrigin: 'next.config.js',
    useFileSystemPublicRoutes: true,
    exportPathMap: function () {
      return {
        '/planned-routing': { page: '/planned-routing' }
      }
    }
  }
);


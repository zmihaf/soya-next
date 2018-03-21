const withAssetsImport = require("next-assets-import");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withCSS = require("./withCSS");
const withCSSModules = require("./withCSSModules");
const withConfig = require("next-config");
const withDocument = require("./withDocument");
const withExtractStyles = require("./withExtractStyles");
const withMarlint = require("./withMarlint");
const withSASS = require("./withSASS");
const withSASSModules = require("./withSASSModules");
const compose = require("lodash/flowRight");

module.exports = compose(
  withAssetsImport,
  withBundleAnalyzer,
  withDocument,
  withExtractStyles,
  withCSSModules,
  withCSS,
  withConfig,
  withMarlint,
  withSASSModules,
  withSASS
);

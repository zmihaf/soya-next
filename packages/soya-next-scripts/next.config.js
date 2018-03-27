const { join } = require("path");
const plugins = require("./plugins");
const config = require("config");

module.exports = plugins({
  assetPrefix: config.assetPrefix,
  distDir: config.distDir,
  configOrigin: config.configOrigin,
  useFileSystemPublicRoutes: config.useFileSystemPublicRoutes,
  webpack(config, options) {
    const soyaNextScriptsNodeModules = join(__dirname, "node_modules");
    config.resolve.modules.unshift(soyaNextScriptsNodeModules);
    config.resolveLoader.modules.unshift(soyaNextScriptsNodeModules);
    return config;
  }
});

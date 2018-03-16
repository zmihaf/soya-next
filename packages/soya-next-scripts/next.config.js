const { join } = require("path");
const plugins = require("./plugins");

module.exports = plugins({
  webpack(config, options) {
    const soyaNextScriptsNodeModules = join(__dirname, "node_modules");
    config.resolve.modules.unshift(soyaNextScriptsNodeModules);
    config.resolveLoader.modules.unshift(soyaNextScriptsNodeModules);
    return config;
  }
});

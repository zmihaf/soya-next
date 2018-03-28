module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const { join } = require("path");
      const soyaNextScriptsNodeModules = join(__dirname, "..", "node_modules");
      config.resolve.modules.unshift(soyaNextScriptsNodeModules);
      config.resolveLoader.modules.unshift(soyaNextScriptsNodeModules);

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });

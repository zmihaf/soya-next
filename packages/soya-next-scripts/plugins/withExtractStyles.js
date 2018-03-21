const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonsChunkConfig = require("@zeit/next-css/commons-chunk-config");

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      let newConfig = config;
      let extractCSSPlugin =
        nextConfig.extractCSSPlugin || options.extractCSSPlugin;

      if (!extractCSSPlugin) {
        extractCSSPlugin = new ExtractTextPlugin({
          filename: "static/style.css"
        });
        config.plugins.push(extractCSSPlugin);
        options.extractCSSPlugin = extractCSSPlugin;
        if (!options.isServer) {
          newConfig = commonsChunkConfig(config, /(css|sass|scss)$/);
        }
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(newConfig, options);
      }

      return newConfig;
    }
  });

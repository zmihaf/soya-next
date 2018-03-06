const withCSS = require("@zeit/next-css");

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { webpack } = withCSS();
      const newConfig = webpack(config, options);
      const cssLoaderRule = newConfig.module.rules.find(
        ({ test }) => test && test.toString() === "/\\.css$/"
      );
      cssLoaderRule.exclude = /\.mod(ule)?\.css$/;
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(newConfig, options);
      }
      return newConfig;
    }
  });

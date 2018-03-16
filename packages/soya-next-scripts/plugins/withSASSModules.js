const withSASS = require("@zeit/next-sass");

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { webpack } = withSASS({ cssModules: true });
      const newConfig = webpack(config, options);
      const sassLoaderRule = newConfig.module.rules.find(
        ({ test }) => test && test.toString() === "/\\.sass$/"
      );
      const scssLoaderRule = newConfig.module.rules.find(
        ({ test }) => test && test.toString() === "/\\.scss$/"
      );
      sassLoaderRule.test = /\.mod(ule)?\.sass$/;
      scssLoaderRule.test = /\.mod(ule)?\.scss$/;
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(newConfig, options);
      }
      return newConfig;
    }
  });

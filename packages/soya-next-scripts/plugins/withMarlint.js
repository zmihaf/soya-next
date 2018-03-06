const withESLint = require("next-eslint");

module.exports = (nextConfig = {}) => {
  const { eslintLoaderOptions } = nextConfig;
  const { webpack } = withESLint(
    Object.assign({}, nextConfig, {
      eslintLoaderOptions: Object.assign(
        {
          baseConfig: {
            extends: "marlint",
            rules: {
              "react/react-in-jsx-scope": "off"
            }
          }
        },
        eslintLoaderOptions
      )
    })
  );
  return Object.assign({}, nextConfig, { webpack });
};

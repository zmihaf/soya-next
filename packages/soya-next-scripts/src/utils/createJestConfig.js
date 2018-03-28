export default ({
  testMatch = ["**/__tests__/**/*.js?(x)", "**/?(*).(spec|test).js?(x)"],
  ...jestConfig
} = {}) => ({
  testMatch,
  ...jestConfig
});

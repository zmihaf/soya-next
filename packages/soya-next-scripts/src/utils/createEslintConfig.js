export default ({
  rules,
  ...eslintConfig
} = {
  extends: 'marlint',
  rules: {},
}) => ({
  ...eslintConfig,
  rules: {
    'react/react-in-jsx-scope': 'off',
    ...rules,
  },
});

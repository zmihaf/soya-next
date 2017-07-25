export default ({
  rules,
  ...eslintConfig
} = {
  rules: {},
}) => ({
  extends: 'marlint',
  rules: {
    'react/react-in-jsx-scope': 'off',
    ...rules,
  },
  ...eslintConfig,
});

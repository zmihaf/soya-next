export default ({
  rules,
  ...eslintConfig
} = {
  rules: {},
}) => ({
  extends: 'marlint',
  globals: {
    soya: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    ...rules,
  },
  ...eslintConfig,
});

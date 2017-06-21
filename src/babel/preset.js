const REACT_APP = /^REACT_APP_/i;

export default {
  presets: [
    require.resolve('next/babel'),
  ],
  plugins: [
    [
      require.resolve('styled-modules/babel'),
      {
        pattern: /\.(css|s(a|c)ss)$/,
      },
    ],
    [
      require.resolve('babel-plugin-transform-define'),
      Object.keys(process.env)
        .filter(key => key === 'NODE_ENV' || REACT_APP.test(key))
        .reduce((env, key) => ({
          ...env,
          [`process.env.${key}`]: process.env[key],
        }), {}),
    ],
  ],
}

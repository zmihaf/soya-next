import { config } from 'dotenv';

const { parsed = {} } = config();

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
      Object.keys(parsed).reduce((config, key) => ({
        ...config,
        [key]: process.env[key],
      }), {}),
    ],
  ],
}

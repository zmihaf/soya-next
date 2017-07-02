import { stringify } from '../config/soyaConfig';

export default {
  plugins: [
    [
      require.resolve('styled-modules/babel'),
      {
        pattern: /\.(css|s(a|c)ss)$/,
      },
    ],
    [
      require.resolve('babel-plugin-transform-define'),
      stringify(),
    ],
  ],
};

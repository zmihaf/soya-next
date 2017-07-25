import { stringify } from '../config/soyaConfig';

export default {
  plugins: [
    [
      require.resolve('babel-plugin-transform-define'),
      stringify(),
    ],
  ],
};

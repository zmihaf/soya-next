export default (config) => {
  config.module.rules.push(
    {
      test: /\.(css|s(a|c)ss)$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    },
    {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader'],
    },
    {
      test: /\.s(a|c)ss$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader', 'sass-loader'],
    },
  );
  return config;
};

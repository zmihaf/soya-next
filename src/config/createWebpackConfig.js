export default function(config, { dev }) {
  config.module.rules.push(
    {
      test: [
        /\.(css|s(a|c)ss)$/,
        /\.(bmp|gif|jpe?g|png)$/,
      ],
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
    {
      test: /\.(bmp|gif|jpe?g|png)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `dist/static/[path][name].[ext]`,
        publicPath: (url) => `${this.assetPrefix}/_soya/${url.replace('dist/static/', '')}`,
      },
    },
  );
  return config;
}

import { join } from 'path';

export default function(config, { dev }) {
  let localIdentName, imageName;
  if (dev) {
    localIdentName = '[name]__[local]--[hash:base64:5]';
    imageName = '[name]';
  } else {
    localIdentName = null;
    imageName = '[name]-[hash]';
  }

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
      test: /\.module\.css$/,
      use: [
        'babel-loader',
        'styled-modules/loader',
        {
          loader: 'css-loader',
          options: {
            localIdentName,
            modules: true,
            sourceMap: dev,
            importLoaders: 1,
          },
        },
        'postcss-loader',
      ],
    },
    {
      test: /\.module\.s(a|c)ss$/,
      use: [
        'babel-loader',
        'styled-modules/loader',
        {
          loader: 'css-loader',
          options: {
            localIdentName,
            modules: true,
            sourceMap: dev,
            importLoaders: 2,
          },
        },
        'postcss-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader'],
    },
    {
      test: /\.s(a|c)ss$/,
      exclude: /\.module\.s(a|c)ss$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader', 'sass-loader'],
    },
    {
      test: /\.(bmp|gif|jpe?g|png)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `dist/static/[path]${imageName}.[ext]`,
        publicPath: (url) => `${this.assetPrefix}/_soya/${url.replace('dist/static/', '')}`,
      },
    },
  );
  return config;
}

export default function (config, { dev }) {
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
      test: /\.mod(ule)?\.css$/,
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
      ],
    },
    {
      test: /\.mod(ule)?\.s(a|c)ss$/,
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
        'sass-loader',
      ],
    },
    {
      test: /\.css$/,
      exclude: /\.mod(ule)?\.css$/,
      use: [
        'babel-loader',
        'styled-modules/loader',
        {
          loader: 'css-loader',
          options: {
            localIdentName,
            sourceMap: dev,
            importLoaders: 1,
          },
        },
      ],
    },
    {
      test: /\.s(a|c)ss$/,
      exclude: /\.mod(ule)?\.s(a|c)ss$/,
      use: [
        'babel-loader',
        'styled-modules/loader',
        {
          loader: 'css-loader',
          options: {
            localIdentName,
            sourceMap: dev,
            importLoaders: 2,
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.(bmp|gif|jpe?g|png|ttf|eot|woff2?|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `dist/static/[path]${imageName}.[ext]`,
        // eslint-disable-next-line babel/no-invalid-this
        publicPath: url => `${this.assetPrefix}/_soya/${url.replace('dist/static/', '')}`,
      },
    },
  );
  return config;
}

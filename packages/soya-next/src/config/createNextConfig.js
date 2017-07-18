export default ({ assetPrefix = '', webpack, ...config } = {}) => ({
  ...config,
  assetPrefix,
  webpack(webpackConfig, { dev }) {
    let localIdentName, imageName;
    if (dev) {
      localIdentName = '[name]__[local]--[hash:base64:5]';
      imageName = '[name]';
    } else {
      localIdentName = null;
      imageName = '[name]-[hash]';
    }

    const cssLoaderOptions = {
      localIdentName,
      minimize: !dev,
      sourceMap: dev,
    };

    const rule = webpackConfig.module.rules.find(rule => (
      rule.loader === 'babel-loader' &&
      rule.test && rule.test.toString() === '/\\.js(\\?[^?]*)?$/'
    ));
    if (rule && !rule.options.babelrc) {
      // istanbul ignore else
      if (process.env.NODE_ENV === 'test') {
        rule.options.presets.push('../babel/preset');
      } else {
        rule.options.presets.push(require.resolve('../babel/preset'));
      }
    }
    webpackConfig.module.rules.push(
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
              ...cssLoaderOptions,
              modules: true,
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
              ...cssLoaderOptions,
              modules: true,
              importLoaders: 1,
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
            options: cssLoaderOptions,
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
              ...cssLoaderOptions,
              importLoaders: 1,
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
          publicPath: url => `${assetPrefix}/_soya/${url.replace('dist/static/', '')}`,
        },
      },
    );

    if (webpack) {
      webpack(webpackConfig, { dev });
    }

    return webpackConfig;
  },
});

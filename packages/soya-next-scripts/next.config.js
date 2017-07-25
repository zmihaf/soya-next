// @remove-on-eject-begin
const webpack = require('webpack');
const { join, resolve } = require('path');
const pagesDir = join(__dirname, 'pages');
const { realpathSync } = require('fs');
const appDir = resolve(realpathSync(process.cwd()));
const appPackage = require(join(appDir, 'package.json'));
const createEslintConfig = require('./lib/utils/createEslintConfig').default;
// @remove-on-eject-end
const { soya } = require('soya-next/server/config');
const assetPrefix = soya.config.assetPrefix || '';

module.exports = {
  assetPrefix,
  webpack: (config, { dev }) => {
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

    // @remove-on-eject-begin
    const entry = config.entry;
    config.entry = () => entry().then(entries => {
      const names = Object.keys(entries);
      const name = names.find(name => (
        name === 'bundles/pages/_document.js' &&
        entries[name].indexOf('./pages/_document.js?entry') === -1
      ));
      if (name) {
        entries[name] = [`${require.resolve('./pages/_document')}?entry`];
      }
      return entries;
    });

    if (dev) {
      const hotSelfAcceptRule = config.module.rules.find(rule => rule.loader === 'hot-self-accept-loader');
      if (hotSelfAcceptRule) {
        hotSelfAcceptRule.include.push(pagesDir);
      }
    }
    const emitFileRule = config.module.rules.find(rule => rule.loader === 'emit-file-loader');
    if (emitFileRule) {
      emitFileRule.include.push(pagesDir);
      const exclude = emitFileRule.exclude;
      emitFileRule.exclude = str => exclude(str) && str.indexOf(pagesDir) !== 0;
    }

    config.plugins.push(new webpack.LoaderOptionsPlugin({
      test: /_document\.js$/,
      include: pagesDir,
      options: {
        context: __dirname,
      },
    }));
    // @remove-on-eject-end
    const babelRule = config.module.rules.find(rule => (
      rule.loader === 'babel-loader' &&
      rule.test && rule.test.toString() === '/\\.js(\\?[^?]*)?$/'
    ));
    if (babelRule && !babelRule.options.babelrc) {
      babelRule.options.presets.push(require.resolve('soya-next/babel'));
      babelRule.options.plugins = babelRule.options.plugins || [];
      babelRule.options.plugins.push([
        require.resolve('styled-modules/babel'),
        {
          pattern: /\.(mod)?ule\.(css|s(a|c)ss)$/,
        },
      ]);
    }

    if (dev) {
      config.module.rules.push({
        test: /\.js(x)?$/,
        enforce: 'pre',
        loader: require.resolve('eslint-loader'),
        options: {
          failOnError: true,
          formatter: require('eslint/lib/formatters/codeframe'),
          // @remove-on-eject-begin
          baseConfig: createEslintConfig(appPackage.eslintConfig),
          ignore: !!appPackage.eslintIgnore,
          useEslintrc: false,
          // @remove-on-eject-end
        },
      });
    }

    config.module.rules.push(
      // @remove-on-eject-begin
      {
        loader: 'babel-loader',
        include: pagesDir,
        exclude(str) {
          return /node_modules/.test(str) && str.indexOf(pagesDir) !== 0;
        },
        options: {
          babelrc: false,
          cacheDirectory: true,
          presets: [require.resolve('next/babel')],
        },
      },
      // @remove-on-eject-end
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
            options: Object.assign({
              modules: true,
            }, cssLoaderOptions),
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
            options: Object.assign({
              modules: true,
              importLoaders: 1,
            }, cssLoaderOptions),
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
            options: Object.assign({ importLoaders: 1 }, cssLoaderOptions),
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
      }
    );

    return config;
  },
};

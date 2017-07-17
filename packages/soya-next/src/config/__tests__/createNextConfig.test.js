import createNextConfig from '../createNextConfig';

let webpackConfig;

describe('Create Next Config', () => {
  it('should return default config', () => {
    expect(createNextConfig()).toMatchSnapshot();
  });

  describe('Webpack Config', () => {
    beforeEach(() => {
      webpackConfig = {
        module: {
          rules: [{
            test: /\.js(\?[^?]*)?$/,
            loader: 'babel-loader',
            options: {
              presets: [],
              babelrc: false,
            },
          }],
        },
        plugins: [],
      };
    });

    it('should return default development config', () => {
      const { webpack } = createNextConfig();
      expect(webpack(webpackConfig, { dev: true })).toMatchSnapshot();
    });

    it('should return default production config', () => {
      const { webpack } = createNextConfig();
      expect(webpack(webpackConfig, { dev: false })).toMatchSnapshot();
    });

    it('should not add any presets if babelrc is used', () => {
      const { webpack } = createNextConfig();
      const babelLoaderRule = webpackConfig.module.rules.find(({ loader }) => loader === 'babel-loader');
      babelLoaderRule.options.babelrc = true;
      expect(webpack(webpackConfig, { dev: false })).toMatchSnapshot();
    });

    it('should return customized config', () => {
      const { webpack } = createNextConfig({
        webpack(config) {
          config.plugins.push(jest.fn());
        },
      });
      expect(webpack(webpackConfig, { dev: false })).toMatchSnapshot();
    });

    it('should return correct public path url', () => {
      const { webpack } = createNextConfig({
        webpack(config) {
          config.plugins.push(jest.fn());
        },
      });
      const urlLoaderRule = webpack(webpackConfig, { dev: false }).module.rules.find(({ loader }) => loader === 'url-loader');
      expect(urlLoaderRule.options.publicPath('dist/static/path/to/soya.png')).toBe('/_soya/path/to/soya.png');
    });
  });
});

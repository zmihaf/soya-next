import config from 'config';

const stringifyConfig = config => (function recursive(config, stringified, prevKeys) {
  return Object.keys(config).reduce((stringified, key) => {
    const allKeys = prevKeys.concat(key);
    const allKey = `soya.config.${allKeys.join('.')}`;
    if (typeof config[key] === 'object') {
      stringified[allKey] = config[key];
      return recursive(config[key], stringified, allKeys);
    }
    stringified[allKey] = config[key];
    return stringified;
  }, stringified);
})(config, {}, []);

export const raw = () => ({
  soya: {
    config: Object.keys(config).reduce((newConfig, key) => {
      newConfig[key] = config[key];
      return newConfig;
    }, {}),
  },
});

export const stringify = () => stringifyConfig(config);

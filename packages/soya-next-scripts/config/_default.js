const { resolve } = require('path');
const { realpathSync } = require('fs');
const { soya } = require('soya-next/server/config');

exports.appDir = resolve(realpathSync(process.cwd()));
exports.host = soya.config.host || '0.0.0.0';
exports.port = soya.config.port || 3000;

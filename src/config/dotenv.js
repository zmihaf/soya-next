import { realpathSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';

const dotenv = resolve(realpathSync(process.cwd()), '.env');
const NODE_ENV = process.env.NODE_ENV || 'development';

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${dotenv}.${NODE_ENV}.local`,
  `${dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${dotenv}.local`,
  dotenv,
].filter(Boolean);

dotenvFiles.forEach(path => {
  config({ path });
});

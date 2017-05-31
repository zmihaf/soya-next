import data from './i18n.json';
import { generateId } from '../utils/DictionaryUtil';

export const fetchTranslation = ({ entryKey, locale }) => new Promise((resolve) => {
  const ms = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    resolve({ [entryKey]: data[locale.language][entryKey] });
    console.log(`fetchTranslation (${generateId({ entryKey, locale })}): ${ms}ms`);
  }, ms);
});

import { FETCH_TRANSLATION } from '../constants/DictionaryConstant';
import * as TranslationService from '../services/DictionaryService';
import { generateId } from '../utils/DictionaryUtil';

export const fetchTranslation = ({ entryKey, locale }) => ({
  type: FETCH_TRANSLATION,
  entryKey,
  locale,
  soya: {
    id: generateId({ entryKey, locale }),
    load: async () => await TranslationService.fetchTranslation({ entryKey, locale }),
  },
});

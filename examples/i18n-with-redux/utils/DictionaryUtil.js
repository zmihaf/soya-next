export const generateId = ({ entryKey, locale }) =>
  `${locale.language}-${locale.country}.${entryKey}`;

export default ({
  defaultLocale,
  siteLocales,
} = {}) => (req, res, next) => {
  if (typeof defaultLocale !== 'string') {
    throw new Error(`Expected defaultLocale to be a locale string.`);
  }
  if (typeof siteLocales !== 'object' || siteLocales.constructor !== Array || siteLocales.length === 0) {
    throw new Error(`Expected siteLocales to be an array of locale string.`);
  }
  let [ language, country ] = defaultLocale.split('-');
  const [ url ] = req.url.substr(1).split('?');
  const [ localeSegment ] = url.split('/');
  if (localeSegment) {
    const [ languageSegment = language, countrySegment = country ] = localeSegment.split('-');
    if (siteLocales.indexOf(`${language}-${country}`) !== -1) {
      language = languageSegment;
      country = countrySegment;
      const newLocale = [ language, country ].join('-');
      if (siteLocales.indexOf(newLocale) !== -1) {
        req.url = '/' + url.substr(localeSegment.length + 1);
      }
    }
  }
  req.locale = {
    country,
    language,
  };
  next();
};

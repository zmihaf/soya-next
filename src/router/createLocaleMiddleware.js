export default ({
  defaultLocale,
  siteLocales,
} = {}) => {
  if (typeof defaultLocale !== 'string') {
    throw new Error(`Expected defaultLocale to be a locale string.`);
  }
  if (typeof siteLocales !== 'object' || siteLocales.constructor !== Array || siteLocales.length === 0) {
    throw new Error(`Expected siteLocales to be an array of locale string.`);
  }
  return (req, res, next) => {
    let [ language, country ] = defaultLocale.split('-');
    const [ url ] = req.url.substr(1).split('?');
    const [ localeSegment ] = url.split('/');
    if (localeSegment) {
      const [ languageSegment, countrySegment = country ] = localeSegment.split('-');
      if (siteLocales.indexOf(`${languageSegment}-${countrySegment}`) !== -1) {
        country = countrySegment;
        language = languageSegment;
        req.url = '/' + url.substr(localeSegment.length + 1);
      }
    }
    req.defaultLocale = defaultLocale;
    req.siteLocales = siteLocales;
    req.locale = {
      country,
      language,
    };
    next();
  };
}

const defaultOptions = {
  defaultLocale: 'id-id',
  siteLocales: ['id-id'],
};

export default ({
  defaultLocale = defaultOptions.defaultLocale,
  siteLocales = defaultOptions.siteLocales,
} = defaultOptions) => (req, res, next) => {
  if (typeof defaultLocale !== 'string') {
    throw new Error(`Expected defaultLocale to be a string.`);
  }
  if (typeof siteLocales !== 'object' || siteLocales.constructor !== Array) {
    throw new Error(`Expected siteLocales to be an array.`);
  }
  let [ language, country ] = defaultLocale.split('-');
  const [ url ] = req.url.substr(1).split('?');
  const [ localeSegment ] = url.split('/');
  let locale = defaultLocale;
  if (localeSegment) {
    const [ languageSegment, countrySegment ] = localeSegment.split('-');
    language = languageSegment || language;
    country = countrySegment || country;
    const newLocale = [ language, country ].join('-');
    if (siteLocales.indexOf(newLocale) !== -1) {
      req.url = '/' + url.substr(localeSegment.length + 1);
      locale = newLocale;
    }
  }
  req.country = country;
  req.language = language;
  req.locale = locale;
  next();
};

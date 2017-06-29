import createLocaleMiddleware from '../createLocaleMiddleware';

it('requires default locale', () => {
  expect(() => createLocaleMiddleware()).toThrowErrorMatchingSnapshot();
});

it('requires site locales', () => {
  expect(() => createLocaleMiddleware({ defaultLocale: 'id-id' })).toThrowErrorMatchingSnapshot();
});

let options, res, next;
beforeEach(() => {
  options = {
    defaultLocale: 'id-id',
    siteLocales: [
      'id-id',
      'en-id',
      'en-sg',
    ],
  };
  res = {};
  next = jest.fn();
});

it('should fallback to default locale', () => {
  const req = {
    url: '/',
  };
  createLocaleMiddleware(options)(req, res, next);
  expect(req).toMatchSnapshot();
});

it('should fallback country to its default and remove locale segment from url', () => {
  const req = {
    url: '/en/',
  };
  createLocaleMiddleware(options)(req, res, next);
  expect(req).toMatchSnapshot();
});

it('should match available site locales and remove locale segment from url', () => {
  const req = {
    url: '/en-sg/',
  };
  createLocaleMiddleware(options)(req, res, next);
  expect(req).toMatchSnapshot();
});

it('should fallback to default locale if none match', () => {
  const req = {
    url: '/ms-my/',
  };
  createLocaleMiddleware(options)(req, res, next);
  expect(req).toMatchSnapshot();
});

import cookieMiddleware from 'universal-cookie-express';
import createLocaleMiddleware from './createLocaleMiddleware';
import Router from 'express/lib/router';

const defaultOptions = {
  routes: {},
  redirects: [],
};

export default (app, {
  routes = defaultOptions.routes,
  redirects = defaultOptions.redirects,
  defaultLocale,
  siteLocales,
} = defaultOptions) => {
  const router = Router();
  const handle = app.getRequestHandler();
  router.use(cookieMiddleware());
  router.use(createLocaleMiddleware({ defaultLocale, siteLocales }));
  redirects.forEach(({ from, to, method = 'get', type = 301 }) => {
    router[method](from, (req, res) => res.redirect(type, to));
  });
  Object.keys(routes).forEach((path) => {
    const { method = 'get', page } = routes[path];
    router[method](path, (req, res) => {
      app.render(req, res, page, Object.assign({}, req.query, req.params));
    });
  });
  router.get('*', (req, res) => handle(req, res));
  return router;
};

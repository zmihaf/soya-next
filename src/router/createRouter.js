import { join } from 'path';
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
  compression,
} = defaultOptions) => {
  const router = Router();
  const handle = app.getRequestHandler();
  if (!app.dev) {
    router.use(require('compression')(compression));
  }
  router.use(cookieMiddleware());
  if (defaultLocale && siteLocales) {
    router.use(createLocaleMiddleware({ defaultLocale, siteLocales }));
  }
  router.get('/_soya/:path(*)', async (req, res) => {
    const p = join(app.dir, app.dist, 'dist', 'static', req.params.path);
    await app.serveStatic(req, res, p);
  });
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

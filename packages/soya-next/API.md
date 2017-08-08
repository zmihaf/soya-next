# API
## `applyReducers([reducers])`
Register reducers to be loaded dynamically so you won't need to worry about it anymore.

### Arguments
- [`reducers`] *(Object)*: An object of reducers which will be loaded dynamically with the given name.
  > Note: Make sure each reducers has unique name within your application reducers.

### Returns
*(Function)*: A higher order React component class.

### Examples
```js
import { bindActionCreators, compose } from 'redux';
import { applyReducers } from 'soya-next/redux';

const reducers = {
  todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat(action.text);
      default:
        return state;
    }
  },
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTodo: (text) => ({
    type: 'ADD_TODO',
    text,
  }),
}, dispatch);

export default compose(
  applyReducers(reducers),
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
```

## `createPage([...connectArgs])(Page, [reducers])`
Configures and connects to Redux store, loads reducers dynamically, handles client side URL redirection, and makes cookie, default locale, locale, site locales, and url available as `Page` props and in the `getInitialProps` lifecycle method.

It will also make them available to the component hierarchy below, through the following method calls:
- Cookie through `withCookies()` calls, imported from `react-cookie`.
- Locale, default locale, and site locales through `withLocale()` calls, imported from `soya-next/i18n`.
- Url through `withUrl()` calls, imported from `soya-next/router`.

### Arguments
- [`...connectArgs`] *([Connect Arguments](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connect))*
- `Page` *(ReactComponent)*: Page component to be enhanced.
- [`reducers`] *(Object)*: An object of reducers which will be loaded dynamically with the given name.
  > Note: Make sure each reducers has unique name within your application reducers.

### Returns
*(ReactComponent)*: An enhanced Page component class.

### Examples
```js
import { createPage } from 'soya-next'

const Page = () => (
  <div>This is your page</div>
);

Page.getInitialProps = (ctx) => {};

export default createPage()(Page);
```

## `createRouter(app, [options])`
Creates locale aware express router with universal cookie and gzip enabled (production only).

### Arguments
- `app` *([Next Server](https://github.com/zeit/next.js#custom-server-and-routing))*
- [`options`] *(Object)*:
  - [`routes`] *(Object.\<Object\>)*: An object which key is a route path and value is an object with the following properties:
    - `page` *(String)*: Path to page component.
    - [`method`] *(String)*: [HTTP method](https://expressjs.com/en/api.html#routing-methods), default is `GET`.
  - [`redirects`] *(Object.\<Object\>)*: An object which key is a redirection source path and value is an object with the following properties:
    - `to` *(String)*: Redirection target path.
    - [`method`] *(String)*: [HTTP method](https://expressjs.com/en/api.html#routing-methods), default is `GET`.
    - [`status`] *(Number)*: HTTP status code for redirection, default is `301`.
  - [`compression`] *(Object)*: See [here](https://github.com/expressjs/compression#options) for compression options.
  - [`defaultLocale`] *(String)*: A locale string used as fallback locale, e.g. `id-id`, `en-id`, etc.
  - [`siteLocales`] *(Array.\<String\>)*: An array of locale string supported by your app.

### Returns
*([Express.Router](https://expressjs.com/en/api.html#express.router))*: An object of express router.

### Examples
```js
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const { createRouter } = require('soya-next/server/router');

app.prepare()
  .then(() => {
    const server = express();
    server.use(createRouter(app));
    server.listen(3000, err => {
      if (err) {
        throw err;
      }
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
```

## `withLocale()`
Give access to default locale, locale, and site locales.

### Returns
*(Function)*: A higher order React component class that passes `defaultLocale`, `locale`, and `siteLocales` into your component props.

### Examples
```js
import { withLocale } from 'soya-next/i18n';

export default withLocale(({
  locale,
  defaultLocale,
  siteLocales,
}) => (
  <div>
    <div>Current locale is {locale}</div>
    <div>Default locale is {defaultLocale}</div>
    <div>Supported site locales are {siteLocales.join(', ')}</div>
  </div>
));
```

## `<LocaleLink />`
Locale aware `<Link />` component for routing. See [here](https://github.com/zeit/next.js#with-link) for `<Link />` documentation.

### Props
- [`locale`] *(String)*: A locale string, e.g. `id-id`, `en-id`, etc.
- See [here](https://github.com/zeit/next.js#with-link) for more.

### Examples
```js
import LocaleLink from 'soya-next/link';

const languages = {
  id: 'Bahasa',
  en: 'English',
};

const countries = {
  id: 'Indonesia',
  sg: 'Singapore',
};

const LanguagePicker = () => (
  <div>
    ['id-id', 'en-id', 'en-sg'].map((siteLocale) => {
      const [language, country] = siteLocale.split('-')
      return (
        <LocaleLink locale={{ language, country }}>
          <a>{languages[language]} ({countries[country]})</a>
        </LocaleLink>
      );
    });
  </div>
);

export default (props) => (
  <div>
    <LocaleLink href='/'><a>Home</a></LocaleLink />
    <LocaleLink href='/about'><a>About</a></LocaleLink />
    <LanguagePicker />
  </div>
);
```

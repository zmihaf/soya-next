[URLObject]: https://nodejs.org/api/url.html#url_url_strings_and_url_objects

# `<LocaleLink />`

Locale aware `<Link />` component for routing. See [here](https://github.com/zeit/next.js#with-link) for `<Link />` documentation.

> Ensure `<LocaleLink />` is rendered within [`createPage([...connectArgs])(Page, [reducers])`](create-page.md) hierarchy.

## Props

- `href` *(String|[URL Object][URLObject])*: Path section of URL.
- [`as`] *(String|[URL Object][URLObject])*: Actual path (including the query) shows in the browser.
- [`locale`] *(String)*: A locale string, e.g. `id-id`, `en-id`, etc.
- [`passHref`] *(Boolean)*: Passes href to `<a>` child that doesn't have href attribute.
- [`prefetch`] *(Boolean)*: Allows all the future interaction paths of your app to be instant.
- [`replace`] *(Boolean)*: Uses replace state instead of the default push state.
- [`shallow`] *(Boolean)*: Allows changing URL without running `getInitialProps`.

## Examples

### Basic usage

```js
import LocaleLink from 'soya-next/link';

export default () => (
  <LocaleLink href="/">
    <a>Home</a>
  </LocaleLink>
);
```

### Navigating to custom routes

```js
import LocaleLink from 'soya-next/link';

const PostLink = () => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

export default () => (
  <nav>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js" />
      <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
      <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
    </ul>
  </div>
);
```

### Overriding locale

```js
import LocaleLink from 'soya-next/link';
import { withLocale } from 'soya-next/i18n';

const translations = {
  'id-id': {
    country: 'Indonesia',
    language: 'Bahasa',
  },
  'en-id': {
    country: 'Indonesia',
    language: 'English',
  },
  'en-sg': {
    country: 'Singapore',
    language: 'English',
  },
};

export default withLocale(({
  siteLocales = ['id-id', 'en-id', 'en-sg']
}) => (
  <div>
    {siteLocales.map(locale => (
      <LocaleLink locale={locale}>
        <a>{translations[locale].language} ({translations[locale].country})</a>
      </LocaleLink>
    ))}
  </div>
));
```

### Passing href attribute to `<a>`

```diff
import LocaleLink from 'soya-next/link';

export default () => (
  <Link
    href="/"
+   passHref
  >
    <a
-     href="/"
    >
      Home
    </a>
  </Link>
);
```

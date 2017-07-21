# Internationalization Example

## Usage
Clone this repository:
```
git clone https://github.com/traveloka/soya-next.git
cd soya-next/examples/i18n
```

Install and run it:
```
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works
This example uses [express middleware](https://expressjs.com/en/guide/using-middleware.html) to enable internationalization.

To use it, create a configuration file at `config/default.json` with the following:
```json
{
  "defaultLocale": "id-id",
  "siteLocales": [
    "id-id",
    "en-id"
  ]
}
```

To access locale, default locale, and site locales within your application,
you need to provide them into every pages using `createPage()` as follows:
```js
import { createPage } from 'soya-next';

const Page = ({
  locale,
  defaultLocale,
  siteLocales,
}) => {};

Page.getIntialProps = ({
  locale,
  defaultLocale,
  siteLocales,
}) => {};

export default createPage()(Page);
```

Now, you can access them in your component as well using `withLocale`:
```js
import { withLocale } from 'soya-next/i18n';

export default withLocale(({ defaultLocale, locale, siteLocales }) => {});
```

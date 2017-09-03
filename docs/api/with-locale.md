# `withLocale(Component)`

Give React component access to `defaultLocale`, `locale`, and `siteLocales`.

> Ensure `withLocale(Component)` is rendered within [`createPage([...connectArgs])(Page, [reducers])`](create-page.md) hierarchy.

## Returns

*(Function)*: A higher order React component class that passes `defaultLocale`, `locale`, and `siteLocales` to the component below.

## Examples

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

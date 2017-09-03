# `createPage([...connectArgs])(Page, [reducers])`

Configures and connects to Redux store, loads reducers dynamically, handles client side URL redirection, and makes cookie, default locale, locale, and site locales available as `Page` props and in the `getInitialProps` lifecycle method.

It will also make them available to the component hierarchy below, through the following method calls:

- Cookie through `withCookies` calls, imported from `react-cookie`.
- Default locale, locale, and site locales through `withLocale` calls, imported from `soya-next/i18n`.

## Arguments

- [`...connectArgs`] *([Connect Arguments](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connect))*
- `Page` *(ReactComponent)*: Page component to be enhanced.
- [`reducers`] *(Object)*: An object of reducers which will be loaded dynamically with the given name.
  > Note: Make sure each reducers has unique name within your application reducers.

## Returns

*(ReactComponent)*: An enhanced Page component class.

## Examples

### Accessing and mutating cookie

```js
import { createPage } from 'soya-next'

const Page = ({ cookies }) => (
  <div>Welcome, {cookies.get('username')}!</div>
);

Page.getInitialProps = ({ cookies }) => {
  cookies.set('username', 'Soya');
  return null;
};

export default createPage()(Page);
```

### Accessing default locale, locale, and site locales

```js
import { createPage } from 'soya-next'

const Page = ({
  defaultLocale,
  locale,
  siteLocales,
}) => (
  <div>
    <div>Current locale is {locale}.</div>
    <div>Default locale is {defaultLocale}.</div>
    <div>Supported site locales are {siteLocales.join(', ')}.</div>
  </div>
);

Page.getInitialProps = ({
  defaultLocale,
  locale,
  siteLocales,
}) => {
  return null;
};

export default createPage()(Page);
```

### Dispatching an action and retrieving redux state

```js
import { createPage } from 'soya-next'
import { bindActionCreators } from 'redux';

const actions = {
  addTodo: text => ({
    type: 'ADD_TODO',
    text,
  }),
};

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

const mapDispatchToProps = dispatch => bindActionCreators({ addTodo }, dispatch);

const Page = ({ todos }) => (
  <ul>
    {todos.map((todo, index) =>
      <li key={index}>{todo}</li>
    )}
  </ul>
);

Page.getInitialProps = ({ store }) => {
  store.dispatch(addTodo('Learn Soya-Next'));
  return null;
};

export default createPage(mapStateToProps, mapDispatchToProps)(Page, reducers);
```

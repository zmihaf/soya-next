[redux-thunk]: https://github.com/gaearon/redux-thunk
[redux-saga]: https://github.com/redux-saga/redux-saga

# Configure Redux Store

Redux in Soya Next uses [redux-thunk][redux-thunk] as its middleware
and is configured to enable automatic code splitting.
Also, the devtools in Soya Next is always enabled but is restricted to log only in production.
If you wanted to change the configured Redux store, there are three things that you need to do.

The following guide will show you how to configure your Redux store to use [redux-saga][redux-saga] instead of [redux-thunk][redux-thunk] middleware.

First, you need to create your own `createConfigureStore` like the following:

```js
import createSagaMiddleware, { END } from 'redux-saga';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import enhancer from './storeEnhancer';
import mySaga from './sagas';

export default globalReducers => (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    globalReducers ? combineReducers(globalReducers) : () => preloadedState || {},
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
      ),
      // the enhancer will enable automatic code split registered reducers from applyReducers
      enhancer(globalReducers),
    ),
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
```

Then, create a `createPage` using the configured store like the following:

```js
import createPageFactory from './createPageFactory';
import createConfigureStore from './createConfigureStore';

export default createPageFactory(createConfigureStore());
```

Finally, replace Soya Next `createPage` with your own:

```diff
-import { createPage } from 'soya-next';
+import createPage from './createPage';
```

Now, your Redux store is implemented using [redux-saga][redux-saga] middleware instead.

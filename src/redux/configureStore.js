import thunk from 'redux-thunk';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import enhancer from './storeEnhancer';
import middleware from './middleware';

export default (preloadedReducers, preloadedState) => createStore(
  preloadedReducers ? combineReducers(preloadedReducers) : () => ({}),
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      middleware,
    ),
    enhancer(preloadedReducers),
  ),
);

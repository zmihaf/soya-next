import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import enhancer from './storeEnhancer';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

export default (preloadedState, preloadedReducers) => createStore(
  preloadedReducers ? combineReducers(preloadedReducers) : () => ({}),
  preloadedState,
  composeWithDevTools(
    applyMiddleware(thunk),
    enhancer(preloadedReducers),
  ),
);

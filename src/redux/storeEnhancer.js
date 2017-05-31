import { combineReducers } from 'redux';

export default (preloadedReducers) => (createStore) => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer);
  const replaceReducer = store.replaceReducer;
  const soyaReducers = { ...preloadedReducers };
  const queries = {};

  return {
    ...store,
    dispatch: ({ soya, ...action }) => {
      if (typeof soya !== 'undefined') {
        const { load, id } = soya;
        if (typeof id !== 'string') {
          throw new Error(`Expected soya action id to be a string.`);
        }
        if (typeof load !== 'function') {
          throw new Error(`Expected soya action load to be a function.`);
        }

        const resolve = (soya) => {
          store.dispatch({
            ...action,
            soya,
          });
          delete queries[id];
          return soya;
        };
        const reject = resolve;
        if (!queries[id]) {
          queries[id] = load().then(resolve, reject);
        }
        return queries[id];
      }
      return store.dispatch(action);
    },
    replaceReducer: (nextReducers) => {
      if (!nextReducers) return;

      let nextReducer = nextReducers;
      if (typeof nextReducers === 'object') {
        const keys = Object.keys(nextReducers);
        keys.forEach(key => {
          if (soyaReducers[key] && soyaReducers[key] !== nextReducers[key]) {
            throw new Error(`Duplicate reducer name: ${key}`);
          }
          soyaReducers[key] = nextReducers[key];
        });
        nextReducer = combineReducers(soyaReducers);
      }
      replaceReducer(nextReducer);
    },
    soya: true,
  };
};

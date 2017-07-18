import { createStore } from 'redux';
import storeEnhancer from '../storeEnhancer';

describe('Store Enhancer', () => {
  let store;
  const todos = (state = [], action) => state;

  beforeEach(() => {
    store = storeEnhancer()(createStore)(state => state);
  });

  it('should expose enhanced API', () => {
    const apis = Object.keys(store);
    expect(apis.length).toBe(6);
    expect(apis).toContain('addReducer');
    expect(apis).toContain('replaceReducer');
    expect(apis).toContain('soya');
  });

  it('should add new todos to store state', () => {
    store.addReducer({ todos });
    expect(store.getState()).toMatchSnapshot();
  });

  it('should replace store state with given reducers', () => {
    const auth = (state = {}) => state;
    store.addReducer({ auth });
    store.addReducer({ todos });
    store.replaceReducer({ auth });
    expect(store.getState()).toMatchSnapshot();
  });

  it('should throw if addReducers arguments are not specified', () => {
    expect(() => {
      store.addReducer();
    })
      .toThrow('Missing nextReducers argument.');
  });

  it('should throw if replaceReducers arguments are not specified', () => {
    expect(() => {
      store.replaceReducer();
    })
      .toThrow('Missing nextReducers argument.');
  });

  it('should throw if there\'s reducer name conflict', () => {
    expect(() => {
      store.addReducer({ todos });
      store.addReducer({ todos: state => state });
    })
      .toThrow('Duplicate reducer name: todos');
  });
});

import createConfigureStore from '../createConfigureStore';

describe('createConfigureStore', () => {
  it('should create basic configureStore', () => {
    const configureStore = createConfigureStore();
    const store = configureStore();
    store.replaceReducer({
      local: (state = []) => state,
    });
    expect(store.getState()).toMatchSnapshot();
  });

  it('should create configureStore with global reducers', () => {
    const configureStore = createConfigureStore({
      global: (state = {}) => state,
    });
    const store = configureStore({});
    store.replaceReducer({
      local: (state = []) => state,
    });
    expect(store.getState()).toMatchSnapshot();
  });
});

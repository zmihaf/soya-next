import { createStore, applyMiddleware } from 'redux';
import middleware from '../middleware';

jest.useFakeTimers();

describe('Middleware', () => {
  let store;
  const thunk = ({ dispatch, getState }) => next => action => (
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
  );
  const fetchData = () => async dispatch => {
    const res = await new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: true });
      }, 1000);
    });
    dispatch({
      type: 'FETCH_DATA',
      ...res,
    });
  };
  const fetchDataSoya = () => ({
    type: 'FETCH_DATA_SOYA',
    soya: {
      load: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: true });
        }, 1000);
      }),
    },
  });
  const reducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_DATA':
        if (action.data) {
          return state.concat(state.length);
        }
        return state;
      case 'FETCH_DATA_SOYA':
        if (action.soya.data) {
          return state.concat(state.length);
        }
        return state;
      default:
        return state;
    }
  };

  beforeEach(() => {
    store = applyMiddleware(thunk, middleware)(createStore)(reducer);
  });

  it('should throw an error if non-string query id', () => {
    expect(() => {
      store.dispatch({
        type: 'NON_STRING_QUERY_ID',
        soya: {
          id: [],
        },
      });
    }).toThrow('Expected soya action id to be a string.');
  });

  it('should throw an error if load is not a function', () => {
    expect(() => {
      store.dispatch({
        type: 'NON_FUNCTION_LOAD',
        soya: {
          id: '1',
          load: 'function',
        },
      });
    }).toThrow('Expected soya action load to be a function.');
  });

  it('should dispatch action normally', async () => {
    await new Promise(resolve => {
      for (let i = 1; i <= 5; i++) {
        store.dispatch(fetchData());
        jest.runTimersToTime(i * 200);
      }
      jest.runAllTimers();
      resolve();
    });
    expect(store.getState().length).toBe(5);
  });

  it('should only dispatch once per query id per running request', async () => {
    await new Promise(resolve => {
      for (let i = 1; i <= 5; i++) {
        store.dispatch(fetchDataSoya());
        jest.runTimersToTime(i * 200);
      }
      jest.runAllTimers();
      resolve();
    });
    expect(store.getState().length).toBe(1);
  });
});

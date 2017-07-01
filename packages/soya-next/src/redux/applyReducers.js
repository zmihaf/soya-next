import applyReducersComponent from './applyReducersComponent';
import applyReducersPage from './applyReducersPage';

export default reducers => Component => {
  if (typeof Component.getInitialProps === 'undefined') {
    return applyReducersComponent(reducers)(Component);
  }
  return applyReducersPage(reducers)(Component);
};

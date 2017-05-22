import { compose } from 'redux';
import { connect } from 'react-redux';
import { withCookies } from '../../cookies';
import applyReducers from '../../redux/applyReducers';
import withLocale from '../../i18n/withLocale';
import { COMPONENT } from '../../constants/type';

export default (...connectArgs) => (Component, reducers) => compose(
  withCookies(COMPONENT),
  withLocale(COMPONENT),
  applyReducers(reducers),
  connect(...connectArgs),
)(Component);

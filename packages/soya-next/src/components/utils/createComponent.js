import { compose } from 'redux';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import applyReducers from '../../redux/applyReducers';
import withLocale from '../../i18n/withLocaleComponent';

export default (...connectArgs) => (Component, reducers) => compose(
  withCookies,
  withLocale,
  applyReducers(reducers),
  connect(...connectArgs),
)(Component);

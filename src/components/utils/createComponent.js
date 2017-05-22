import { compose } from 'redux';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import applyReducers from '../../redux/applyReducers';
import withLocale from '../../i18n/withLocale';
import { COMPONENT } from '../../constants/type';

export default (...connectArgs) => (Component, reducers) => compose(
  withCookies,
  withLocale(COMPONENT),
  applyReducers(reducers),
  connect(...connectArgs),
)(Component);

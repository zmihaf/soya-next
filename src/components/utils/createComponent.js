import { compose } from 'redux';
import { connect } from 'react-redux';
import { withCookies } from '../../cookies';
import applyReducers from '../../redux/applyReducers';
import { withLocale } from '../../i18n';
import { COMPONENT } from '../../constants/types';

export default (...connectArgs) => (Component, reducers) => compose(
  withCookies(COMPONENT),
  withLocale(COMPONENT),
  applyReducers(reducers),
  connect(...connectArgs),
)(Component);

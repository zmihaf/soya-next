import { compose } from 'redux';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import withReducers from '../../redux/withReducers';
import withLocale from '../../i18n/withLocale';
import { COMPONENT } from '../../constants/type';

export default (...connectArgs) => (Component, reducers) => compose(
  withCookies,
  withLocale(COMPONENT),
  withReducers(reducers),
  connect(...connectArgs),
)(Component);

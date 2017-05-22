import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { Cookies, CookiesProvider } from 'react-cookie';
import { localeShape } from '../constants/types';

class SoyaProvider extends React.Component {
  static propTypes = {
    store: storeShape.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
  };

  static childContextTypes = {
    locale: localeShape,
  };

  getChildContext() {
    return { locale: this.props.locale };
  }

  render() {
    return (
      <CookiesProvider cookies={this.props.cookies}>
        <Provider store={this.props.store}>
          {React.Children.only(this.props.children)}
        </Provider>
      </CookiesProvider>
    );
  }
}

export default SoyaProvider;

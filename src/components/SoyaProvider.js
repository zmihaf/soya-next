import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { Cookies, CookiesProvider } from 'react-cookie';

class SoyaProvider extends React.Component {
  static propTypes = {
    store: storeShape.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
  };

  static childContextTypes = {
    country: PropTypes.string,
    language: PropTypes.string,
    locale: PropTypes.string,
  };

  getChildContext() {
    const { country, language, locale } = this.props;
    return {
      country,
      language,
      locale,
    };
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

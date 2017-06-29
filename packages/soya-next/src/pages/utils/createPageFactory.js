import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { Cookies } from 'react-cookie';
import { localeShape, urlShape } from '../../constants/PropTypes';
import SoyaProvider from '../../components/SoyaProvider';
import withCookies from '../../cookies/withCookiesPage';
import withLocale from '../../i18n/withLocalePage';
import withStore from '../../redux/withStore';

export default configureStore => (...connectArgs) => (Page, reducers) => {
  const ConnectedPage = connect(...connectArgs)(Page);

  class SoyaPage extends React.Component {
    static propTypes = {
      cookies: PropTypes.instanceOf(Cookies).isRequired,
      store: storeShape.isRequired,
      defaultLocale: PropTypes.string,
      siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
      locale: localeShape,
      url: urlShape.isRequired,
    };

    static getInitialProps = Page.getInitialProps;

    render() {
      const { store, ...props } = this.props;
      return (
        <SoyaProvider
          cookies={this.props.cookies}
          locale={this.props.locale}
          defaultLocale={this.props.defaultLocale}
          siteLocales={this.props.siteLocales}
          store={store}
          url={this.props.url}
        >
          <ConnectedPage {...props} />
        </SoyaProvider>
      );
    }
  }

  return compose(
    withCookies,
    withLocale,
    withStore(configureStore, reducers),
  )(SoyaPage);
};

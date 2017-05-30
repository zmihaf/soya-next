import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SoyaProvider from '../../components/SoyaProvider';
import { withCookies } from '../../cookies';
import { withLocale } from '../../i18n';
import withStore from '../../redux/withStore';
import { PAGE } from '../../constants/types';

export default (configureStore) => (...connectArgs) => (Page, reducers) => {
  const ConnectedPage = connect(...connectArgs)(Page);

  class Soya extends React.Component {
    static getInitialProps = Page.getInitialProps;

    render() {
      const { cookies, locale, store, ...props } = this.props;
      return (
        <SoyaProvider
          cookies={cookies}
          locale={locale}
          store={store}
        >
          <ConnectedPage {...this.props} />
        </SoyaProvider>
      );
    }
  }

  return compose(
    withCookies(PAGE),
    withLocale(PAGE),
    withStore(configureStore, reducers),
  )(Soya);
};

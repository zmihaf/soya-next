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

  class SoyaPage extends React.Component {
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
    withCookies(PAGE),
    withLocale(PAGE),
    withStore(configureStore, reducers),
  )(SoyaPage);
};

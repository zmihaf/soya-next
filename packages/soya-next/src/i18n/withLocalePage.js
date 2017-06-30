import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../utils/getDisplayName';
import { localeShape } from '../constants/PropTypes';

export default Page => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName('WithLocale', Page);

    static propTypes = {
      defaultLocale: PropTypes.string,
      siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
      locale: localeShape,
    };

    static async getInitialProps(ctx) {
      const { defaultLocale, siteLocales, locale } = ctx.req || window.__NEXT_DATA__.props;
      if (!ctx.req) {
        if (ctx.query.locale) {
          const [language, country] = ctx.query.locale.split('-');
          if (siteLocales.indexOf(`${language}-${country}`) !== -1) {
            locale.language = language;
            locale.country = country;
          }
        }
      }
      const props = Page.getInitialProps && await Page.getInitialProps({
        ...ctx,
        defaultLocale,
        siteLocales,
        locale,
      });
      return {
        ...props,
        defaultLocale,
        siteLocales,
        locale,
      };
    }

    render() {
      return <Page {...this.props} />;
    }
  }
  return WithLocale;
};

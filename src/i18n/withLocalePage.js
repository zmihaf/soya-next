import React from 'react';
import getDisplayName from '../utils/getDisplayName';
import { localeShape } from '../constants/types';

export default (Page) => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName('WithLocale', Page);

    static propTypes = {
      locale: localeShape,
    };

    static async getInitialProps(ctx) {
      let defaultLocale, siteLocales, locale;
      if (ctx.req) {
        defaultLocale = ctx.req.defaultLocale;
        siteLocales = ctx.req.siteLocales;
        locale = ctx.req.locale;
      } else {
        defaultLocale = window.defaultLocale;
        siteLocales = window.siteLocales;
        locale = window.locale;
        if (ctx.query.locale) {
          const [ language, country ] = ctx.query.locale.split('-');
          if (locale.language !== language || locale.country !== country) {
            locale = {
              language,
              country,
            };
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

    componentDidMount() {
      window.defaultLocale = this.props.defaultLocale;
      window.siteLocales = this.props.siteLocales;
      window.locale = this.props.locale;
    }

    render() {
      return <Page {...this.props} />
    }
  }
  return WithLocale;
};

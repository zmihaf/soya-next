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
      let locale;
      if (ctx.req) {
        locale = ctx.req.locale;
      } else {
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
      const props = Page.getInitialProps && await Page.getInitialProps({ ...ctx, locale });
      return {
        ...props,
        locale,
      };
    }

    componentDidMount() {
      window.locale = this.props.locale;
    }

    render() {
      return <Page {...this.props} />
    }
  }
  return WithLocale;
};

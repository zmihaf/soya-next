import React from 'react';
import getDisplayName from '../utils/getDisplayName';

export default (Page) => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName('WithLocale', Page);

    static async getInitialProps(ctx) {
      let country, language, locale;
      if (ctx.req) {
        country = ctx.req.country;
        language = ctx.req.language;
        locale = ctx.req.locale;
      } else {
        country = window.country;
        language = window.language;
        locale = window.locale;
      }
      const props = Page.getInitialProps && await Page.getInitialProps({ ...ctx, country, language, locale });
      return {
        ...props,
        country,
        language,
        locale,
      };
    }

    componentDidMount() {
      window.country = this.props.country;
      window.language = this.props.language;
      window.locale = this.props.locale;
    }

    render() {
      return <Page {...this.props} />
    }
  }
  return WithLocale;
};

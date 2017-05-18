import React from 'react';
import { Cookies } from 'react-cookie';
import getDisplayName from '../utils/getDisplayName';

export default (Page) => {
  class WithCookies extends React.Component {
    static displayName = getDisplayName('WithCookies', Page);

    static async getInitialProps(ctx) {
      const cookies = ctx.req ? ctx.req.universalCookies : new Cookies();
      const props = Page.getInitialProps && await Page.getInitialProps({ ...ctx, cookies });
      return {
        ...props,
        cookies,
      };
    }

    constructor(props) {
      super(props);
      this.cookies = props.cookies instanceof Cookies ? props.cookies : new Cookies();
    }

    render() {
      const { ...props } = this.props;
      delete props.cookies;

      return <Page {...props} cookies={this.cookies} />;
    }
  }

  return WithCookies;
};

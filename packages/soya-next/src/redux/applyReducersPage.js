import React from 'react';
import getDisplayName from '../utils/getDisplayName';

export default reducers => Page => {
  if (typeof reducers === 'undefined') {
    return Page;
  }

  class ApplyReducers extends React.Component {
    static displayName = getDisplayName('ApplyReducers', Page);

    static async getInitialProps(ctx) {
      if (!ctx.store.soya) {
        throw new Error('applyReducers must be used with Soya\'s redux enhancer');
      }
      ctx.store.addReducer(reducers);
      return Page.getInitialProps && await Page.getInitialProps(ctx);
    }

    render() {
      return <Page {...this.props} />;
    }
  }
  return ApplyReducers;
};

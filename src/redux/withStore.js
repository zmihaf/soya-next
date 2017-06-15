import React from 'react';
import getDisplayName from '../utils/getDisplayName';

export default (configureStore, preloadedReducers) => (Page) => {
  const configureStoreIfNeeded = (preloadedState, extraArgument) => {
    if (typeof window === 'undefined') {
      return configureStore(preloadedReducers, preloadedState, extraArgument);
    }
    if (!window.store) {
      window.store = configureStore(preloadedReducers, preloadedState, extraArgument);
    } else {
      window.store.updateReducer(preloadedReducers);
    }
    return window.store;
  };

  class WithStore extends React.Component {
    static displayName = getDisplayName('WithStore', Page);

    static async getInitialProps(ctx) {
      const store = configureStoreIfNeeded(undefined, { cookies: ctx.cookies });
      const props = Page.getInitialProps && await Page.getInitialProps({ ...ctx, store });
      return {
        ...props,
        preloadedState: store.getState(),
        store,
      };
    }

    constructor(props) {
      super(props);
      this.store = props.store.dispatch ? props.store : configureStoreIfNeeded(props.preloadedState, { cookies: props.cookies });
      if (!this.store.soya) {
        throw new Error('withStore must be used with Soya\'s redux enhancer');
      }
    }

    render() {
      const { ...props } = this.props;
      delete props.preloadedState;
      delete props.store;

      return (
        <Page {...props} store={this.store} />
      );
    }
  }

  return WithStore;
};

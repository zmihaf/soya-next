import React from 'react';
import { Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import getDisplayName from '../utils/getDisplayName';

export default (configureStore, preloadedReducers) => Page => {
  const configureStoreIfNeeded = (preloadedState, extraArgument) => {
    if (typeof window === 'undefined') {
      return configureStore(preloadedReducers, preloadedState, extraArgument);
    }
    if (typeof window.store === 'undefined') {
      window.store = configureStore(preloadedReducers, preloadedState, extraArgument);
    } else {
      window.store.addReducer(preloadedReducers);
    }
    return window.store;
  };

  class WithStore extends React.Component {
    static displayName = getDisplayName('WithStore', Page);

    static propTypes = {
      cookies: PropTypes.instanceOf(Cookies).isRequired,
      preloadedState: PropTypes.object.isRequired,
      store: PropTypes.oneOfType([
        PropTypes.object,
        storeShape,
      ]).isRequired,
    };

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

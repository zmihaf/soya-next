import React from 'react';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import getDisplayName from '../utils/getDisplayName';

export default (reducers) => (Component) => {
  if (reducers === undefined) return Component;

  class SoyaComponent extends React.Component {
    static displayName = getDisplayName('WithReducers', Component);

    static contextTypes = {
      store: storeShape.isRequired,
    };

    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      if (!this.store.soya) {
        throw new Error('withReducers must be used with Soya\'s redux enhancer');
      }
      this.store.replaceReducer(reducers);
    }

    render() {
      return <Component {...this.props} />;
    }
  }
  return SoyaComponent;
};

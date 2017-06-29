import React from 'react';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import getDisplayName from '../utils/getDisplayName';

export default reducers => Component => {
  if (typeof reducers === 'undefined') {
    return Component;
  }

  class ApplyReducers extends React.Component {
    static displayName = getDisplayName('ApplyReducers', Component);

    static contextTypes = {
      store: storeShape.isRequired,
    };

    static propTypes = {
      store: storeShape,
    };

    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      if (!this.store.soya) {
        throw new Error('applyReducers must be used with Soya\'s redux enhancer');
      }
      this.store.addReducer(reducers);
    }

    render() {
      return <Component {...this.props} />;
    }
  }
  return ApplyReducers;
};

import React from 'react';
import getDisplayName from '../utils/getDisplayName';
import { urlShape } from '../constants/types';

export default (Component) => class extends React.Component {
  static displayName = getDisplayName('WithUrl', Component);

  static contextTypes = {
    url: urlShape,
  };

  render() {
    return (
      <Component
        {...this.props}
        url={this.context.url}
      />
    );
  }
};

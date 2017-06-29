import React from 'react';
import getDisplayName from '../utils/getDisplayName';
import { urlShape } from '../constants/PropTypes';

export default Component => class extends React.Component {
  static displayName = getDisplayName('WithUrl', Component);

  static contextTypes = {
    url: urlShape.isRequired,
  };

  static propTypes = {
    url: urlShape,
  };

  render() {
    return (
      <Component
        {...this.props}
        url={this.props.url || this.context.url}
      />
    );
  }
};

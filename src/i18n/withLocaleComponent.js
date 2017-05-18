import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../utils/getDisplayName';

export default (Component) => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName('WithLocale', Component);

    static contextTypes = {
      locale: PropTypes.string,
    };

    constructor(props, context) {
      super(props, context);
      this.locale = props.locale || context.locale;
    }

    render() {
      return <Component {...this.props} locale={this.locale} />
    }
  }

  return WithLocale;
};

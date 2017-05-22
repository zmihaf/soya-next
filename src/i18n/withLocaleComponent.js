import React from 'react';
import getDisplayName from '../utils/getDisplayName';
import { localeShape } from '../constants/types';

export default (Component) => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName('WithLocale', Component);

    static contextTypes = {
      locale: localeShape,
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

import React from 'react';
import getDisplayName from '../utils/getDisplayName';
import { localeShape } from '../constants/types';

export default (Component) => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName('WithLocale', Component);

    static contextTypes = {
      locale: localeShape,
    };

    render() {
      const locale = this.props.locale || this.context.locale;
      return <Component {...this.props} locale={locale} />
    }
  }

  return WithLocale;
};

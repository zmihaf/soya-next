import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../utils/getDisplayName';
import { localeShape } from '../constants/types';

export default (Component) => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName('WithLocale', Component);

    static contextTypes = {
      defaultLocale: PropTypes.string,
      siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
      locale: localeShape,
    };

    static propTypes = {
      locale: localeShape,
    };

    render() {
      const locale = this.props.locale || this.context.locale;
      return (
        <Component
          {...this.props}
          defaultLocale={this.context.defaultLocale}
          siteLocales={this.context.siteLocales}
          locale={locale}
        />
      );
    }
  }

  return WithLocale;
};

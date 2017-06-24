import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { compose } from 'redux';
import { format, resolve } from 'url';
import withLocale from '../i18n/withLocaleComponent';
import withUrl from '../router/withUrl';
import { localeShape, urlShape } from '../constants/PropTypes';

class LocaleLink extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    defaultLocale: PropTypes.string.isRequired,
    locale: localeShape.isRequired,
    url: urlShape.isRequired,
  };

  render() {
    const {
      children,
      defaultLocale,
      locale,
      url,
      ...props
    } = this.props;
    let { as, href } = props;
    delete props.siteLocales;

    const [defaultLanguage, defaultCountry] = defaultLocale.split('-');
    const { language, country } = locale;

    let localeSegment = '';
    const localeArr = [];
    if (language !== defaultLanguage) {
      localeArr.push(language);
    }
    if (country !== defaultCountry) {
      localeArr.push(country);
    }
    if (localeArr.length !== 0) {
      localeSegment += `/${localeArr.join('-')}`;
    }

    href = href ? format(href) : '';
    as = as ? format(as) : '';
    const sep = href.indexOf('?') === -1 ? '?' : '&';

    return (
      <Link
        {...props}
        as={localeSegment + resolve(url.pathname, as || href)}
        href={`${resolve(url.pathname, href)}${sep}locale=${language}-${country}`}
      >
        {children}
      </Link>
    );
  }
}

export default compose(
  withLocale,
  withUrl,
)(LocaleLink);

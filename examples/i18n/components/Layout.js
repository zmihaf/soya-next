import { createComponent, LocaleLink } from 'soya-next';
import data from '../data/i18n.json';

const Layout = ({ children, locale, siteLocales }) => (
  <div>
    <div style={{ textAlign: 'right' }}>
      {siteLocales.map((locale) => {
        const [ language, country ] = locale.split('-');
        return (
          <LocaleLink
            key={locale}
            locale={{ language, country }}
          >
            <a style={{ marginLeft: 5 }}>{data[language].language}</a>
          </LocaleLink>
        );
      })}
    </div>
    <hr />
    <div>
      <LocaleLink href='/'>
        <a>{data[locale.language].menuHome}</a>
      </LocaleLink>
      {' '}
      <LocaleLink href='/about'>
        <a>{data[locale.language].menuAboutUs}</a>
      </LocaleLink>
    </div>
    {children}
  </div>
);

export default createComponent()(Layout);

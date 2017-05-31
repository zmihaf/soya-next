import { createComponent, LocaleLink } from 'soya-next';
import data from '../data/i18n.json';

const Layout = ({ locale, siteLocales }) => (
  <div style={{ textAlign: 'right' }}>
    {siteLocales.map((siteLocale) => {
      const [ language, country ] = siteLocale.split('-');
      const style = { marginLeft: 5 };
      if (locale.language === language && locale.country === country) {
        style.color = 'white';
        style.background = 'red';
      }
      return (
        <LocaleLink
          key={siteLocale}
          locale={{ language, country }}
        >
          <a style={style}>{data[language].language}</a>
        </LocaleLink>
      );
    })}
  </div>
);

export default createComponent()(Layout);

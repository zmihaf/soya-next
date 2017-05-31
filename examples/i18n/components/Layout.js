import { createComponent, LocaleLink } from 'soya-next';
import LanguagePicker from './LanguagePicker';
import data from '../data/i18n.json';

const Layout = ({ children, locale, siteLocales }) => (
  <div>
    <LanguagePicker />
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
    <hr />
    <LanguagePicker />
  </div>
);

export default createComponent()(Layout);

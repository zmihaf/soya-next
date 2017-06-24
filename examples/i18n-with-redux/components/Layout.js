import PropTypes from 'prop-types';
import { createComponent, LocaleLink } from 'soya-next';
import Dictionary from '../components/Dictionary';
import LanguagePicker from './LanguagePicker';

const Layout = ({ children }) => (
  <div>
    <LanguagePicker />
    <hr />
    <div>
      <LocaleLink href='/'>
        <a>
          <Dictionary entryKey='menuHome' />
        </a>
      </LocaleLink>
      {' '}
      <LocaleLink href='/about'>
        <a>
          <Dictionary entryKey='menuAboutUs' />
        </a>
      </LocaleLink>
    </div>
    {children}
    <hr />
    <LanguagePicker />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default createComponent()(Layout);

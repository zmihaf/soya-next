import { withCookies as withCookiesComponent } from 'react-cookie';
import withCookiesPage from './withCookiesPage';
import { COMPONENT, PAGE } from '../constants/types';

const withCookies = (type) => {
  switch (type) {
    case COMPONENT:
      return withCookiesComponent;
    case PAGE:
      return withCookiesPage;
    default:
      throw new Error('Expected type to be \'COMPONENT\' or \'PAGE\'');
  }
};

export { withCookies };

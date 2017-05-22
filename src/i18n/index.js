import withLocaleComponent from './withLocaleComponent';
import withLocalePage from './withLocalePage';
import { COMPONENT, PAGE } from '../constants/types';

const withLocale = (type) => {
  switch (type) {
    case COMPONENT:
      return withLocaleComponent;
    case PAGE:
      return withLocalePage;
    default:
      throw new Error('Expected type to be \'COMPONENT\' or \'PAGE\'');
  }
};

export { withLocale };

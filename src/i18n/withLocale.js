import withLocaleComponent from './withLocaleComponent';
import withLocalePage from './withLocalePage';
import { COMPONENT, PAGE } from '../constants/type';

export default (type) => {
  switch (type) {
    case COMPONENT:
      return withLocaleComponent;
    case PAGE:
      return withLocalePage;
  }
  throw new Error('Expected type to be \'COMPONENT\' or \'PAGE\'');
}

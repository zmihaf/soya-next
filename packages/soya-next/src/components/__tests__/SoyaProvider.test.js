import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import { Cookies } from 'react-cookie';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import SoyaProvider from '../SoyaProvider';
import { localeShape } from '../../constants/PropTypes';

describe('<SoyaProvider />', () => {
  const createMockStore = () => ({
    dispatch: () => jest.fn(),
    getState: () => jest.fn(),
    subscribe: () => jest.fn(),
  });

  const createChild = () => class extends React.Component {
    static contextTypes = {
      store: storeShape.isRequired,
      cookies: PropTypes.instanceOf(Cookies).isRequired,
      defaultLocale: PropTypes.string,
      siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
      locale: localeShape,
    };

    render() {
      return <div />;
    }
  };

  it('should add cookies, defaultLocale, locale, siteLocales, and store to child context', () => {
    const Child = createChild();
    const tree = TestUtils.renderIntoDocument(
      <SoyaProvider
        cookies={new Cookies()}
        defaultLocale='id-id'
        locale={{ language: 'en', country: 'id' }}
        siteLocales={['id-id', 'en-id']}
        store={createMockStore()}
      >
        <Child />
      </SoyaProvider>
    );
    const child = TestUtils.findRenderedComponentWithType(tree, Child);
    expect(child.context).toMatchSnapshot();
  });
});

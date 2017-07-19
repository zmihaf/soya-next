import React from 'react';
import { shallow } from 'enzyme';
import withUrl from '../withUrl';

describe('withUrl', () => {
  it('should add url to component props', () => {
    const context = {
      url: {
        pathname: '/',
        query: {},
      },
    };
    const Component = () => <div />;
    const ComponentWithUrl = withUrl(Component);
    const wrapper = shallow(<ComponentWithUrl />, { context });
    expect(wrapper.find(Component).props()).toMatchSnapshot();
  });
});

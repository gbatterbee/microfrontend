import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('should render without throwing an error', function () {
    expect(shallow(<App />).find('.App')).toHaveLength(1);

  });
});
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NavigationItem from './navigation-item/navigation-item';
import NavigationItems from './navigation-items';

configure({ adapter: new Adapter() });

describe('description of this test bundle', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('1 individual test, for example: should render two <NavigationItem /> if no authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('1 individual test, for example: should render two <NavigationItem /> if no authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render the <NavigationItem if isAuthenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
});

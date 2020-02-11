import React from 'react';
import { shallow, mount } from 'enzyme'
import DropDown from './DropDown';
import { jsxText } from '@babel/types';

describe("DropDown.tsx", () => {
    let props: any;
    beforeEach(()=>{
        props = {
            placeholder: 'search the world',
            loading: false,
            onChange: jest.fn(),
            onSelect: jest.fn(),
        }
    })

    it("Renders the DropDown with no items", () => {
        const SUT = shallow(<DropDown {...props}/>)
        // console.log(SUT.html());
        
        expect(SUT.find('.text-input').length).toEqual(1)
        expect(SUT.find('.text-input').props().placeholder).toEqual('search the world')
        
        expect(SUT.find('.drop-down__list').length).toEqual(0)
    })

    it("Renders the DropDown list items when clicked into text box", () => {
        const listProps = {...props, list: ['a', 'b', 'c', 'd']}
        const SUT = mount(<DropDown {...listProps}/>)
                
        expect(SUT.find('.drop-down__list').length).toEqual(0)

        // On user key input
        SUT.find('.text-input').simulate('focus');
        // Drop down is opened
        expect(SUT.find('.drop-down__list').length).toEqual(1)
        expect(SUT.find('.list__item').length).toEqual(4)
        expect(SUT.find('.list__item').at(0).text()).toEqual('a')
        expect(SUT.find('.list__item').at(1).text()).toEqual('b')
        expect(SUT.find('.list__item').at(2).text()).toEqual('c')
        expect(SUT.find('.list__item').at(3).text()).toEqual('d')
    })

    it("Renders the DropDown list items with the provided item renderer", () => {
        const someRenderer =  (props: any) => (<p></p>)
        const listProps = {...props, list: ['a', 'b', 'c', 'd'], itemRenderer: someRenderer}
        
        const SUT = shallow(<DropDown {...listProps}/>)
        // On user key input
        SUT.find('.text-input').simulate('focus');
        expect(SUT.find(someRenderer).length).toEqual(4)
    })

    it("On click of item calls onSelect callback", () => {
        const listProps = {...props, list: ['a', 'b', 'c', 'd'], onSelect: jest.fn()}
        const SUT = mount(<DropDown {...listProps}/>)

        expect(listProps.onSelect).not.toHaveBeenCalled();
        // On user key input
        SUT.find('.text-input').simulate('focus');
        expect(listProps.onSelect).not.toHaveBeenCalled();
        // On user select item
        SUT.find('.list__item').at(1).childAt(0).simulate('click')
        expect(listProps.onSelect).toHaveBeenCalled();
        expect(listProps.onSelect).toHaveBeenCalledWith('b');
    })
})

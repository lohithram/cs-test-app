import React from 'react';
import { shallow } from 'enzyme'
import UserRenderer from './UserRenderer';

describe("UserRenderer.tsx", () => {
    let props: any;
    beforeEach(()=>{
        props = {
            item: {
                login: "Lohith",
                avatar_url: "http://abc/lohi",
                score: 133.22
            },
            onClick: jest.fn()
        }
    })

    it("Renders the UserRenderer", () => {
        const SUT = shallow(<UserRenderer {...props}/>)
        expect(SUT.find('img').length).toEqual(1)
        expect(SUT.find('.info__title').length).toEqual(1)
        expect(SUT.find('.info__title').text()).toContain('Lohith')
        expect(SUT.find('.info__secondary').length).toEqual(1)
        expect(SUT.find('.info__secondary').text()).toContain('SCORE: 133.22')
    })

    it("On click calls callback", () => {
        const SUT = shallow(<UserRenderer {...props}/>)
        expect(props.onClick).not.toHaveBeenCalled();
        SUT.simulate('click')
        expect(props.onClick).toHaveBeenCalled();
        expect(props.onClick).toHaveBeenCalledWith(props.item);
    })
})

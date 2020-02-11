import React from "react"
import { shallow, mount } from "enzyme"
import TypeAhead from "./TypeAhead"

import * as useSearch from "../hooks/useSearch"

describe("TypeAhead.tsx", () => {
    const props = {}
    beforeEach(() => {})

    it("Renders the TypeAhead with Dropdown", () => {
        const SUT = shallow(<TypeAhead {...props} />)
        console.log("Typeahead", SUT.text())
        console.log("Typeahead", SUT.html())

        expect(SUT.find(".type-ahead").length).toEqual(1)
        expect(SUT.find("DropDown").props().loading).toEqual(false)
    })

    // mock the hooks
    it("Renders the TypeAhead with Dropdown and searching state", () => {
        const spy = jest
            .spyOn(useSearch, "useGithubUserSearch")
            .mockImplementation(() => ({
                searching: true,
                searchResult: {} as useSearch.SearchResult
            }))
        const SUT = shallow(<TypeAhead {...props} />)
        expect(SUT.find("DropDown").props().loading).toEqual(true)
        expect(spy).toHaveBeenCalledWith("")
    })

    it("Renders the TypeAhead with Dropdown and search results", () => {
        const spy = jest
            .spyOn(useSearch, "useGithubUserSearch")
            .mockImplementation(() => ({
                searching: false,
                searchResult: { items: ["a", "b", "c", "d"], total_count: 800}
            }))

        const SUT = shallow(<TypeAhead {...props} />)
        expect(SUT.find("DropDown").props().loading).toEqual(false)
        expect(SUT.find("DropDown").props().list).toEqual(['a', 'b', 'c', 'd'])  
    })
})

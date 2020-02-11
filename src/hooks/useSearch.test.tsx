import useSearch from "./useSearch"
import { renderHook } from "@testing-library/react-hooks"

import axios from "axios"

jest.mock("axios")

describe("useSearch.ts", () => {
    const mockAPIResponse = {
        data: {
            total_count: 9,
            items: ["a", "b", "c"]
        },
        status: 200
    }
    beforeEach(() => {})

    it("Test useSearch hook ", async (done) => {
        // set up mock
        axios.get.mockImplementationOnce(() => Promise.resolve(mockAPIResponse))
        
        const { result, waitForNextUpdate } = renderHook(() =>
            useSearch("http://abc", "lohi")
        )

        // initially returns loading false and no search results"
        // console.log("useSearch", result.current)
        expect(result.current.searching).toEqual(true)
        expect(result.current.searchResult).toEqual({});

        // On API mock return successfully
        await waitForNextUpdate()
        // console.log("useSearch", result.current)
        expect(result.current.searching).toEqual(false)
        expect(result.current.searchResult).not.toEqual({});        
        expect(result.current.searchResult.total_count).toEqual(9);
        expect(result.current.searchResult.items).toEqual(['a', 'b', 'c']);
        done()
    })
})

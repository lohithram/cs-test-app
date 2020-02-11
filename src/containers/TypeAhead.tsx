import React, { useState } from "react"
import debounce from "lodash/debounce"

import UserRenderer from "../components/UserRenderer"
import DropDown from "../components/DropDown"

import { useGithubUserSearch } from "../hooks/useSearch"

import "./TypeAhead.scss"

type TypeAheadProps = {}

//
// This component has the responsibility to satisfy data dependency
//
const TypeAhead = (props: TypeAheadProps) => {
    const [searchInput, setSearchInput] = useState("")

    const { searching, searchResult } = useGithubUserSearch(searchInput)

    const handleChange = (value: string) => {
        setSearchInput(value)
    }

    const handleOnselect = (item: any) => {
        // console.log("User selected", item);
        setSearchInput("")
    }

    return (
        <div className='type-ahead'>
            <DropDown
                placeholder='Search github users'
                loading={searching}
                list={searchResult.items}
                itemRenderer={UserRenderer}
                onSelect={handleOnselect}
                onChange={debounce(handleChange, 600)}
            />
        </div>
    )
}

export default TypeAhead

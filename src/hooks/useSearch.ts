import {useState, useEffect} from 'react'

import axios from "axios"
import { setServers } from 'dns';

export type SearchResult = {
    total_count: number
    items: Array<any>
}

const useSearch = (APIURL: string, searchInput: string) => {
    const [searching, setSearching] = useState(false)
    const [searchResult, setSearchResult] = useState({} as SearchResult)

    const queryURL = APIURL + "?q=" + searchInput
    
    useEffect(() => {
        if (searchInput) {
            setSearching(true)
            axios.get(queryURL)
                .then(response => {
                    // console.log(response)
                    if (response.status === 200) {
                        setSearchResult(response.data)
                    }
                    setSearching(false)
                })
                .catch(error => {
                    // console.log(error);
                    setSearching(false)
                })
        }
        else {
            setSearching(false)
            setSearchResult({} as SearchResult)
        }
    }, [queryURL])
    
    return {searching, searchResult}
}

export default useSearch

export const useGithubUserSearch = (searchInput: string) => 
    useSearch("https://api.github.com/search/users", searchInput)
import { createContext, useState, useEffect } from "react";

export const FilterProductStore = createContext();

export const FilterProductStoreProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [filterResult, setFilterResult] =useState([]);
    console.log('FilterServer:', filterResult);
    console.log('fromServer:', searchResults);
    return (
        <FilterProductStore.Provider value={[ searchTerm, setSearchTerm, searchResults, setSearchResults, filterResult, setFilterResult ]}>
            {children}
        </FilterProductStore.Provider>
    )
} 
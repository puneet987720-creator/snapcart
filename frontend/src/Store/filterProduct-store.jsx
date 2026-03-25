import { createContext, useState, useEffect } from "react";

export const FilterProductStore = createContext();

export const FilterProductStoreProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    console.log('fromServer:', searchResults);
    return (
        <FilterProductStore.Provider value={[ searchTerm, setSearchTerm, setSearchResults ]}>
            {children}
        </FilterProductStore.Provider>
    )
} 
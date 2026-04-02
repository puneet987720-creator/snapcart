import { createContext, useState, useEffect } from "react";

export const AddToCartStore = createContext();

export const AddToCartStoreProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    return (
        <AddToCartStore.Provider value={[ cartItems, setCartItems ]}>
            {children}
        </AddToCartStore.Provider>
    )
} 
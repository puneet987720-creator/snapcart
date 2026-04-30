import { createContext, useState, useEffect } from "react";
import {getCart} from "../services/poducts";

export const AddToCartStore = createContext();

export const AddToCartStoreProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [grossTotal, setGrossTotal] = useState(0);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart();
                setCartItems(response.data.products);
                setGrossTotal(response.data.grossTotal);
                console.log("Cart data", response.data.products.length);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, []);
    console.log("cartItems:", cartItems);
    console.log("grossTotal:", grossTotal);
    return (
        <AddToCartStore.Provider value={[ cartItems, setCartItems, grossTotal, setGrossTotal ]}>
            {children}
        </AddToCartStore.Provider>
    )
} 
import { createContext, useState, useEffect } from "react";

export const OrderProductStore = createContext();

export const OrderProductStoreProvider = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    console.log('Number', phoneNumber);
    console.log('Address', deliveryAddress);
    return (
        <OrderProductStore.Provider value={[ phoneNumber, setPhoneNumber, deliveryAddress, setDeliveryAddress ]}>
            {children}
        </OrderProductStore.Provider>
    )
} 
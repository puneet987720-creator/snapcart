import { createContext, useState, useEffect } from "react";
import { checkLoginStatus } from "../services/authorization";

export const LoginStateStore = createContext();

export const LoginStateStoreProvider = ({ children }) => {
    const [IsLoggedIn, setIsLoggedIn] = useState(() => {
      const storedValue = localStorage.getItem('isLoggedIn');
      return storedValue ? JSON.parse(storedValue) : false;
    });
    
    useEffect(() => {
      const checkLogin = async () => {
        try {
          const response = await checkLoginStatus();
          let loginState = response.data.isLoggedIn;
          setIsLoggedIn(loginState);
          localStorage.setItem('isLoggedIn', JSON.stringify(loginState));
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };
      checkLogin();
    }, [])
    
    return (
        <LoginStateStore.Provider value={{IsLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginStateStore.Provider>
    )
}
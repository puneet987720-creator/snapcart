import { createContext, useState, useEffect } from "react";
import { checkLoginStatus } from "../services/authorization";

export const LoginStateStore = createContext();

export const LoginStateStoreProvider = ({ children }) => {
    const [IsLoggedIn, setIsLoggedIn] = useState(() => {
      const storedValue = localStorage.getItem('isLoggedIn');
      return storedValue ? JSON.parse(storedValue) : false;
    });
    const [userDetails, setuserDetails] = useState(() => {
      const storedValue = localStorage.getItem('userDetails');
      return storedValue ? JSON.parse(storedValue) : null;
    });
    
    
    useEffect(() => {
      const checkLogin = async () => {
        try {
          const response = await checkLoginStatus();
          let loginState = response.data.isLoggedIn;
          let userDetails = response.data.user
          setuserDetails(userDetails);
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          console.log("userDetails from server", userDetails);
          setIsLoggedIn(loginState);
          localStorage.setItem('isLoggedIn', JSON.stringify(loginState));
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };
      checkLogin();
    }, [])
    
    return (
        <LoginStateStore.Provider value={{IsLoggedIn, setIsLoggedIn, userDetails, setuserDetails}}>
            {children}
        </LoginStateStore.Provider>
    )
}